import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@/src/utils/error/customErrors";
import {
  RequestUserDTO,
  ResponseFindUserBySubDTO,
  ResponseFindUserDTO,
  ResponseUpdateUserDTO,
  ResponseUserDTO,
  User,
} from "@/src/utils/types/indext";
import { UserModel } from "../models/user.model";
// =========================================================================


export class UserRepository {

  public async create(requestBody: RequestUserDTO): Promise<ResponseUserDTO> {
    try {
      const { cognitoSub, email, userName } = requestBody;
      const usernameExist = await UserModel.find({ userName: userName });
      if (usernameExist.length > 0) {
        throw new ValidationError(" Username already existed");
      }
      // console.log("the best result" + req.user);
      if (!cognitoSub ||  !email || !userName) {
        throw new ValidationError(
          " CognitoSub , firstname, lastname and username are required!",
        );
      }
      const data = { cognitoSub, email,userName };
      const response = await UserModel.create(data);
      return response;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new InternalServerError(error.message);
      }
    }
  }

  public async getMet(cognitoSub: string): Promise<ResponseUserDTO | null> {
    try {
      console.log(cognitoSub);
      const response = await UserModel.findOne({ cognitoSub: cognitoSub });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findUsername(username: string): Promise<ResponseUserDTO | {}> {
    try {
      const response = await UserModel.find({ userName: username });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findUsers(
    query: any,
    skip: number,
    limit: number,
  ): Promise<ResponseFindUserDTO> {
    try {
      const [users, totalUsers] = await Promise.all([
        UserModel.find(query).skip(skip).limit(limit).lean(), // Use lean for performance improvement
        UserModel.countDocuments(query),
      ]);

      if (!users || !totalUsers) {
        throw new NotFoundError("Users not found");
      }
      return { users, totalUsers };
    } catch (error: any) {
      throw error;
    }
  }

  public async findByCognitoSub(
    cognitoSub: string,
  ): Promise<ResponseFindUserBySubDTO | null> {
    try {
      return UserModel.findOne({ cognitoSub: cognitoSub }).exec();
    } catch (error) {
      throw error;
    }
  }

  // public async updateUserByCognitoSub(
  //   cognitoSub: string,
  //   updateData: Partial<User>,
  // ): Promise<ResponseUpdateUserDTO | null> {
  //   try {
  //     return UserModel.findOneAndUpdate(
  //       { cognitoSub },
  //       { $set: { propertyId: updateData}  },
  //       { new: true },
  //     ).exec();
  //   } catch (error: any) {
  //     throw error;
  //   }
  // }
  
  public async updateUserByCognitoSub(
    cognitoSub: string,
    updateData: Partial<User>,
  ): Promise<ResponseUpdateUserDTO | null> {
    try {
      return UserModel.findOneAndUpdate(
        { cognitoSub },
        { $set: updateData }, // Update only the necessary fields
        { new: true },
      ).exec();
    } catch (error: any) {
      throw error;
    }
  }

}
