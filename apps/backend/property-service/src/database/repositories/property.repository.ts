// import { PropertyModel } from "@/src/database/models/property.model";
// import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
// import deleteFileFromS3Service from "@/src/services/uploadFileToS3.service";
// import { NotFoundError, UnauthorizedError, } from "@/src/utils/error/customErrors";
// import {
//   RequestPropertyDTO,
//   RequestUpdatePropertyDTO,
//   ResponseCreatePropertyDTO,
//   ResponseFindPropertyDTO,
//   ResponsePropertyDTO,
//   ResponseUpdatePropertyDTO,

// } from "@/src/utils/types/indext";
// // =========================================================================

// export class PropertyRepository {

//   public async create(
//     propertyData: RequestPropertyDTO,
//     files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] },
//   ): Promise<ResponseCreatePropertyDTO> {
//     try {
//       // Validate files
//       if (!files?.thumbnail) {
//         throw new Error("Thumbnail file is missing");
//       }

//       if (!files?.images || !Array.isArray(files.images) || files.images.length === 0) {
//         throw new Error("Image files are missing");
//       }

//       // Upload the thumbnail and images to S3
//       const thumbnailUrl = await uploadFileToS3Service.uploadFile(
//         files.thumbnail,
//       );
//       const imageUrls = await Promise.all(
//         files.images.map((file) => uploadFileToS3Service.uploadFile(file)),
//       );
//       // Add the URLs to the property data
//       const propertyWithUrls = {
//         ...propertyData,
//         thumbnail: thumbnailUrl,
//         images: imageUrls,
//       };
//       // Save the property in the database
//       const newProperty = new PropertyModel(propertyWithUrls);
//       await newProperty.save();
//       return newProperty;
//     } catch (error) {
//       throw error
//     }
//   }

//   public async findProperties(
//     filters: any,
//     skip: number,
//     limit: number,
//   ): Promise<ResponseFindPropertyDTO[]> {
//     return PropertyModel.find(filters).skip(skip).limit(limit).lean();
//   }

//   public async countProperties(filters: any): Promise<number> {
//     return PropertyModel.countDocuments(filters);
//   }

//   public async findPropertiesMe(
//     filters: any,
//     skip: number,
//     limit: number,
//   ): Promise<ResponseFindPropertyDTO[]> {
//     return PropertyModel.find(filters).skip(skip).limit(limit).lean();
//   }

//   public async countPropertiesMe(filters: any): Promise<number> {
//     return PropertyModel.countDocuments(filters);
//   }

//   public async update(
//     propertyId: string,
//     propertyData: Partial<RequestUpdatePropertyDTO>,
//     files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] },
//     cognitoSub: string
//   ): Promise<ResponseUpdatePropertyDTO | null> {
//     try {
//       if (!cognitoSub) {
//         throw new UnauthorizedError("Unauthorized");
//       }
//       const existingProperty = await PropertyModel.findById(propertyId);
//       if (!existingProperty) {
//         throw new NotFoundError("Property not found");
//       }

//       // Check if the property belongs to the user
//       if (existingProperty.cognitoSub !== cognitoSub) {
//         throw new UnauthorizedError("Unauthorized access");
//       }

//       // Handle thumbnail update
//       if (files.thumbnail) {
//         if (existingProperty.thumbnail) {
//           await deleteFileFromS3Service.deleteFile(existingProperty.thumbnail);
//         }
//         propertyData.thumbnail = await uploadFileToS3Service.uploadFile(
//           files.thumbnail,
//         );
//       }

//       // Handle images update
//       if (files.images && files.images.length > 0) {
//         if (existingProperty.images && existingProperty.images.length > 0) {
//           await Promise.all(
//             existingProperty.images.map((image) =>
//               deleteFileFromS3Service.deleteFile(image),
//             ),
//           );
//         }
//         propertyData.images = await Promise.all(
//           files.images.map((file) => uploadFileToS3Service.uploadFile(file)),
//         );
//       }

