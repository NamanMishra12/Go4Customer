import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGlossary } from "../../services/glossaryService";

export const useUpdateGlossary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGlossary,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["glossaries"],
      });

      queryClient.invalidateQueries({
        queryKey: ["glossary", variables.id],
      });
    },
  });
};