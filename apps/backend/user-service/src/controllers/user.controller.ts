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
import { Types } from "mongoose";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
  DeleteProfileImageResponseDTO,
  FavoriteResponseDTO,
  ResponseUsernameExist,
} from "@/src/utils/types/indext";
import { UserService } from "@/src/services/user.service";

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
  ): Promise<ResponseUserDTO> {
    try {
      const response = await this.userService.createUser(requestBody);
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
      throw error;
    }
  }

  @Get("/username/{username}")
  public async findUsernameExite(
    @Path() username: string,
  ): Promise<ResponseUsernameExist> {
    try {
      const response = await this.userService.usernameExsit(username);
      if (response && Object.keys(response).length > 0) {
        return { usernameExist: true };
      }
      return { usernameExist: false };
    } catch (error) {
      throw error;
    }
  }

  @Get("/me")
  public async getMe(
    @Request() request: Express.Request,
  ): Promise<ResponseUserDTO | null> {
    try {
      const response = await this.userService.getMe(request);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Put("/me")
  public async updateMe(
    @Request() request: Express.Request,
    @UploadedFiles() profileFiles?: Express.Multer.File[], // Files for profile
    @UploadedFiles() backgroundFiles?: Express.Multer.File[], // Files for background
    @FormField() firstName?: string,
    @FormField() lastName?: string,
    @FormField() userName?: string,
    @FormField() phoneNumber?: string,
    @FormField() address?: string,
    @FormField() gender?: string,
    @FormField() dateOfBirth?: string,
    @FormField() location? : string,
  ): Promise<ResponseUserDTO | undefined> {
    try {
      const updateData = {
        firstName,
        lastName,
        userName,
        phoneNumber,
        address,
        location,
        gender,
        dateOfBirth,
        request,
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
    @Request() request: Express.Request,
  ): Promise<DeleteProfileImageResponseDTO> {
    try {
      const requestDTO = {
        request, // Replace this with actual logic to get cognitoSub
        profileId,
      };
      await this.userService.deleteProfileImageByIndex(requestDTO);
      return { message: "Profile image deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  @Delete("/my-background/{backgroundId}")
  public async deleteMyBackground(
    @Path() backgroundId: number,
    @Request() request: Express.Request,
  ): Promise<{ message: string }> {
    try {
      await this.userService.deleteBackgroundImageByIndex(
        request,
        backgroundId,
      );
      return { message: "Background image deleted successfully" };
    } catch (error) {
      console.error("Error deleting background image:", error);
      throw error;
    }
  }

  @Put("/favorite/{propertyId}")
  public async toggleFavorite(
    @Path() propertyId: Types.ObjectId,
    @Request() request: Express.Request,
  ): Promise<FavoriteResponseDTO | null> {
    try {
      const updatedUser = await this.userService.toggleFavorite(request, propertyId);
      const action = updatedUser?.favorite?.some(fav => fav.propertyId?.equals(propertyId))
        ? "added to"
        : "removed from";
      return { message: `Property ${action} favorites`, user: updatedUser };
    } catch (error) {
      throw error;
    }
  }
}
