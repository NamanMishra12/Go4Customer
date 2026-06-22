import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGlossary } from "../../services/glossaryService";

export const useCreateGlossary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGlossary,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["glossaries"],
      });
    },
  });
};