import { PropertyModel } from "@/src/database/models/property.model";
import uploadFileToS3Service from "@/src/services/uploadFileToS3.service";
import deleteFileFromS3Service from "@/src/services/uploadFileToS3.service";
import { NotFoundError, UnauthorizedError, } from "@/src/utils/error/customErrors";
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
    cognitoSub: string
  ): Promise<ResponseUpdatePropertyDTO | null> {
    try {
      if (!cognitoSub) {
        throw new UnauthorizedError("Unauthorized");
      }
      const existingProperty = await PropertyModel.findById(propertyId);
      if (!existingProperty) {
        throw new NotFoundError("Property not found");
      }

      // Check if the property belongs to the user
      if (existingProperty.cognitoSub !== cognitoSub) {
        throw new UnauthorizedError("Unauthorized access");
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
      throw error
    }
  }

  public async delete(propertyId: string, cognitoSub: string | undefined): Promise<boolean> {
    try {
      if (!cognitoSub) {
        throw new UnauthorizedError("Unauthorized");
      }
      const existingProperty = await PropertyModel.findById(propertyId);
      if (!existingProperty) {
        throw new NotFoundError("Property not found");
      }

      // Check if the property belongs to the user
      if (existingProperty.cognitoSub !== cognitoSub) {
        throw new UnauthorizedError("Unauthorized access");
      }
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
      throw error
    }
  }

}
