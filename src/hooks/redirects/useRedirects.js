import { useQuery } from "@tanstack/react-query";
import { getRedirects } from "../../services/redirectService";

export const useRedirects = (
  page = 1,
  perPage = 10
) => {
  return useQuery({
    queryKey: ["redirects", page, perPage],
    queryFn: () =>
      getRedirects(page, perPage),
  });
};