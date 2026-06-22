import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../../services/glossaryService";

export const useLanguages = () =>
  useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages(),
  });