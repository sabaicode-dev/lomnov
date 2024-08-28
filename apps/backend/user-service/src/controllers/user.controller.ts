import {
  Controller,
  Route,
  Post,
  Body,
  Request,
  Get,
  Query,
  Put,
  UploadedFiles,
  FormField,
  Delete,
  Path,
} from "tsoa";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
} from "../utils/types/indext";
import { UserService } from "@/src/services/user.service";
import { UserModel } from "../database/models/user.model";

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
    @Request() req: Express.Request,
  ): Promise<ResponseUserDTO> {
    try {
      // console.log('hello req', req.user)
      const response = await this.userService.createUser(requestBody, req);
      return response;
    } catch (error) {
      throw error;
    }
  }
  @Get("/users")
  public async getAllUser(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() firstName?: string,
    @Query() lastName?: string,
    @Query() userName?: string,
    @Query() role?: string,
  ): Promise<ResponseAllUserDTO | undefined> {
    try {
      const queries: GetAllUsersQueryDTO = {
        page,
        limit,
        firstName,
        lastName,
        userName,
        role,
      };
      return await this.userService.getAllUsers(queries);
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }

  @Get("/users/me")
  public async getMe(): Promise<any> {
    try {
      // console.log('hello req', req.user)
      const cognitosub = "adfdfadf";
      const response = await UserModel.findOne({ cognitoSub: cognitosub });
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put("/users/me")
  public async updateMe(
    @FormField() cognitosub: string,
    @UploadedFiles() profileFiles?: Express.Multer.File[], // Files for profile
    @UploadedFiles() backgroundFiles?: Express.Multer.File[], // Files for background
    @FormField() firstName?: string,
    @FormField() lastName?: string,
    @FormField() userName?: string,
    @FormField() phoneNumber?: string,
    @FormField() address?: string,
    @FormField() gender?: string,
    @FormField() dateOfBirth?: string,
  ): Promise<any> {
    try {
      const updateData = {
        firstName,
        lastName,
        userName,
        phoneNumber,
        address,
        gender,
        dateOfBirth,
        cognitosub,
        profileFiles,
        backgroundFiles,
      };
      return await this.userService.updateUser(updateData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  @Delete("/my-profile/{profileId}")
  public async deleteMyProfile(
    @Path() profileId: number,

  ): Promise<any> {
    try {
      const cognitosub = "adfdfadf";


      await this.userService.deleteProfileImageByIndex(cognitosub, profileId);

      return { message: "Profile image deleted successfully" };
    } catch (error) {
      console.error("Error deleting profile image:", error);
      throw error;
    }
  }

}
