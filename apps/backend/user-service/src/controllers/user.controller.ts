import { Controller, Route, Post, Body, Request, Get, Query, Put, UploadedFiles, FormField } from "tsoa";
import {
  RequestUserDTO,
  ResponseUserDTO,
  ResponseAllUserDTO,
  GetAllUsersQueryDTO,
} from "../utils/types/indext";
import { UserService } from "@/src/services/user.service";
import { UserModel } from "../database/models/user.model";
import uploadFileToS3Service from "../services/uploadFileToS3.service";
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
      if (!cognitosub) {
        throw new Error("CognitoSub is required");
      }

      const existingUser = await UserModel.findOne({ cognitoSub: cognitosub });

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Initialize an update object
      const updateData: Partial<typeof existingUser> = {};

      // Handle profile update
      if (profileFiles && profileFiles.length > 0) {
        // Add new profile images to the array
        const profileUrls = await Promise.all(
          profileFiles.map((file) => uploadFileToS3Service.uploadFile(file)),
        );
        updateData.profile = [...new Set([...(existingUser.profile || []), ...profileUrls])];
      }

      // Handle background update
      if (backgroundFiles && backgroundFiles.length > 0) {
        // Add new background images to the array
        const backgroundUrls = await Promise.all(
          backgroundFiles.map((file) => uploadFileToS3Service.uploadFile(file)),
        );
        updateData.background = [...new Set([...(existingUser.background || []), ...backgroundUrls])];
      }

      // Update other fields if provided
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (userName) updateData.userName = userName;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (address) updateData.address = address;
      if (gender) updateData.gender = gender;
      if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;

      // Update user in the database
      const updatedUser = await UserModel.findOneAndUpdate(
        { cognitoSub: cognitosub },
        { $set: updateData },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Error updating user");
      }

      return { message: "User updated successfully", user: updatedUser };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }


}
