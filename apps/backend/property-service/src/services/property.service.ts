

import {
  RequestFPropertiesByLanguageDTO,
  RequestPropertyDTO,
  RequestQueryPropertyDTO,
  RequestUpdatePropertyDTO,
  ResponseAllPropertyDTO,
  ResponseCreatePropertyDTO,
  ResponseFPropertiesByLanguageDTO,
  ResponseUpdatePropertyDTO,
  RequestQueryPropertyMeDTO,
  ResponseAllPropertyMeDTO,
  ResponsePropertyDTO,
  ResponsePropertyByID,
  ResponseCategoriesDTO,
  CommentResponse,
} from "@/src/utils/types/indext";
import { ResponsePropertyByIDP } from "@/src/utils/types/indext";
import { PropertyRepository } from "../database/repositories/property.repository";
import { NotFoundError, UnauthorizedError } from "../utils/error/customErrors";
import { UserServiceClient } from "./userServiceClient";
import { IProperty } from "@/src/utils/types/indext";
import { CommentModel } from "../database/models/comment.model";
// ===============================================================================

export class PropertyService {
  private propertyRepository: PropertyRepository;
  private userServiceClient: UserServiceClient;
  constructor() {
    this.propertyRepository = new PropertyRepository();
    this.userServiceClient = new UserServiceClient();
  }

