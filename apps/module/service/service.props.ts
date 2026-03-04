import { useAuth } from "./auths/useAuth";

const useService = () => ({
  auth: useAuth(),
});

export default useService;
