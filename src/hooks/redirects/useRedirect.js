import { useQuery } from "@tanstack/react-query";
import { getRedirectById } from "../../services/redirectService";

export const useRedirect = (id) => {
  return useQuery({
    queryKey: ["redirect", id],
    queryFn: () => getRedirectById(id),
    enabled: !!id,
  });
};