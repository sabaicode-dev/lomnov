import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

export async function fetchUserDetails(cognitosub: string) {
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.GET_PROFILE_USER}/${cognitosub}`);
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch user details");
    }
  }
  