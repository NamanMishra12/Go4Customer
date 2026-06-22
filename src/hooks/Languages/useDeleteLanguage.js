import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLanguage } from "../../services/languageService";

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLanguage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["languages"],
      });
    },
  });
};