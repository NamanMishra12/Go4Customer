import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/blogService";

export const useCategories = () => {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });
};