import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLanguage } from "../../services/languageService";

export const useCreateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLanguage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["languages"],
      });
    },
  });
};