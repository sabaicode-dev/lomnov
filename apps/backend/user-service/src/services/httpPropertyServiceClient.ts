import axios from "axios";

export class HttpPropertyServiceClient {
  private propertyServiceBaseUrl: string;

  constructor() {
    this.propertyServiceBaseUrl = process.env.PROPERTY_SERVICE_URL || "http://localhost:4003"; // Property service URL
  }
  /**
   * getAllProperty
   */
  public async getAllProperty() {
    
  }
  public async getPropertiesByIds(propertyIds: string[]): Promise<any[]> {
    if(!propertyIds){
        console.log("Undefind Id..")
    }
    try {
      const propertyFetchPromises = propertyIds.map((id) =>
        axios.get(`${this.propertyServiceBaseUrl}/api/v1/properties/get/${id}`)
      );

      const responses = await Promise.all(propertyFetchPromises);

      // Extract and return the property data from each response
      return responses.map((response) => response.data);
    } catch (error) {
      console.error("Error fetching properties from Property Service:", error);
      throw error;
    }
  }
}
