import { Controller, Route, Post, Body } from "tsoa";
import { RequestUserDTO, ResponseUserDTO } from "../utils/types/indext";
import { UserService } from "@/src/services/user.service";

@Route("api/v1")
export class ProductController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("/users")
  public async register(
    @Body() requestBody: RequestUserDTO,
  ): Promise<ResponseUserDTO> {
    try {
      const response = await this.userService.createUser(requestBody);
      return response;
    } catch (error) {
      throw error
    }
  }

  



}
