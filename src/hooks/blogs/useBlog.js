import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../../services/blogService";

export const useBlog = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
};