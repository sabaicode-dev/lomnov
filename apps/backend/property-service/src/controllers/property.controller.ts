import {
  Controller,
  Post,
  Delete,
  Route,
  UploadedFile,
  UploadedFiles,
  FormField,
  Get,
  Query,
  Put,
  Path,
  Tags,
  Request
} from "tsoa";
import { PropertyService } from "@/src/services/property.service";
import { RequestPropertyDTO, RequestUpdatePropertyDTO, ResponseAllPropertyDTO, ResponseCreatePropertyDTO, ResponseUpdatePropertyDTO } from "@/src/utils/types/indext";
import { Request as Express } from "express";
import { UnauthorizedError } from "../utils/error/customErrors";
// ====================================================================

declare global {
  namespace Express {
    interface Request {
      cookies: { [key: string]: string }; // Define the structure of cookies
    }
  }
}

@Tags("Property Service")
@Route("api/v1")
export class PropertyController extends Controller {

  private propertyService: PropertyService;
  constructor() {
    super();
    this.propertyService = new PropertyService();
  }

  @Post("/properties")
  public async createProperty(
    @UploadedFile() thumbnail: Express.Multer.File,
    @UploadedFiles() images: Express.Multer.File[],
    @FormField() title: string,
    @FormField() description: string,
    @FormField() urlmap?: string,
    @FormField() address?: string,
    @FormField() location?: string,
    @FormField() price?: number,
    @FormField() category?: string,
    @FormField() transition?: string,
    @FormField() detail?: string,
    @Request() request?: Express.Request
  ): Promise<ResponseCreatePropertyDTO> {
    try {
      const cognitoSub = request?.cookies.username!;
      if (!cognitoSub) {
        throw new UnauthorizedError();
      }
      const propertyData: RequestPropertyDTO = {
        cognitoSub,
        title: JSON.parse(title),
        description: JSON.parse(description),
        thumbnail: "",
        images: [],
        urlmap,
        location: location ? JSON.parse(location) : [],
        address: address ? JSON.parse(address) : [],
        price,
        category: category ? JSON.parse(category) : [],
        transition: transition ? JSON.parse(transition) : [],
        detail: detail ? JSON.parse(detail) : [],
      };
      return await this.propertyService.createProperty(propertyData, {
        thumbnail,
        images,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get("/properties")
  public async getProperty(
    @Query() cognitoSub?: string,
    @Query() title?: string,
    @Query() description?: string,
    @Query() address?: string,
    @Query() location?: string,
    @Query() category?: string,
    @Query() transition?: string,
    @Query() price?: number,
    @Query() language?: string,
    @Query() price_gte?: number,
    @Query() price_lte?: number,
    @Query() page: number = 1,
    @Query() limit: number = 10,
    // @Request() request?: Express.Request
  ): Promise<ResponseAllPropertyDTO> {
    try {
      // const cognitoSub = request?.cookies.username!
      const queries = {
        cognitoSub,
        title,
        description,
        address,
        location,
        category,
        transition,
        price,
        language,
        price_gte,
        price_lte,
        page,
        limit,
      };
      return await this.propertyService.getProperties(queries);
    } catch (error) {
      throw error
    }
  }

  @Get("/properties/me")
  public async getPropertyMe(
    @Query() title?: string,
    @Query() description?: string,
    @Query() address?: string,
    @Query() location?: string,
    @Query() category?: string,
    @Query() transition?: string,
    @Query() price?: number,
    @Query() language?: string,
    @Query() price_gte?: number,
    @Query() price_lte?: number,
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Request() request?: Express.Request,
  ): Promise<ResponseAllPropertyDTO> {
    try {
      const cognitoSub = request?.cookies.username!
      if (!cognitoSub) {
        throw new UnauthorizedError()
      }
      const queries = {
        cognitoSub,
        title,
        description,
        address,
        location,
        category,
        transition,
        price,
        language,
        price_gte,
        price_lte,
        page,
        limit,
      };

      return await this.propertyService.getPropertiesMe(queries);
    } catch (error) {
      throw error
    }
  }

  @Put("/properties/me/{propertyId}")
  public async updateProperty(
    @Path() propertyId: string,
    @UploadedFile() thumbnail?: Express.Multer.File,
    @UploadedFiles() images?: Express.Multer.File[],
    @FormField() title?: string, // Assuming these are passed as JSON strings
    @FormField() description?: string,
    @FormField() urlmap?: string,
    @FormField() address?: string,
    @FormField() location?: string,
    @FormField() category?: string,
    @FormField() transition?: string,
    @FormField() price?: number,
    @FormField() detail?: string,
    @FormField() status?: boolean,
    @Request() request?: Express.Request,
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      const cognitoSub = request?.cookies.username!
      if (!cognitoSub) {
        throw new UnauthorizedError()
      }
      // Parsing JSON strings to objects
      const parsedTitle = title ? JSON.parse(title) : undefined;
      const parsedDescription = description
        ? JSON.parse(description)
        : undefined;
      const parseLocation = location ? JSON.parse(location) : undefined;
      const parseCategory = category ? JSON.parse(category) : undefined;
      const parseTransition = transition ? JSON.parse(transition) : undefined;
      const parsedDetail = detail ? JSON.parse(detail) : undefined;
      const parsedAddress = address ? JSON.parse(address) : undefined;

      // Construct property data object
      const propertyData: Partial<RequestUpdatePropertyDTO> = {
        title: parsedTitle,
        description: parsedDescription,
        urlmap,
        address: parsedAddress,
        location: parseLocation,
        price,
        category: parseCategory,
        transition: parseTransition,
        detail: parsedDetail,
        status,
      };

      return await this.propertyService.updateProperty(
        propertyId,
        propertyData,
        { thumbnail, images },
        cognitoSub
      );
    } catch (error) {
      throw error
    }
  }

  @Delete("/properties/me/{propertyId}")
  public async deleteProperty(
    @Path() propertyId: string,
    @Request() request?: Express.Request
  ): Promise<{ message: string }> {
    try {
      const cognitoSub = request?.cookies.username;
      const result = await this.propertyService.deleteProperty(propertyId, cognitoSub );
      return { message: result ? "Delete successfully" : "Property not found" };
    } catch (error) {
      console.error("Error in deleteProperty:", error);
      this.setStatus(500);
      throw new Error("Failed to delete property");
    }
  }
}
