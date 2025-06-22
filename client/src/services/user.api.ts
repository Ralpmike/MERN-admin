import type { PaginatedUsersResponse } from "@/hooks/query/useUsers";
// import type { User } from "@/pages/admin-dashboard";
import axiosApi from "@/utils/axios";
import { isAxiosError } from "axios";


export const getAllUsers = async (page: number = 1, limit: number = 10): Promise<PaginatedUsersResponse> => {
  try {
    const response = await axiosApi.get<PaginatedUsersResponse>(`/users?page=${page}&limit=${limit}`);
    console.log(response.data);

    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response?.data.message
    }
    throw error;
  }
}