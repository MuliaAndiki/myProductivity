import { useLogin, useRegister } from "./state/mutation";

export function useAuth() {
  return {
    mutation: {
      login: useLogin,
      register: useRegister,
    },
    query: {
      //
    },
  };
}
