import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "../../services/blogService";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};