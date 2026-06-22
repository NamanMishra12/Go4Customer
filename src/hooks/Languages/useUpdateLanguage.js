import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLanguage } from "../../services/languageService";

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLanguage,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["languages"],
      });

      queryClient.invalidateQueries({
        queryKey: ["language", variables.id],
      });
    },
  });
};