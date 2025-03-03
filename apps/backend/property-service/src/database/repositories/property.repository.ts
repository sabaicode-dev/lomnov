

import { PropertyModel } from "@/src/database/models/property.model";
import { CommentResponse, IProperty } from "@/src/utils/types/indext";
import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
import deleteFileFromS3Service from "@/src/services/uploadFileToS3.service";
import { NotFoundError, UnauthorizedError } from "@/src/utils/error/customErrors";
import {
  RequestPropertyDTO,
  RequestUpdatePropertyDTO,
  ResponseCategoriesDTO,
  ResponseCreatePropertyDTO,
  ResponseFindPropertyDTO,
  ResponsePropertyDTO,
  ResponseUpdatePropertyDTO,
} from "@/src/utils/types/indext";
import { Types } from "mongoose";
import { CommentModel } from "../models/comment.model";

export class PropertyRepository {
  /**
   * Create a new property
   */
  public async create(propertyData: RequestPropertyDTO, files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] },): Promise<ResponseCreatePropertyDTO> {
    try {
      if (!files?.thumbnail) {
        console.log("Image files are missing");

        throw new Error("Thumbnail file is missing");
      }

      if (!files?.images || !Array.isArray(files.images) || files.images.length === 0) {
        console.log("Image files are missing");

        throw new Error("Image files are missing");
      }

      // Upload the thumbnail and images to S3
      const thumbnailUrl = await uploadFileToS3Service.uploadFile(files.thumbnail);
      const imageUrls = await Promise.all(
        files.images.map((file) => uploadFileToS3Service.uploadFile(file)),
      );
      console.log("coordiante::: ", propertyData.coordinate);

      // Add the URLs to the property data
      const propertyWithUrls = {
        ...propertyData,
        thumbnail: thumbnailUrl,
        images: imageUrls,
        views: 0, // Initialize views to 0
        // Add the coordinate if provided in propertyData
        coordinate: propertyData.coordinate 
      };

      const newProperty = new PropertyModel(propertyWithUrls);
      await newProperty.save();
      return newProperty.toObject();
    } catch (error) {
      console.log(error);

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
  //update property status


  public async updatePropertyStatus(
    propertyId: string,
    status: boolean
  ): Promise<IProperty | null> {
    try {
      // Locate and update the property in the database based only on _id
      const updatedProperty = await PropertyModel.findByIdAndUpdate(
        { _id: propertyId },
        { $set: { status } },
        { new: true } // Return the updated document
      );
  
      return updatedProperty;
    } catch (error) {
      console.error("Error in updatePropertyStatus:", error);
      throw error;
    }
  }

  //update state admin aprove
  public async updatestatusAdmin(
    propertyId : string,
    statusAdmin : boolean
  ):Promise<IProperty | null> {
    try {
      const updatestatusAdmin = await PropertyModel.findByIdAndUpdate(
        {_id : propertyId},
        {$set:{statusAdmin}},
        {new  : true}
      );
      return updatestatusAdmin;
    } catch (error) {
      console.error("Error in updatestatusAdmin:" , error)
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

  //delete property 
  public async deleteById(propertyId : string): Promise<boolean> {
    try {
      const property = await PropertyModel.findById(propertyId);
      if(!property){
        throw new NotFoundError("No Property");
      }
      //delete image from s3
      if(property.thumbnail){
        await deleteFileFromS3Service.deleteFile(property.thumbnail);
      }

      if(property.images?.length){
        await Promise.all(
          property.images.map((image) => 
            deleteFileFromS3Service.deleteFile(image)
        ),
        )
      }
      // delete property
      await PropertyModel.findByIdAndDelete(propertyId);
      return true;
    } catch (error) {
       throw error;
    }
  }

  /**
   * Find favorite properties for a user
   */
  public async findFavouritePropertyMe(propertyIds: string | undefined): Promise<ResponsePropertyDTO[]> {
    try {

      const propertyIdArray = propertyIds?.split(",");
      return await PropertyModel.find({ _id: { $in: propertyIdArray } }).lean();

    } catch (error) {
      throw error;
    }
  }

  public async findPropertyUserByCognitoSub(cognitoSub: string): Promise<ResponsePropertyDTO[]> {
    try {
      return await PropertyModel.find({ cognitoSub: cognitoSub });
    } catch (error) {
      throw error;
    }
  }

  //Get ptoperty Coordinte
  public async addCoordinates(
    propertyId: string,
    coordinates: { lat: number; lng: number }
  ): Promise<ResponsePropertyDTO | null> {
    try {
      const property = await PropertyModel.findById(propertyId);
      if (!property) {
        throw new NotFoundError("Property not found");
      }

      // Update the property with the new coordinates
      property.coordinate = {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat], // [longitude, latitude]
      };

      await property.save();
      return property.toObject();
    } catch (error) {
      throw error;
    }
  }

  /**
 * Find properties with coordinates within a certain distance
 */
  // Example repository method to handle the geospatial query
  public async findNearbyProperties(
    locationFilter: any,
    limit: number
  ): Promise<IProperty[]> { // Use IProperty[] instead of Property[]
    try {
      const properties = await PropertyModel.find(locationFilter)
        .limit(limit)
        .exec(); // Execute the query

      return properties
    } catch (error) {
      console.error("Error in findNearbyProperties:", error);
      throw new Error("Failed to fetch nearby properties");
    }
  }


  public async getCategories(): Promise<ResponseCategoriesDTO[]> {
    try {
      // Fetch the categories from the PropertyModel
      return await PropertyModel.find({}).select('category').lean();
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
  /**
   * Return all cognito sub and id
   */

  public async getCognitoSubProperties():Promise<any>{
    try {
      return await PropertyModel.find({}).select(["cognitoSub","_id"]).lean();
    } catch (error) {
      throw error;
    }
  }

  ///////comment/////

  public async addUserComment(
    propertyId: string,
    commentData: { comment: string; cognitoSub: string }
  ): Promise<CommentResponse> {
    try {
      const newComment = await CommentModel.create({
        propertyId: new Types.ObjectId(propertyId),
        cognitoSub: commentData.cognitoSub,
        comment: commentData.comment,
        datetime: new Date().toISOString(),
        profile: "/images/default-profile.jpg",
        userName: "Unknown",
        likes: 0,
      });
  
      return {
        _id: newComment._id,
        cognitoSub: newComment.cognitoSub,
        profile: newComment.profile,
        userName: newComment.userName,
        comment: newComment.comment,
        datetime: newComment.datetime,
        likes: newComment.likes,
        likedBy: newComment.likedBy,
      };
    } catch (error) {
      console.error(`Error adding comment to property with ID ${propertyId}:`, error);
      throw new Error("Failed to add comment to property");
    }
  }
  
  public async getCommentsByPropertyId(propertyId: string): Promise<CommentResponse[]> {
    try {
      const comments = await CommentModel.find({ propertyId }).sort({ createdAt: -1 });
      return comments.map((comment) => ({
        _id: comment._id,
        cognitoSub: comment.cognitoSub,
        profile: comment.profile,
        userName: comment.userName,
        comment: comment.comment,
        datetime: comment.datetime,
        likes: comment.likes,
        likedBy: comment.likedBy,
      }));
    } catch (error) {
      console.error(`Error fetching comments for propertyId: ${propertyId}`, error);
      throw new Error("Could not retrieve comments");
    }
  }  

  public async findCommentById(commentId: string): Promise<Comment | null> {
    try {
      return await CommentModel.findById(commentId);
    } catch (error) {
      console.error(`Error fetching comment with ID ${commentId}:`, error);
      throw new Error("Failed to find comment");
    }
  }  
}
