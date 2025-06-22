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



export const useGetAllUsers = (page: number, limit: number = 10) => {
  return useQuery<PaginatedUsersResponse>({
    queryKey: ["users", page, limit],
    queryFn: async () => await getAllUsers(page, limit),
    // keepPreviousData: true, // Uncomment if using React Query v3 or above and your types support it
  });
}

