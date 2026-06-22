import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../../services/languageService";

export const useLanguages = (page, perPage) =>
  useQuery({
    queryKey: ["languages", page, perPage],
    queryFn: () => getLanguages(page, perPage),
  });