//       // Update property in the database
//       const updatedProperty = await PropertyModel.findByIdAndUpdate(
//         propertyId,
//         propertyData,
//         { new: true },
//       );
//       return updatedProperty;
//     } catch (error) {
//       throw error
//     }
//   }
//   // Property Repository Method
//   public async findPropertyByID(id: string): Promise<ResponsePropertyDTO> {
//     try {
//       const result = await PropertyModel.findById(id);
//       if (!result) {
//         throw new NotFoundError("Property not found");
//       }
//       return result;
//     } catch (error) {

//       throw error;
//     }
//   }

//   public async delete(propertyId: string, cognitoSub: string | undefined): Promise<boolean> {
//     try {
//       if (!cognitoSub) {
//         throw new UnauthorizedError("Unauthorized");
//       }
//       const existingProperty = await PropertyModel.findById(propertyId);
//       if (!existingProperty) {
//         throw new NotFoundError("Property not found");
//       }

//       // Check if the property belongs to the user
//       if (existingProperty.cognitoSub !== cognitoSub) {
//         throw new UnauthorizedError("Unauthorized access");
//       }
//       const property = await PropertyModel.findById(propertyId);

//       if (!property) {
//         return false; // Property not found
//       }

//       // Delete images and thumbnail from S3
//       if (property.thumbnail) {
//         await deleteFileFromS3Service.deleteFile(property.thumbnail);
//       }

//       if (property.images && property.images.length > 0) {
//         await Promise.all(
//           property.images.map((image) =>
//             deleteFileFromS3Service.deleteFile(image),
//           ),
//         );
//       }

//       // Delete property from the database
//       await PropertyModel.findByIdAndDelete(propertyId);
//       return true;
//     } catch (error) {
//       throw error
//     }
//   }
//   public async findFavouritePropertyMe(propertyId:string|undefined):Promise<ResponsePropertyDTO[]>{
//     try {
//       const splitIdFavMe = propertyId?.split(",");
//       return await PropertyModel.find({_id:{$in:splitIdFavMe}});
//     } catch (error) {
//       throw error; 
//     }
//   }
// }


//===============================


import { PropertyModel } from "@/src/database/models/property.model";
import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
import deleteFileFromS3Service from "@/src/services/uploadFileToS3.service";
import { NotFoundError, UnauthorizedError } from "@/src/utils/error/customErrors";
import {
  RequestPropertyDTO,
  RequestUpdatePropertyDTO,
  ResponseCreatePropertyDTO,
  ResponseFindPropertyDTO,
  ResponsePropertyDTO,
  ResponseUpdatePropertyDTO,
} from "@/src/utils/types/indext";

