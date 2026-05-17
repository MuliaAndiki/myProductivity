import { useDebounce } from "@/hooks/debounce/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useAuthRepo } from "@repo/shared";

export function useGetUsernameService(username: string) {
  const module = useAuthRepo();
  const debounced = useDebounce(username, 2000);
  return useQuery<any>(module.query.getUsername(debounced));
}
