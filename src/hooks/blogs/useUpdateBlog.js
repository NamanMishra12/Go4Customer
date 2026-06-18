import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog } from "../../services/blogService";

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlog,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blog", variables.id],
      });
    },
  });
};