export class PropertyRepository {
  /**
   * Create a new property
   */
  public async create(
    propertyData: RequestPropertyDTO,
    files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] },
  ): Promise<ResponseCreatePropertyDTO> {
    try {
      if (!files?.thumbnail) {
        throw new Error("Thumbnail file is missing");
      }

      if (!files?.images || !Array.isArray(files.images) || files.images.length === 0) {
        throw new Error("Image files are missing");
      }

      // Upload the thumbnail and images to S3
      const thumbnailUrl = await uploadFileToS3Service.uploadFile(files.thumbnail);
      const imageUrls = await Promise.all(
        files.images.map((file) => uploadFileToS3Service.uploadFile(file)),
      );

      // Add the URLs to the property data
      const propertyWithUrls = {
        ...propertyData,
        thumbnail: thumbnailUrl,
        images: imageUrls,
        views: 0, // Initialize views to 0
      };

      const newProperty = new PropertyModel(propertyWithUrls);
      await newProperty.save();
      return newProperty.toObject();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find properties with optional filters, pagination, and sorting
   */
  public async findProperties(
    filters: any,
    skip: number,
    limit: number,
  ): Promise<ResponseFindPropertyDTO[]> {
    return PropertyModel.find(filters).skip(skip).limit(limit).lean();
  }

  /**
   * Count the number of properties matching filters
   */
  public async countProperties(filters: any): Promise<number> {
    return PropertyModel.countDocuments(filters);
  }

  /**
   * Find properties created by the authenticated user
   */
  public async findPropertiesMe(
    filters: any,
    skip: number,
    limit: number,
  ): Promise<ResponseFindPropertyDTO[]> {
    return PropertyModel.find(filters).skip(skip).limit(limit).lean();
  }

  /**
   * Count properties created by the authenticated user
   */
  public async countPropertiesMe(filters: any): Promise<number> {
    return PropertyModel.countDocuments(filters);
  }

  /**
   * Update a property, including optional thumbnail and images update
   */
  public async update(
    propertyId: string,
    propertyData: Partial<RequestUpdatePropertyDTO>,
    files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] },
    cognitoSub: string,
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      if (!cognitoSub) {
        throw new UnauthorizedError("Unauthorized");
      }

      const existingProperty = await PropertyModel.findById(propertyId);
      if (!existingProperty) {
        throw new NotFoundError("Property not found");
      }

      if (existingProperty.cognitoSub !== cognitoSub) {
        throw new UnauthorizedError("Unauthorized access");
      }

      // Handle thumbnail update
      if (files.thumbnail) {
        if (existingProperty.thumbnail) {
          await deleteFileFromS3Service.deleteFile(existingProperty.thumbnail);
        }
        propertyData.thumbnail = await uploadFileToS3Service.uploadFile(files.thumbnail);
      }

      // Handle images update
      if (files.images && files.images.length > 0) {
        if (existingProperty.images?.length) {
          await Promise.all(
            existingProperty.images.map((image) =>
              deleteFileFromS3Service.deleteFile(image),
            ),
          );
        }
        propertyData.images = await Promise.all(
          files.images.map((file) => uploadFileToS3Service.uploadFile(file)),
        );
      }

      const updatedProperty = await PropertyModel.findByIdAndUpdate(
        propertyId,
        propertyData,
        { new: true },
      );

      return updatedProperty;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a property by its ID
   */
  public async findPropertyByID(id: string): Promise<ResponsePropertyDTO> {
    try {
      const property = await PropertyModel.findById(id);
      if (!property) {
        throw new NotFoundError("Property not found");
      }
      return property.toObject();
    } catch (error) {
      throw error;
    }
  }

  

  public async incrementPropertyViews(propertyId: string): Promise<any> {
    try {
      const updatedProperty = await PropertyModel.findByIdAndUpdate(
        propertyId,
        { $inc: { views: 1 } }, // Increment views by 1
        { new: true } // Return updated property
      );

      if (!updatedProperty) {
        throw new NotFoundError("Property not found");
      }

      return updatedProperty.toObject(); // Return the updated property as an object
    } catch (error) {
      throw error; // Propagate error for service to handle
    }
  }

  // Method to get the total number of views for a property
  public async getPropertyViews(propertyId: string): Promise<number> {
    try {
      const property = await PropertyModel.findById(propertyId).select("views").lean();

      if (!property) {
        throw new NotFoundError("Property not found");
      }

      return property.views || 0; // Return the number of views (or 0 if not found)
    } catch (error) {
      throw error; // Propagate error for service to handle
    }
  }

  /**
   * Delete a property and its associated resources
   */
  public async delete(propertyId: string, cognitoSub: string): Promise<boolean> {
    try {
      if (!cognitoSub) {
        throw new UnauthorizedError("Unauthorized");
      }

      const property = await PropertyModel.findById(propertyId);
      if (!property) {
        throw new NotFoundError("Property not found");
      }

      if (property.cognitoSub !== cognitoSub) {
        throw new UnauthorizedError("Unauthorized access");
      }

      // Delete images and thumbnail from S3
      if (property.thumbnail) {
        await deleteFileFromS3Service.deleteFile(property.thumbnail);
      }

      if (property.images?.length) {
        await Promise.all(
          property.images.map((image) =>
            deleteFileFromS3Service.deleteFile(image),
          ),
        );
      }

      // Delete property from the database
      await PropertyModel.findByIdAndDelete(propertyId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find favorite properties for a user
   */
  public async findFavouritePropertyMe(propertyIds: string): Promise<ResponsePropertyDTO[]> {
    try {
      const propertyIdArray = propertyIds.split(",");
      return await PropertyModel.find({ _id: { $in: propertyIdArray } }).lean();
    } catch (error) {
      throw error;
    }
  }
}
