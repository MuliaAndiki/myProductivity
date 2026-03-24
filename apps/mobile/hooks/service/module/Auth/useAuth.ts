import {
  useForgotPasswordService,
  useLoginService,
  useLogutService,
  useRegisterService,
  useResendService,
  useVerifyService,
} from "./state/mutation";

const useAuth = () => {
  return {
    mutation: {
      login: useLoginService,
      register: useRegisterService,
      logout: useLogutService,
      verifyOtp: useVerifyService,
      resend: useResendService,
      forgot: useForgotPasswordService,
    },
  };
};

export default useAuth;
