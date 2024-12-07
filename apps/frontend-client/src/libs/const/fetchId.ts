import axiosInstance from "../axios";
import { API_ENDPOINTS } from "./api-endpoints";

async function fetchDynamicId(): Promise<string[]> {
    try {
        const respIds = await axiosInstance.get(API_ENDPOINTS.PROPERTIES);

        // Filter out items that have an _id and return only the ids as an array
        return respIds.data.properties
            .filter((item: any) => item?._id)
            .map((item: any) => item._id); // Map to return only the _id
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default fetchDynamicId;
