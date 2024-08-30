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
  Tags,
} from "tsoa";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
  DeleteProfileImageResponseDTO,
} from "../utils/types/indext";
import { UserService } from "@/src/services/user.service";
import { UserModel } from "../database/models/user.model";
// =========================================================

@Tags(" User service")
@Route("api/v1/users")
export class ProductController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post("/")
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

  @Get("/")
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

  @Get("/username/{username}")

  public async findUsernameExite(@Path() username: string) {
    try {
      const response = await UserModel.find({ userName: username });
      if (response.length > 0) {
        return { usernameExist: true }
      }
      return {usernameExist: false}
    } catch (error) {
      throw error
    }
  }

  @Get("/me")
  public async getMe(): Promise<ResponseUserDTO | null> {
    try {
      // console.log('hello req', req.user)
      const cognitosub = "adfdfadf";
      const response = await this.userService.getMe(cognitosub);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put("/me")
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
  ): Promise<ResponseUserDTO | undefined> {
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
      throw error;
    }
  }

  @Delete("/my-profile/{profileId}")
  public async deleteMyProfile(
    @Path() profileId: number,
  ): Promise<DeleteProfileImageResponseDTO> {
    try {
      const requestDTO = {
        cognitoSub: "adfdfadf", // Replace this with actual logic to get cognitoSub
        profileId,
      };
      await this.userService.deleteProfileImageByIndex(requestDTO);
      return { message: "Profile image deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  @Delete("/my-background/{profileId}")
  public async deleteMyBackground(@Path() profileId: number): Promise<any> {
    try {
      const cognitosub = "adfdfadf";
      await this.userService.deleteBackgroundImageByIndex(
        cognitosub,
        profileId,
      );
      return { message: "Background image deleted successfully" };
    } catch (error) {
      console.error("Error deleting background image:", error);
      throw error;
    }
  }

  @Put("/favorite/{propertyId}")
  public async favorite(@Path() propertyId: string): Promise<any> {
    const cognitoSub = "adfdfadf"; // This should come from the authenticated user's token in a real app
    try {
      const updatedUser = await this.userService.addFavorite(
        cognitoSub,
        propertyId,
      );
      return { message: "Property added to favorites", user: updatedUser };
    } catch (error) {
      throw error;
    }
  }
}
