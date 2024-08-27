// =========================================================================

import { ValidationError } from "@/src/utils/error/customErrors";
import { RequestUserDTO, ResponseUserDTO } from "@/src/utils/types/indext";
import { UserModel } from "../models/user.model";
// import { Request } from "express";
// Extend the Express Request interface
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

      // console.log("the best result" + req.user?.sub);

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
}
