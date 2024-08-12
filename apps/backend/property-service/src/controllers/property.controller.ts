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
} from "tsoa";
import { PropertyService } from "@/src/services/property.service";
import { Property, CreatePropertyDTO } from "@/src/utils/types/indext";
import { PropertyModel } from "@/src/database/models/property.model";

// ====================================================================

export interface UpdatePropertyDTO {
  title?: { content: string; language: string }[];
  description?: { content: string; language: string }[];
  urlmap?: string;
  address?: string;
  price?: number;
  detail?: Record<string, any>;
  status?: boolean;
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
    @FormField() price?: number,
    @FormField() detail?: string, // JSON string representing key-value pairs
  ): Promise<Property> {
    try {
      const propertyData: CreatePropertyDTO = {
        title: JSON.parse(title),
        description: JSON.parse(description),
        thumbnail: "",
        images: [],
        urlmap,
        address,
        price,
        detail: detail ? JSON.parse(detail) : {},
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
    @Query() title?: string,
    @Query() price?: number,
    @Query() language?: string,
  ): Promise<any> {
    try {
      const query: any = {};

      if (title) {
        query["title.content"] = { $regex: title, $options: "i" };
      }

      if (price) {
        query["price"] = price;
      }

      if (language) {
        query["title.language"] = language;
        query["description.language"] = language;
      }

      let properties = await PropertyModel.find(query).lean(); // Use .lean() to get plain objects

      if (language) {
        properties = properties.map((property) => {
          return {
            ...property,
            title:
              property.title?.filter((t: any) => t.language === language) || [],
            description:
              property.description?.filter(
                (d: any) => d.language === language,
              ) || [],
          };
        });
      }

      return properties;
    } catch (error) {
      console.error("Error fetching properties:", error);
      this.setStatus(500);
      throw new Error("Failed to fetch properties");
    }
  }

  @Put("/properties/{propertyId}")
  public async updateProperty(
    @Path() propertyId: string,
    @UploadedFile() thumbnail?: Express.Multer.File,
    @UploadedFiles() images?: Express.Multer.File[],
    @FormField() title?: string, // Assuming these are passed as JSON strings
    @FormField() description?: string,
    @FormField() urlmap?: string,
    @FormField() address?: string,
    @FormField() price?: number,
    @FormField() detail?: string,
    @FormField() status?: boolean,
  ): Promise<Property | null> {
    try {
      // Parsing JSON strings to objects
      const parsedTitle = title ? JSON.parse(title) : undefined;
      const parsedDescription = description
        ? JSON.parse(description)
        : undefined;
      const parsedDetail = detail ? JSON.parse(detail) : undefined;

      // Construct property data object
      const propertyData: Partial<Property> = {
        title: parsedTitle,
        description: parsedDescription,
        urlmap,
        address,
        price,
        detail: parsedDetail,
        status,
      };

      return await this.propertyService.updateProperty(
        propertyId,
        propertyData,
        { thumbnail, images },
      );
    } catch (error) {
      console.error("Error in updateProperty:", error);
      this.setStatus(500);
      throw new Error("Failed to update property");
    }
  }

  @Delete("/properties/{propertyId}")
  public async deleteProperty(@Path() propertyId: string): Promise<{ message: string }> {
    try {
      const result = await this.propertyService.deleteProperty(propertyId);
      return { message: result ? "Delete successfully" : "Property not found" };
    } catch (error) {
      console.error('Error in deleteProperty:', error);
      this.setStatus(500);
      throw new Error('Failed to delete property');
    }
  }
}
