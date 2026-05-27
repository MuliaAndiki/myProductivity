import {
  PickAddUsername,
  PickForgotPassword,
  PickLogin,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickVerify,
} from "@/types/auth.types";
import Api from "@/api/props.service";

export function registerMutationOptions() {
  return {
    mutationFn: (payload: PickRegister) => Api.Auth.Register(payload),
  };
}

export function loginMutationOptions() {
  return {
    mutationFn: (payload: PickLogin) => Api.Auth.Login(payload),
  };
}

export function logoutMutationOptions() {
  return {
    mutationFn: () => Api.Auth.Logout(),
  };
}

export function verifyOtpMutationOptions() {
  return {
    mutationFn: (payload: PickVerify) => Api.Auth.VerifyOtp(payload),
  };
}

export function resendMutationOptions() {
  return {
    mutationFn: (payload: PickSendOtp) => Api.Auth.Resend(payload),
  };
}

export function forgotPasswordMutationOptions() {
  return {
    mutationFn: (payload: PickForgotPassword) =>
      Api.Auth.ForgotPassword(payload),
  };
}

export function resetPasswordMutationOptions() {
  return {
    mutationFn: (payload: PickResetPassword) => Api.Auth.ResetPassword(payload),
  };
}

export function addUsernameMutationOptions() {
  return {
    mutationFn: (payload: PickAddUsername) => Api.Auth.AddUsername(payload),
  };
}
