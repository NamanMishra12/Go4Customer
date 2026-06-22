import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/blogService";

export const useBlogs = (page, perPage) => {
  return useQuery({
    queryKey: ["blogs", page, perPage],
    queryFn: () => getBlogs(page, perPage),
    keepPreviousData: true,
  });
};