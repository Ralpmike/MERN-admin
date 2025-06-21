import type { User } from "@/pages/admin-dashboard";
import axiosApi from "@/utils/axios";
import { isAxiosError } from "axios";


export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await axiosApi.get<User[]>("/users");

    return users.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response?.data.message
    }
    throw error;
  }
}