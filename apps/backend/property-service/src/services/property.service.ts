//==============old code ========================
// import {
//   RequestFPropertiesByLanguageDTO,
//   RequestPropertyDTO,
//   RequestQueryPropertyDTO,
//   RequestUpdatePropertyDTO,
//   ResponseAllPropertyDTO,
//   ResponseCreatePropertyDTO,
//   ResponseFPropertiesByLanguageDTO,
//   ResponseUpdatePropertyDTO,
//   RequestQueryPropertyMeDTO,
//   ResponseAllPropertyMeDTO,
//   ResponsePropertyDTO
// } from "@/src/utils/types/indext";
// import { PropertyRepository } from "../database/repositories/property.repository";
// import { UnauthorizedError } from "../utils/error/customErrors";
// // ===============================================================================

// export class PropertyService {
//   private propertyRepository: PropertyRepository;
//   constructor() {
//     this.propertyRepository = new PropertyRepository();
//   }

//   public async createProperty(
//     propertyData: RequestPropertyDTO,
//     files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] },
//   ): Promise<ResponseCreatePropertyDTO> {
//     try {
//       // Delegate the file uploading and data saving to the repository
//       return await this.propertyRepository.create(propertyData, files);
//     } catch (error) {
//       throw error;
//     }
//   }

//   public async getProperties(
//     queries: RequestQueryPropertyDTO,
//   ): Promise<ResponseAllPropertyDTO> {
//     const { language, page = 1, limit = 12 } = queries;
//     // Pagination parameters
//     const skip = (page - 1) * limit;
//     // Build filters
//     const filters = this.buildFilters(queries);
//     // Fetch data and count total properties
//     const [properties, totalProperty] = await Promise.all([
//       this.propertyRepository.findPropertiesMe(filters, skip, limit),
//       this.propertyRepository.countPropertiesMe(filters),
//     ]);
//     // Apply language-specific filtering if necessary
//     const filteredProperties = language
//       ? this.filterPropertiesByLanguage(properties, language)
//       : properties;
//     // Calculate total pages
//     const totalPages = Math.ceil(totalProperty / limit);

//     return {
//       properties: filteredProperties,
//       pagination: {
//         currentPage: page,
//         totalPages,
//         totalProperty,
//       },
//     };
//   }

//   public async getPropertiesMe(
//     queries : RequestQueryPropertyMeDTO,
//   ): Promise<ResponseAllPropertyMeDTO> {
//     const { cognitoSub, language, page = 1, limit = 12 , fav_me} = queries;
//     if(!cognitoSub){
//       throw new UnauthorizedError()
//     }
//     /*
//       THIS METHOD IS GO QUERY THE FAV PROPERTY OF THE USER
//     */
//     const propertyFavouriteMe = await this.propertyRepository.findFavouritePropertyMe(fav_me);

//     // Pagination parameters
//     const skip = (page - 1) * limit;
//     // Build filters
//     const filters = this.buildFilters(queries);
//    // console.log("helo"+{...filters, cognitoSub})
//     // Fetch data and count total properties
//     const [properties, totalProperty] = await Promise.all([
//       this.propertyRepository.findPropertiesMe({...filters, cognitoSub}, skip, limit),
//       this.propertyRepository.countPropertiesMe({...filters, cognitoSub}),
//     ]);
//     // Apply language-specific filtering if necessary
//     const filteredProperties = language
//       ? this.filterPropertiesByLanguage(properties, language)
//       : properties;
//     // Calculate total pages
//     const totalPages = Math.ceil(totalProperty / limit);

//     return {
//       properties: filteredProperties,
//       favoritesMe: propertyFavouriteMe,
//       pagination: {
//         currentPage: page,
//         totalPages,
//         totalProperty,
//       },
//     };
//   }

//   private buildFilters(queries: RequestQueryPropertyDTO): Promise<ResponseAllPropertyDTO> {
//     try{
//       const {
//         cognitoSub,
//         title,
//         description,
//         address,
//         location,
//         category,
//         transition,
//         price,
//         language,
//         price_gte,
//         price_lte,
//       } = queries;
//       const filters: any = {};

