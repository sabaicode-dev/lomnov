import { Controller, Route, Post, Body } from "tsoa";
import { User } from "../utils/types/indext";
import { UserModel } from "../database/models/user.model";

@Route("api/v1")
export class ProductController extends Controller {
  @Post("/users")
  public async createUser(@Body() requestBody: User): Promise<User> {
    const { cognitoSub, firstName, lastName, userName } = requestBody;
    const data = { cognitoSub, firstName, lastName, userName };
    try {
      const response = await UserModel.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
