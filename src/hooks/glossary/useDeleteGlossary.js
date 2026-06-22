import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGlossary } from "../../services/glossaryService";

export const useDeleteGlossary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGlossary,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["glossaries"],
      });
    },
  });
};