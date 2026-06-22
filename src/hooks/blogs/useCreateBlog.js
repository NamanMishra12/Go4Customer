import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../../services/blogService";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};