import Api from "../../../api/props.service";
import { queryKey } from "../../../utils";

export function getUsernameQueryOptions(username: string) {
  return {
    queryFn: () => Api.Auth.GetUsername(username),
    queryKey: queryKey.auth.query.username(username),
    enabled: !!username && username.length > 1,
  };
}
