import { useLogin, useLogout, useRegister } from "./state/mutation";

export function useAuthRepo() {
  return {
    mutation: {
      login: useLogin,
      register: useRegister,
      logout: useLogout,
    },
    query: {
      //
    },
  };
}
