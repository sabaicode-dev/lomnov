import { Property, CreatePropertyDTO } from "@/src/utils/types/indext";
import { PropertyRepository } from "../database/repositories/property.repository";


export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  public async createProperty(
    propertyData: CreatePropertyDTO,
    files: { thumbnail: Express.Multer.File; images: Express.Multer.File[] }
  ): Promise<Property> {
    try {
      // Delegate the file uploading and data saving to the repository
      return await this.propertyRepository.create(propertyData, files);
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Error creating property');
    }
  }

  public async updateProperty(
    propertyId: string,
    propertyData: Partial<Property>,
    files: { thumbnail?: Express.Multer.File; images?: Express.Multer.File[] }
  ): Promise<Property | null> {
    try {
      const updatedProperty = await this.propertyRepository.update(propertyId, propertyData, files);
      return updatedProperty;
    } catch (error) {
      console.error('Error in PropertyService.updateProperty:', error);
      throw new Error('Failed to update property');
    }
  }

  public async deleteProperty(propertyId: string): Promise<boolean> {
    try {
      // Delegate the delete operation to the repository
      return await this.propertyRepository.delete(propertyId);
    } catch (error) {
      console.error('Error in PropertyService.deleteProperty:', error);
      throw new Error('Failed to delete property');
    }
  }
}
