import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../../services/blogService";

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
};