import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/user.api";

// types/user.types.ts or wherever you define your shared types

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  state: string;
  nationality: string;
  phoneNumber: string;
  course: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedUsersResponse {
  users: User[];
  metaData: MetaData;
  message: string;
}



export const useGetAllUsers = (page: number, limit: number = 10) => {
  return useQuery<PaginatedUsersResponse>({
    queryKey: ["users", page, limit],
    queryFn: async () => await getAllUsers(page, limit),
    // keepPreviousData: true, // Uncomment if using React Query v3 or above and your types support it
  });
}