  public async createProperty(
    propertyData: RequestPropertyDTO,
    files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] }
  ): Promise<ResponseCreatePropertyDTO> {
    console.log("create properties service");
    try {
      return await this.propertyRepository.create(propertyData, files);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //update status
  public async updatePropertyStatus(
    propertyId: string,
    status: boolean
  ): Promise<IProperty | null> {
    try {
      // Call the repository to update the status
      const updatedProperty = await this.propertyRepository.updatePropertyStatus(
        propertyId,
        status
      );

      // Return the updated property (or null if not found)
      return updatedProperty;
    } catch (error) {
      console.error("Error in PropertyService - updatePropertyStatus:", error);
      throw error;
    }
  }

  //update status Admin
  public async updatestatusAdmin(
    propertyId: string,
    statusAdmin : boolean
  ) : Promise<IProperty | null> {
    try {
      const updateadmin = await this.propertyRepository.updatestatusAdmin(
        propertyId,
        statusAdmin
      );
      return updateadmin;
    } catch (error) {
      console.error("Error in proeprty service", error);
      throw error;
    }
  }


  public async getProperties(
    queries: RequestQueryPropertyDTO
  ): Promise<ResponseAllPropertyDTO> {
    const { language, page = 1, limit = 12 } = queries;
    const skip = (page - 1) * limit;
    const filters = this.buildFilters(queries);

    const [properties, totalProperty] = await Promise.all([
      this.propertyRepository.findPropertiesMe(filters, skip, limit),
      this.propertyRepository.countPropertiesMe(filters),
    ]);

    const filteredProperties = language
      ? this.filterPropertiesByLanguage(properties, language)
      : properties;
    const totalPages = Math.ceil(totalProperty / limit);

    return {
      properties: filteredProperties,
      pagination: {
        currentPage: page,
        totalPages,
        totalProperty,
      },
    };
  }

  public async getPropertiesMe(
    queries: RequestQueryPropertyMeDTO
  ): Promise<ResponseAllPropertyMeDTO> {
    const { cognitoSub, language, page = 1, limit = 12, fav_me } = queries;

    if (!cognitoSub) {
      throw new UnauthorizedError();
    }

    const propertyFavouriteMe = await this.propertyRepository.findFavouritePropertyMe(fav_me);

    const skip = (page - 1) * limit;
    const filters = this.buildFilters(queries);
    // console.log("helo"+{...filters, cognitoSub})
    // Fetch data and count total properties
    const [properties, totalProperty] = await Promise.all([
      this.propertyRepository.findPropertiesMe(
        { ...filters, cognitoSub },
        skip,
        limit
      ),
      this.propertyRepository.countPropertiesMe({ ...filters, cognitoSub }),
    ]);

    const filteredProperties = language
      ? this.filterPropertiesByLanguage(properties, language)
      : properties;
    const totalPages = Math.ceil(totalProperty / limit);

    return {
      properties: filteredProperties,
      favoritesMe: propertyFavouriteMe,
      pagination: {
        currentPage: page,
        totalPages,
        totalProperty,
      },
    };
  }

  private buildFilters(
    queries: RequestQueryPropertyDTO
  ): Promise<ResponseAllPropertyDTO> {
    try {
      const {
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
      } = queries;
      const filters: any = {};

      if (
        cognitoSub ||
        title ||
        description ||
        address ||
        location ||
        category ||
        transition
      ) {
        if (typeof cognitoSub === "string") {
          filters["cognitoSub"] = cognitoSub;
        }
        if (typeof title === "string") {
          filters["title.content"] = { $regex: title, $options: "i" };
        }
        if (typeof description === "string") {
          filters["description.content"] = {
            $regex: description,
            $options: "i",
          };
        }
        if (typeof address === "string") {
          filters["address.content"] = { $regex: address, $options: "i" };
        }
        if (typeof location === "string") {
          filters["location.content"] = { $regex: location, $options: "i" };
        }
        if (typeof category === "string") {
          filters["category.content"] = { $regex: category, $options: "i" };
        }
        if (typeof transition === "string") {
          filters["transition.content"] = { $regex: transition, $options: "i" };
        }
      }

      if (price) {
        filters.price = price;
      } else {
        if (price_gte !== undefined) {
          filters.price = { ...filters.price, $gte: price_gte };
        }
        if (price_lte !== undefined) {
          filters.price = { ...filters.price, $lte: price_lte };
        }
      }
      if (language) {
        filters["title.language"] = language;
        filters["description.language"] = language;
        filters["address.language"] = language;
        filters["detail"] = {
          $elemMatch: {
            language: language,
          },
        };
      }
      return filters;
    } catch (error) {
      throw error;
    }
  }

  private filterPropertiesByLanguage(
    properties: RequestFPropertiesByLanguageDTO[],
    language: string
  ): ResponseFPropertiesByLanguageDTO[] {
    try {
      return properties.map((property) => ({
        ...property,
        title:
          property.title?.filter((t: any) => t.language === language) || [],
        description:
          property.description?.filter((d: any) => d.language === language) ||
          [],
        address:
          property.address?.filter((a: any) => a.language === language) || [],
        location:
          property.location?.filter((a: any) => a.language === language) || [],
        category:
          property.category?.filter((a: any) => a.language === language) || [],
        detail:
          property.detail?.filter(
            (detail: any) => detail.language === language
          ) || [],
        coordinate:
          property.coordinate
      }));
    } catch (error) {
      throw error;
    }
  }

  public async updateProperty(
    propertyId: string,
    propertyData: Partial<RequestUpdatePropertyDTO>,
    files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] },
    cognitoSub: string
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      const updatedProperty = await this.propertyRepository.update(
        propertyId,
        propertyData,
        files,
        cognitoSub
      );
      return updatedProperty;
    } catch (error) {
      console.error("Error in PropertyService.updateProperty:", error);
      throw new Error("Failed to update property");
    }
  }


  

  public async deleteProperty(
    propertyId: string,
    cognitoSub: string | undefined
  ): Promise<boolean> {
    try {
      return await this.propertyRepository.delete(propertyId, cognitoSub || "");
    } catch (error) {
      console.error("Error in PropertyService.deleteProperty:", error);
      throw new Error("Failed to delete property");
    }
  }

  //service delete property of every proeprty
  public async deleteEveryPropertyById(
    propertyId: string
  ): Promise<boolean> {
    try {
      return await this.propertyRepository.deleteById(propertyId);
      
    } catch (error) {
      throw new Error("Failed to delete property");
    }
  }

  //get by phol
  public async getPropertyByIDP(id: string) : Promise<ResponsePropertyByIDP> {
    try {
      const property = await this.propertyRepository.findPropertyByID(id);
      if(!property){
        throw new Error(`Property with ID ${id} not found `);
      }

      const detailedContent = property.detail
      ? property.detail.map((detail: any) => {
        return {
          language: detail.language,
          size: detail.content.get("size"),
          bedrooms: detail.content?.get("bedrooms"),
          bathrooms: detail.content?.get("bathrooms"),
          square: detail.content?.get("square"),
          fireplace: detail.content?.get("fireplace"),
          garden: detail.content?.get("garden"),
          patio: detail.content?.get("patio"),
          kitchen: detail.content?.get("kitchen"),
          land_size: detail.content?.get("land_size"),
          parking: detail.content?.get("parking"),
          road_size: detail.content?.get("road_size"),
          pool: detail.content?.get("pool"),
        }
      })
      : [];

      const respone : ResponsePropertyByIDP = {
        ...property,
        detail: detailedContent,
      }

      return respone;

    } catch (error) {
      throw error;
    }
  }


  public async getPropertyByID(id: string): Promise<ResponsePropertyByID> {
    try {
      // Fetch property details
      const property = await this.propertyRepository.findPropertyByID(id) as ResponsePropertyDTO;

      if (!property) {
        throw new Error(`Property with ID ${id} not found.`);
      }

      // Fetch property owner details
      const propertyOwner = await this.userServiceClient.propertyOwnerInfo(property.cognitoSub as string);


      // Safely map the `detail` field if it exists
      const detailedContent = property.detail
        ? property.detail.map((detail: any) => {
          return {
            language: detail.language,
            size: detail.content.get("size"),
            bedrooms: detail.content?.get("bedrooms"),
            bathrooms: detail.content?.get("bathrooms"),
            square: detail.content?.get("square"),
            fireplace: detail.content?.get("fireplace"),
            garden: detail.content?.get("garden"),
            patio: detail.content?.get("patio"),
            kitchen: detail.content?.get("kitchen"),
            land_size: detail.content?.get("land_size"),
            parking: detail.content?.get("parking"),
            road_size: detail.content?.get("road_size"),
            pool: detail.content?.get("pool"),
          }
        })
        : [];

      // Construct the response object
      const response: ResponsePropertyByID = {
        ...property,
        detail: detailedContent, // Replace detail with mapped data (or empty array if undefined)
        propertyOwner,
      };

      return response;
    } catch (error) {
      console.error(`Error fetching property by ID ${id}:`, error);

      // Re-throw the error with more context
      throw new Error(`Failed to fetch property with ID ${id}`);
    }
  }

  //get property by user
  public async getPropertyUser(
    cognitoSub: string,
    queries: RequestQueryPropertyDTO
  ): Promise<{
    properties: ResponsePropertyDTO[];
    totalPages: number;
    totalProperties: number;
  }> {
    try {
      console.log(cognitoSub);
      console.log(queries);

      // Retrieve user properties by cognitoSub
      const propertiesUser =
        await this.propertyRepository.findPropertyUserByCognitoSub(cognitoSub);

      if (!propertiesUser) {
        throw new NotFoundError(
          `No properties found for user with cognitoSub: ${cognitoSub}`
        );
      }

      // Extract pagination and filtering parameters
      const { language, page = 1, limit = 10 } = queries;
      const skip = (page - 1) * limit;

      const filters = {
        cognitoSub, // Restrict to the specific user
        ...this.buildFilters(queries), // Add other filters from the query
      };
      // Fetch paginated results and count total properties
      const [properties, totalProperties] = await Promise.all([
        this.propertyRepository.findPropertiesMe(filters, skip, limit),
        this.propertyRepository.countPropertiesMe(filters),
      ]);

      if (!properties.length) {
        throw new NotFoundError(
          "No properties found matching the provided criteria."
        );
      }

      // Apply language-specific filtering if necessary
      const filteredProperties = language
        ? this.filterPropertiesByLanguage(properties, language)
        : properties;

      // Calculate total pages
      const totalPages = Math.ceil(totalProperties / limit);

      // Return the paginated result
      return {
        properties: filteredProperties,
        totalPages,
        totalProperties,
      };
    } catch (error) {
      console.error(
        `Error retrieving properties for user with cognitoSub: ${cognitoSub}`,
        error
      );
      throw error;
    }
  }

  //==========this is get view==================

  // Method to increment the views of a property
  public async incrementPropertyViews(
    propertyId: string
  ): Promise<ResponsePropertyDTO> {
    try {
      // Call repository method to increment views
      const updatedProperty =
        await this.propertyRepository.incrementPropertyViews(propertyId);

      return updatedProperty;
    } catch (error) {
      // Handle error if property not found or other issues
      if (error instanceof NotFoundError) {
        throw new NotFoundError("Property not found");
      }
      throw error;
    }
  }

  // Method to get the total number of views for a property
  public async getPropertyViews(propertyId: string): Promise<number> {
    try {
      // Call repository method to get views count
      const views = await this.propertyRepository.getPropertyViews(propertyId);

      return views;
    } catch (error) {
      // Handle error if property not found or other issues
      if (error instanceof NotFoundError) {
        throw new NotFoundError("Property not found");
      }
      throw error;
    }
  }

  // Method to find nearby properties
  public async findNearbyProperties(
    coordinates: { lat: number; lng: number },
    maxDistance: number,
    limit: number = 10
  ): Promise<IProperty[]> {
    try {
      // Build geospatial filter
      const locationFilter = {
        coordinate: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [coordinates.lng, coordinates.lat], // Longitude, Latitude
            },
            $maxDistance: maxDistance, // Maximum distance in meters
          },
        },
      };

      // Query repository for nearby properties
      const properties = await this.propertyRepository.findNearbyProperties(
        locationFilter,
        limit
      );

      return properties;
    } catch (error) {
      console.error("Error finding nearby properties:", error);
      throw new Error("Failed to fetch nearby properties");
    }
  }

  // Method to add coordinates to a property
  public async addCoordinatesToProperty(
    propertyId: string,
    coordinates: { lat: number; lng: number }
  ): Promise<ResponsePropertyDTO | null> {
    try {
      const updatedProperty = await this.propertyRepository.addCoordinates(
        propertyId,
        coordinates
      );

      if (!updatedProperty) {
        throw new NotFoundError("Property not found");
      }

      return updatedProperty;
    } catch (error) {
      console.error("Error adding coordinates to property:", error);
      throw error;
    }
  }



  public async getCategories(): Promise<ResponseCategoriesDTO[]> {
    try {
      return await this.propertyRepository.getCategories();
    } catch (error) {
      throw error;
    }
  }
  public async getCognitoSubProperties():Promise<any>{
    try {
      return await this.propertyRepository.getCognitoSubProperties();
    } catch (error) {
      throw error;
    }
  } 

  ///////comment//////
  
  public async addCommentToProperty(
    propertyId: string,
    commentData: { comment: string; cognitoSub: string }
  ): Promise<CommentResponse> {
    try {
      const comment = await this.propertyRepository.addUserComment(propertyId, commentData);
      return comment;
    } catch (error) {
      console.error(`Error adding comment to property with ID ${propertyId}:`, error);
      throw new Error("Failed to add comment");
    }
  }
  
  public async getCommentsByPropertyId(propertyId: string): Promise<CommentResponse[]> {
    try {
      return await this.propertyRepository.getCommentsByPropertyId(propertyId);
    } catch (error) {
      console.error(`Error fetching comments for propertyId: ${propertyId}`, error);
      throw new Error("Could not retrieve comments");
    }
  }  

  public async likeComment(commentId: string, cognitoSub: string): Promise<CommentResponse> {
    try {
      // Fetch the comment to check if the user has already liked it
      const comment = await CommentModel.findById(commentId);
  
      if (!comment) {
        throw new Error("Comment not found");
      }
  
      if (comment.likedBy.includes(cognitoSub)) {
        throw new Error("User has already liked this comment");
      }
  
      // Update the comment to increment likes and add the user to likedBy
      comment.likedBy.push(cognitoSub);
      comment.likes += 1;
  
      const updatedComment = await comment.save();
  
      return {
        _id: updatedComment._id,
        cognitoSub: updatedComment.cognitoSub,
        profile: updatedComment.profile,
        userName: updatedComment.userName,
        comment: updatedComment.comment,
        datetime: updatedComment.datetime,
        likes: updatedComment.likes,
        likedBy: comment.likedBy,
      };
    } catch (error) {
      console.error(`Error liking comment with ID ${commentId}:`, error);
      throw new Error("Failed to like comment");
    }
  }
  
  public async unlikeComment(commentId: string, cognitoSub: string): Promise<CommentResponse> {
    try {
      const comment = await CommentModel.findById(commentId);
  
      if (!comment) {
        throw new Error("Comment not found");
      }
  
      if (!comment.likedBy.includes(cognitoSub)) {
        throw new Error("User has not liked this comment");
      }
  
      // Remove the user from likedBy and decrement likes
      comment.likedBy = comment.likedBy.filter((id) => id !== cognitoSub);
      comment.likes = Math.max(0, comment.likes - 1); // Ensure likes do not go below 0
  
      const updatedComment = await comment.save();
  
      return {
        _id: updatedComment._id,
        cognitoSub: updatedComment.cognitoSub,
        profile: updatedComment.profile,
        userName: updatedComment.userName,
        comment: updatedComment.comment,
        datetime: updatedComment.datetime,
        likes: updatedComment.likes,
        likedBy: updatedComment.likedBy, // Include likedBy
      };
    } catch (error) {
      console.error("Error unliking comment:", error);
      throw new Error("Failed to unlike comment");
    }
  }  

}
