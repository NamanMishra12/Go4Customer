import { useQuery } from "@tanstack/react-query";
import { getGlossaryById } from "../../services/glossaryService";

export const useGlossary = (id) =>
  useQuery({
    queryKey: ["glossary", id],
    queryFn: () => getGlossaryById(id),
    enabled: !!id,
  });