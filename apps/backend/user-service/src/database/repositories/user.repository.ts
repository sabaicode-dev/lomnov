// =========================================================================

import { InternalServerError, NotFoundError, ValidationError } from "@/src/utils/error/customErrors";
import { RequestUserDTO, ResponseFindUserDTO, ResponseUserDTO, User } from "@/src/utils/types/indext";
import { UserModel } from "../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      roles: string[];
      [key: string]: any; // Additional properties can be added here
    };
  }
}


export class UserRepository {
  public async create(
    requestBody: RequestUserDTO,
    _req: Express.Request,
  ): Promise<ResponseUserDTO> {
    try {
      const { cognitoSub, firstName, lastName, userName } = requestBody;
      // console.log("the best result" + req.user);
      if (!cognitoSub || !firstName || !lastName || !userName) {
        throw new ValidationError(
          " CognitoSub , firstname, lastname and username are required!",
        );
      }
      const data = { cognitoSub, firstName, lastName, userName };
      const response = await UserModel.create(data);
      return response;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw error;
      } else {
        throw new Error(error.message);
      }
    }
  }

  public async getMet(cognitoSub: string):Promise<ResponseUserDTO | null> {
    try{
      const response = await UserModel.findOne({ cognitoSub: cognitoSub });
      return response;
    }catch(error){
      throw error
    }
  }

  public async findUsers(query: any, skip: number, limit: number): Promise<ResponseFindUserDTO> {
    try {
      const [users, totalUsers] = await Promise.all([
        UserModel.find(query).skip(skip).limit(limit).lean(), // Use lean for performance improvement
        UserModel.countDocuments(query),
      ]);

      if (!users || !totalUsers) {
        throw new NotFoundError("Users not found")
      }
      return { users, totalUsers };
    } catch (error: any) {
      throw new InternalServerError(error.message)
    }
  }

  public async findByCognitoSub(cognitoSub: string): Promise<ResponseUserDTO | null> {
    return UserModel.findOne({ cognitoSub: cognitoSub }).exec();
  }

  public async updateUserByCognitoSub(cognitoSub: string, updateData: Partial<User>): Promise<ResponseUserDTO | null> {
    return UserModel.findOneAndUpdate(
      { cognitoSub },
      { $set: updateData },
      { new: true },
    ).exec();
  }





}
