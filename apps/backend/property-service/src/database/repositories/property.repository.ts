import { PropertyModel } from "@/src/database/models/property.model";
import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
import deleteFileFromS3Service from "@/src/services/uploadFileToS3.service";
import {
  RequestPropertyDTO,
  RequestUpdatePropertyDTO,
  ResponseCreatePropertyDTO,
  ResponseFindPropertyDTO,
  ResponseUpdatePropertyDTO,

} from "@/src/utils/types/indext";
// =========================================================================

export class PropertyRepository {

  public async create(
    propertyData: RequestPropertyDTO,
    files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] },
  ): Promise<ResponseCreatePropertyDTO> {
    try {
      // Upload the thumbnail and images to S3
      const thumbnailUrl = await uploadFileToS3Service.uploadFile(
        files.thumbnail,
      );
      const imageUrls = await Promise.all(
        files.images.map((file) => uploadFileToS3Service.uploadFile(file)),
      );
      // Add the URLs to the property data
      const propertyWithUrls = {
        ...propertyData,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      };
      // Save the property in the database
      const newProperty = new PropertyModel(propertyWithUrls);
      await newProperty.save();
      return newProperty;
    } catch (error) {
     throw error
    }
  }

  public async findProperties(
    filters: any,
    skip: number,
    limit: number,
  ): Promise<ResponseFindPropertyDTO[]> {
    return PropertyModel.find(filters).skip(skip).limit(limit).lean();
  }

  public async countProperties(filters: any): Promise<number> {
    return PropertyModel.countDocuments(filters);
  }

  public async findPropertiesMe(
    filters: any,
    skip: number,
    limit: number,
  ): Promise<ResponseFindPropertyDTO[]> {
    return PropertyModel.find(filters).skip(skip).limit(limit).lean();
  }

  public async countPropertiesMe(filters: any): Promise<number> {
    return PropertyModel.countDocuments(filters);
  }

  public async update(
    propertyId: string,
    propertyData: Partial<RequestUpdatePropertyDTO>,
    files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] },
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      const existingProperty = await PropertyModel.findById(propertyId);

      if (!existingProperty) {
        throw new Error("Property not found");
      }

      // Handle thumbnail update
      if (files.thumbnail) {
        if (existingProperty.thumbnail) {
          await deleteFileFromS3Service.deleteFile(existingProperty.thumbnail);
        }
        propertyData.thumbnail = await uploadFileToS3Service.uploadFile(
          files.thumbnail,
        );
      }

      // Handle images update
      if (files.images && files.images.length > 0) {
        if (existingProperty.images && existingProperty.images.length > 0) {
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

      // Update property in the database
      const updatedProperty = await PropertyModel.findByIdAndUpdate(
        propertyId,
        propertyData,
        { new: true },
      );
      return updatedProperty;
    } catch (error) {
      console.error("Error updating property:", error);
      throw new Error("Error updating property");
    }
  }

  public async delete(propertyId: string): Promise<boolean> {
    try {
      const property = await PropertyModel.findById(propertyId);

      if (!property) {
        return false; // Property not found
      }

      // Delete images and thumbnail from S3
      if (property.thumbnail) {
        await deleteFileFromS3Service.deleteFile(property.thumbnail);
      }

      if (property.images && property.images.length > 0) {
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
      console.error("Error in PropertyRepository.delete:", error);
      throw new Error("Failed to delete property");
    }
  }
  // Additional database operations can be added here (e.g., find, update, delete).

  

}
