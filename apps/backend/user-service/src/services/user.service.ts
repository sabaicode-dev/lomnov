
import configs from "@/src/config";
import { UserRepository } from "@/src/database/repositories/user.repository";
import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
import { UnauthorizedError } from "@/src/utils/error/customErrors";
import { DeleteProfileImageRequestDTO, GetAllUsersQueryDTO, RequestUserDTO, ResponseAllUserDTO, ResponseUserDTO, UpdateUserDTO, User } from "@/src/utils/types/indext";
import { Types } from "mongoose";


declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // Define the structure of cookies
    }
  }
}

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(
    requestBody: RequestUserDTO
  ): Promise<ResponseUserDTO> {
    try {
      return await this.userRepository.create(requestBody);
    } catch (error) {
      throw error;
    }
  }

  public async getAllUsers(
    queries: GetAllUsersQueryDTO,
  ): Promise<ResponseAllUserDTO | undefined> {
    try {
      const query = {
        ...(queries.firstName && {
          firstName: { $regex: queries.firstName, $options: "i" },
        }),
        ...(queries.lastName && {
          lastName: { $regex: queries.lastName, $options: "i" },
        }),
        ...(queries.userName && {
          userName: { $regex: queries.userName, $options: "i" },
        }),
        ...(queries.role && { role: queries.role }),
      };
      const skip = (queries.page - 1) * queries.limit;
      const { users, totalUsers } = await this.userRepository.findUsers(
        query,
        skip,
        queries.limit,
      );
      const totalPages = Math.ceil(totalUsers / queries.limit);
      return {
        users,
        pagination: {
          currentPage: queries.page,
          totalPages,
          totalUsers,
        },
      };
    } catch (error) {
      throw error
    }
  }

  public async getMe(request: Express.Request): Promise<ResponseUserDTO | null> {
    try {
      const cognitoSub = request.cookies?.username;
      console.log(cognitoSub)
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      return await this.userRepository.getMet(cognitoSub)
    } catch (error) {
      throw error
    }
  }

  public async usernameExsit(username: string): Promise<ResponseUserDTO | {}> {
    try{
      return await this.userRepository.findUsername(username);
    }catch(error){
      throw error
    }
  }


  public async updateUser(data: UpdateUserDTO): Promise<ResponseUserDTO | undefined> {
    try {
      const { request, profileFiles, backgroundFiles, ...updateFields } = data;
      const cognitosub = request.cookies?.username
      if (!cognitosub) {
        throw new UnauthorizedError();
      }
      const existingUser = await this.userRepository.findByCognitoSub(cognitosub);
      if (!existingUser) {
        throw new Error("User not found");
      }

      const updateData: Partial<User> = { ...updateFields };

      if (profileFiles && profileFiles.length > 0) {
        const profileUrls = await Promise.all(
          profileFiles.map((file: any) => uploadFileToS3Service.uploadFile(file)),
        );
        updateData.profile = [...new Set([...(existingUser.profile || []), ...profileUrls])];
      }

      if (backgroundFiles && backgroundFiles.length > 0) {
        const backgroundUrls = await Promise.all(
          backgroundFiles.map((file: any) => uploadFileToS3Service.uploadFile(file)),
        );
        updateData.background = [...new Set([...(existingUser.background || []), ...backgroundUrls])];
      }

      const updatedUser = await this.userRepository.updateUserByCognitoSub(cognitosub, updateData);

      if (!updatedUser) {
        throw new Error("Error updating user");
      }

      return updatedUser;
    } catch (error) {

    }
  }

  public async deleteProfileImageByIndex(data: DeleteProfileImageRequestDTO): Promise<void> {
    const { profileId, request } = data;
    const cognitoSub = request.cookies?.username;
    if (!cognitoSub) {
      throw new UnauthorizedError();
    }
    const existingUser = await this.userRepository.findByCognitoSub(cognitoSub);
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (!existingUser.profile || profileId < 0 || profileId >= existingUser.profile.length) {
      throw new Error("Invalid index");
    }

    // Get the profile URL at the specified index
    const profileUrl = existingUser.profile[profileId];

    // Extract the S3 key from the profile URL
    const s3Key = profileUrl.split(`${configs.awsS3BucketName}.s3.${configs.awsS3Region}.amazonaws.com/`)[1];

    // Delete the file from S3
    await uploadFileToS3Service.deleteFile(s3Key);

    // Remove the URL from the user's profile array
    const updatedBackground = existingUser.profile.filter((_, i) => i !== profileId);

    // Update the user profile array in the database
    await this.userRepository.updateUserByCognitoSub(cognitoSub, { profile: updatedBackground });
  }

  public async deleteBackgroundImageByIndex(request: Express.Request, index: number): Promise<void> {
    try {

      const cognitoSub = request.cookies?.username;
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      const existingUser = await this.userRepository.findByCognitoSub(cognitoSub);
      console.log(existingUser)
      if (!existingUser) {
        throw new Error("User not found");
      }
      if (!existingUser.background || index < 0 || index >= existingUser.background.length) {
        throw new Error("Invalid index");
      }
      // Get the profile URL at the specified index
      const backgroundUrl = existingUser.background[index];

      // Extract the S3 key from the profile URL
      const s3Key = backgroundUrl.split(`${configs.awsS3BucketName}.s3.${configs.awsS3Region}.amazonaws.com/`)[1];

      // Delete the file from S3
      await uploadFileToS3Service.deleteFile(s3Key);

      // Remove the URL from the user's profile array
      const updatedBackground = existingUser.background.filter((_, i) => i !== index);

      // Update the user profile array in the database
      await this.userRepository.updateUserByCognitoSub(cognitoSub, { background: updatedBackground });
    } catch (error: any) {
      throw error
    }
  }

  public async toggleFavorite(
    request: Express.Request,
    propertyId: Types.ObjectId,
  ): Promise<ResponseUserDTO | null> {
    try {
      const cognitoSub = request.cookies?.username;
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }

      const user = await this.userRepository.findByCognitoSub(cognitoSub);
      if (!user) {
        throw new Error("User not found");
      }

      // Ensure the favorite array is initialized
      user.favorite = user.favorite || [];

      // Check if the propertyId is already in the favorites
      const existingFavoriteIndex = user.favorite.findIndex(fav => fav.propertyId?.equals(propertyId));

      if (existingFavoriteIndex > -1) {
        // Remove the property from favorites if it exists
        user.favorite.splice(existingFavoriteIndex, 1);
      } else {
        // Add the propertyId to the favorite array if it doesn't already exist
        user.favorite.push({ propertyId: propertyId, addedAt: new Date() });
      }

      return this.userRepository.updateUserByCognitoSub(cognitoSub, { favorite: user.favorite });
    } catch (error) {
      throw error;
    }
  }


}
