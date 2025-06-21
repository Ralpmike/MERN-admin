import type { User } from "@/pages/admin-dashboard";
import userAuthServices from "@/services/user.auth.servcies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { editUser, deleteUser, createNewUser } = userAuthServices

export const useEditUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedUser: User) => await editUser(updatedUser, updatedUser._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userId: string) => await deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  })
}

export const useCreateNewUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newUser: User) => await createNewUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  })
}

