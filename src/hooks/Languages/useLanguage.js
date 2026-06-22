import { useQuery } from "@tanstack/react-query";
import { getLanguageById } from "../../services/languageService";

export const useLanguage = (id) =>
  useQuery({
    queryKey: ["language", id],
    queryFn: () => getLanguageById(id),
    enabled: !!id,
  });