import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRedirect } from "../../services/redirectService";

export const useCreateRedirect = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRedirect,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["redirects"],
      });
    },
  });
};