// =========================================================================

import { ValidationError } from "@/src/utils/error/customErrors";
import { RequestUserDTO, ResponseUserDTO } from "@/src/utils/types/indext";
import { UserModel } from "../models/user.model";

export class UserRepository {
  public async create(requestBody: RequestUserDTO): Promise<ResponseUserDTO> {
    try {
      const { cognitoSub, firstName, lastName, userName } = requestBody;
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
        throw error
      } else {
        throw new Error(error.message)
      }

    }
  }

  public async get(): Promise<any> {
    try {
    } catch (error) {
      throw error;
    }
  }

  public async update(): Promise<any> {
    try {
    } catch (error) {

    }
  }

  public async delete(): Promise<any> {
    try {
    } catch (error) {

    }
  }

  // Additional database operations can be added here (e.g., find, update, delete).
}
