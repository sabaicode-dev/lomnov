import configs from "../config";
import { UserRepository } from "../database/repositories/user.repository";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
  UpdateUserDTO,
  User,
  DeleteProfileImageRequestDTO,

} from "../utils/types/indext";
import uploadFileToS3Service from "./uploadFileToS3.service";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(
    requestBody: RequestUserDTO,
    req: Express.Request,
  ): Promise<ResponseUserDTO> {
    try {
      return await this.userRepository.create(requestBody, req);
    } catch (error) {
      throw error;
    }
  }

  public async getMe(cognitoSub: string): Promise<ResponseUserDTO | null> {
    try {
      return await this.userRepository.getMet(cognitoSub)
    } catch (error) {
      throw error
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

  public async updateUser(data: UpdateUserDTO): Promise<ResponseUserDTO | undefined> {
    try {

      const { cognitosub, profileFiles, backgroundFiles, ...updateFields } = data;

      if (!cognitosub) {
        throw new Error("CognitoSub is required");
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
    const existingUser = await this.userRepository.findByCognitoSub(data.cognitoSub);
    console.log(existingUser)
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (!existingUser.profile || data.profileId < 0 || data.profileId >= existingUser.profile.length) {
      throw new Error("Invalid index");
    }

    // Get the profile URL at the specified index
    const profileUrl = existingUser.profile[data.profileId];

    // Extract the S3 key from the profile URL
    const s3Key = profileUrl.split(`${configs.awsS3BucketName}.s3.${configs.awsRegion}.amazonaws.com/`)[1];

    // Delete the file from S3
    await uploadFileToS3Service.deleteFile(s3Key);

    // Remove the URL from the user's profile array
    const updatedBackground = existingUser.profile.filter((_, i) => i !== data.profileId);

    // Update the user profile array in the database
    await this.userRepository.updateUserByCognitoSub(data.cognitoSub, { profile: updatedBackground });
  }

  public async deleteBackgroundImageByIndex(cognitosub: string, index: number): Promise<any> {
    const existingUser = await this.userRepository.findByCognitoSub(cognitosub);
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
    const s3Key = backgroundUrl.split(`${configs.awsS3BucketName}.s3.${configs.awsRegion}.amazonaws.com/`)[1];

    // Delete the file from S3
    await uploadFileToS3Service.deleteFile(s3Key);

    // Remove the URL from the user's profile array
    const updatedBackground = existingUser.background.filter((_, i) => i !== index);

    // Update the user profile array in the database
    return await this.userRepository.updateUserByCognitoSub(cognitosub, { background: updatedBackground });
  }

  public async addFavorite(cognitoSub: string, propertyId: string): Promise<any> {
    const user = await this.userRepository.findByCognitoSub(cognitoSub);
    if (!user) {
      throw new Error("User not found");
    }
    // Ensure the favorite array is initialized
    user.favorite = user.favorite || [];

    // Add the propertyId to the favorite array if it doesn't already exist
    if (!user.favorite.includes(propertyId)) {
      user.favorite.push(propertyId);
    }

    return this.userRepository.updateUserByCognitoSub(cognitoSub, { favorite: user.favorite });
  }


}
