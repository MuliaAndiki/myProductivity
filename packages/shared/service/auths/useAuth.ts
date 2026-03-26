import {
  useForgotPassword,
  useLogin,
  useLogout,
  useRegister,
  useResend,
  useResetPassword,
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
      reset: useResetPassword,
    },
    query: {
      //
    },
  };
}
