import { useQuery } from "@tanstack/react-query";
import { getGlossaries } from "../../services/glossaryService";

export const useGlossaries = (page, perPage) =>
  useQuery({
    queryKey: ["glossaries", page, perPage],
    queryFn: () => getGlossaries(page, perPage),
  });