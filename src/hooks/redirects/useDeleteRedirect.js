import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteRedirect } from "../../services/redirectService";

export const useDeleteRedirect = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRedirect,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["redirects"],
      });
    },
  });
};