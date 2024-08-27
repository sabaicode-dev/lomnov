import { Controller, Route, Post, Body, Request } from "tsoa";
import { RequestUserDTO, ResponseUserDTO } from "../utils/types/indext";
import { UserService } from "@/src/services/user.service";
// import authenticateToken from "../middlewares/authenticateToken";
// Import Express's Request type

@Route("api/v1")
export class ProductController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  // @Middlewares([authenticateToken])
  @Post("/users")

  public async register(
    @Body() requestBody: RequestUserDTO,

    @Request() req: Express.Request
  ): Promise<ResponseUserDTO> {
    try {
      const response = await this.userService.createUser(requestBody, req);
      return response;
    } catch (error) {
      throw error
    }
  }







}
