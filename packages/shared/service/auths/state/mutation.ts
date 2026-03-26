import { useMutation } from "@tanstack/react-query";
import { TResponse } from "@/utils/trespone";
import {
  PickForgotPassword,
  PickLogin,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickVerify,
} from "@/@types/auth.types";
import Api from "@/api/props.service";

export function useRegister() {
  return useMutation<TResponse<any>, Error, PickRegister>({
    mutationFn: (payload) => Api.Auth.Register(payload),
  });
}

export function useLogin() {
  return useMutation<TResponse<any>, Error, PickLogin>({
    mutationFn: (payload) => Api.Auth.Login(payload),
  });
}

export function useLogout() {
  return useMutation<TResponse<any>, Error, any>({
    mutationFn: () => Api.Auth.Logout(),
  });
}

export function useVerifyOtp() {
  return useMutation<TResponse<any>, Error, PickVerify>({
    mutationFn: (payload) => Api.Auth.VerifyOtp(payload),
  });
}

export function useResend() {
  return useMutation<TResponse<any>, Error, PickSendOtp>({
    mutationFn: (payload) => Api.Auth.Resend(payload),
  });
}

export function useForgotPassword() {
  return useMutation<TResponse<any>, Error, PickForgotPassword>({
    mutationFn: (payload) => Api.Auth.ForgotPassword(payload),
  });
}

export function useResetPassword() {
  return useMutation<TResponse<any>, Error, PickResetPassword>({
    mutationFn: (payload) => Api.Auth.ResetPassword(payload),
  });
}
