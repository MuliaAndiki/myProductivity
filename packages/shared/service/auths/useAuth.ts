import {
  useForgotPassword,
  useLogin,
  useLogout,
  useRegister,
  useResend,
  useVerifyOtp,
} from "./state/mutation";

export function useAuthRepo() {
  return {
    mutation: {
      login: useLogin,
      register: useRegister,
      logout: useLogout,
      verify: useVerifyOtp,
      resend: useResend,
      forgot: useForgotPassword,
    },
    query: {
      //
    },
  };
}
