import {
  registerMutationOptions,
  addUsernameMutationOptions,
  forgotPasswordMutationOptions,
  loginMutationOptions,
  logoutMutationOptions,
  resendMutationOptions,
  resetPasswordMutationOptions,
  verifyOtpMutationOptions,
} from "./state/mutation";
import { getUsernameQueryOptions } from "./state/query";
export function useAuthRepo() {
  return {
    mutation: {
      login: loginMutationOptions,
      register: registerMutationOptions,
      logout: logoutMutationOptions,
      verify: verifyOtpMutationOptions,
      resend: resendMutationOptions,
      forgot: forgotPasswordMutationOptions,
      reset: resetPasswordMutationOptions,
      addUsername: addUsernameMutationOptions,
    },
    query: {
      getUsername: getUsernameQueryOptions,
    },
  };
}