//       if (cognitoSub || title || description || address || location || category || transition) {
//         if (typeof cognitoSub === 'string') {
//           filters["cognitoSub"] = cognitoSub;  // Exact match for cognitoSub
//         }
//         if (typeof title === 'string') {
//           filters["title.content"] = { $regex: title, $options: "i" };
//         }
//         if (typeof description === 'string') {
//           filters["description.content"] = { $regex: description, $options: "i" };
//         }
//         if (typeof address === 'string') {
//           filters["address.content"] = { $regex: address, $options: "i" };
//         }
//         if (typeof location === 'string') {
//           filters["location.content"] = { $regex: location, $options: "i" };
//         }
//         if (typeof category === 'string') {
//           filters["category.content"] = { $regex: category, $options: "i" };
//         }
//         if (typeof transition === 'string') {
//           filters["transition.content"] = { $regex: transition, $options: "i" };
//         }
//       }

//       if (price) {
//         filters.price = price;
//       } else {
//         if (price_gte !== undefined) {
//           filters.price = { ...filters.price, $gte: price_gte };
//         }
//         if (price_lte !== undefined) {
//           filters.price = { ...filters.price, $lte: price_lte };
//         }
//       }
//       if (language) {
//         filters["title.language"] = language;
//         filters["description.language"] = language;
//         filters["address.language"] = language;
//         filters["detail"] = {
//           $elemMatch: {
//             language: language,
//           },
//         };
//       }
//       return filters;
//     }catch(error){
//       throw error
//     }

//   }

//   private filterPropertiesByLanguage(
//     properties: RequestFPropertiesByLanguageDTO[],
//     language: string,
//   ): ResponseFPropertiesByLanguageDTO[] {

//     try{
//       return properties.map((property) => ({
//         ...property,
//         title: property.title?.filter((t: any) => t.language === language) || [],
//         description:
//           property.description?.filter((d: any) => d.language === language) || [],
//         address:
//           property.address?.filter((a: any) => a.language === language) || [],
//         location:
//           property.location?.filter((a: any) => a.language === language) || [],
//         category:
//           property.category?.filter((a: any) => a.language === language) || [],
//         detail:
//           property.detail?.filter(
//             (detail: any) => detail.language === language,
//           ) || [],
//       }));
//     }catch(error){
//       throw error
//     }
//   }

//   public async updateProperty(
//     propertyId: string,
//     propertyData: Partial<RequestUpdatePropertyDTO>,
//     files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] },
//     cognitoSub: string
//   ): Promise<ResponseUpdatePropertyDTO | null> {
//     try {
//       const updatedProperty = await this.propertyRepository.update(
//         propertyId,
//         propertyData,
//         files,
//         cognitoSub
//       );
//       return updatedProperty;
//     } catch (error) {
//       console.error("Error in PropertyService.updateProperty:", error);
//       throw new Error("Failed to update property");
//     }
//   }

//   public async deleteProperty(propertyId: string, cognitoSub: string| undefined ): Promise<boolean> {
//     try {
//       // Delegate the delete operation to the repository
//       return await this.propertyRepository.delete(propertyId, cognitoSub);
//     } catch (error) {
//       console.error("Error in PropertyService.deleteProperty:", error);
//       throw new Error("Failed to delete property");
//     }
//   }

//   public async getPropertyByID(id:string):Promise<ResponsePropertyDTO>{
//     try {
//       return await this.propertyRepository.findPropertyByID(id);
//     } catch (error) {
//       throw error;
//     }
//   }
// }

//================ new code =======================

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
} from "@/src/utils/types/indext";
import { PropertyRepository } from "../database/repositories/property.repository";
import { NotFoundError, UnauthorizedError } from "../utils/error/customErrors";
import { UserServiceClient } from "./userServiceClient";
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
    try {
      return await this.propertyRepository.create(propertyData, files);
    } catch (error) {
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
    const { cognitoSub, language, page = 1, limit = 12, fav_me} = queries;

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

  public async getPropertyByID(id: string): Promise<ResponsePropertyByID> {
    try {
      // Fetch property details
      const property = (await this.propertyRepository.findPropertyByID(
        id
      )) as ResponsePropertyDTO;
      //@ts-ignore
      //console.log({...property._doc});

      if (!property) {
        throw new Error(`Property with ID ${id} not found.`);
      }

      // Fetch property owner details
      const propertyOwner = await this.userServiceClient.propertyOwnerInfo(
        property.cognitoSub as string
      );

      if (!propertyOwner) {
        throw new Error(
          `Property owner with cognitoSub ${property.cognitoSub} not found.`
        );
      }

      // Construct the response object
      const responses: ResponsePropertyByID = {
        //@ts-ignore
        ...property,
        propertyOwner,
      };
      return responses;
    } catch (error) {
      console.error(`Error fetching property by ID ${id}:`, error);
      throw new Error(`Failed to fetch property with ID ${id}`);
    }
  }

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
}
