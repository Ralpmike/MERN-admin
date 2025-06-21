import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/services/user.api";


export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}

