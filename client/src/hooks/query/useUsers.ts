import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/user.api";
import type { User } from "@/pages/admin-dashboard";

// types/user.types.ts or wherever you define your shared types
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

export interface QueryParams {
  page: number;
  limit: number;
  search: string;
  course: string;
}



export const useGetAllUsers = (params: QueryParams) => {
  return useQuery<PaginatedUsersResponse>({
    queryKey: ["users", params],
    queryFn: async () => await getAllUsers(params),
    // keepPreviousData: true, // Uncomment if using React Query v3 or above and your types support it
  });
}

