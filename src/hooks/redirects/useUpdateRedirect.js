import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRedirect } from "../../services/redirectService";

export const useUpdateRedirect = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRedirect,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["redirects"],
      });
    },
  });
};