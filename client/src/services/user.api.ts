import type { PaginatedUsersResponse, QueryParams } from "@/hooks/query/useUsers";
// import type { User } from "@/pages/admin-dashboard";
import axiosApi from "@/utils/axios";
import { isAxiosError } from "axios";


export const getAllUsers = async (params: QueryParams): Promise<PaginatedUsersResponse> => {
  try {
    const response = await axiosApi.get<PaginatedUsersResponse>(`/users`, { params });
    console.log(response.data);

    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response?.data.message
    }
    throw error;
  }
}