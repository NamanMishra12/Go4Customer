import { useQuery } from "@tanstack/react-query";
import { getGlossaryCategories } from "../../services/glossaryService";

export const useGlossaryCategories = () =>
  useQuery({
    queryKey: ["glossary-categories"],
    queryFn: getGlossaryCategories,
  });