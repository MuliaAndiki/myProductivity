import {
  detect2Identifier,
  FormForgotPassword,
  FormLogin,
  FormRegister,
  PickAddUsername,
  PickForgotPassword,
  PickRegister,
  PickResetPassword,
  PickSendOtp,
  PickUpdateProfile,
  PickVerify,
 useAuthRepo } from "@repo/shared";
import { useMutation } from "@tanstack/react-query";

import { useAppNameSpace } from "@/hooks/costum/namespace";
import { logout,setRole, setToken  } from "@/stores/authSlice/authSlice";

export function useLoginService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const loginMutation = useMutation<any, Error, FormLogin>(
    module.mutation.login(),
  );

  const login = async (formLogin: FormLogin) => {
    const payload: FormLogin = {
      password: formLogin.password,
      phone: formLogin.phone,
      username: formLogin.username,
    };

    loginMutation.mutateAsync(payload, {
      onSuccess: (res) => {
        const { token, role } = res.data;

        ns.dispatch(setToken(token));
        ns.dispatch(setRole(role));

        ns.alert.toast({
          title: "succesfuly",
          message: "Login success",
          icon: "success",
        });

        if (role === "admin") {
          ns.router.push({
            pathname: "/(private)/admin/home/page",
          });
        } else {
          ns.router.push({
            pathname: "/(private)/user/home/page",
          });
        }
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          message: "Login Failed",
          icon: "error",
          onVoid: () => {
            console.log(err);
          },
        });
      },
    });
  };
  return {
    login,
    isPending: loginMutation.isPending,
  };
}

export function useRegisterService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const registerMutation = useMutation<any, Error, PickRegister>(
    module.mutation.register(),
  );

  const register = async (formRegister: FormRegister) => {
    if (
      !formRegister.email ||
      !formRegister.first_name ||
      !formRegister.last_name ||
      !formRegister.password ||
      !formRegister.phone
    ) {
      return null;
    }

    const payload: FormRegister = {
      password: formRegister.password,
      first_name: formRegister.first_name,
      last_name: formRegister.last_name,
      role: formRegister.role,
      email: formRegister.email,
      phone: formRegister.phone,
    };

    registerMutation.mutateAsync(payload, {
      onSuccess: (res) => {
        const email = res.data.email as string;
        const phone = res.data.phone as string;
        ns.router.push({
          pathname: "/(auth)/verifikasi/page",
          params: {
            email: email,
            phone: phone,
            point: "register",
            target: "/(auth)/addUsername/page",
          },
        });

        ns.alert.toast({
          title: "success",
          message: "succesfuly register to fluxo",
          icon: "success",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          message: "Register Failed",
          icon: "error",
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  };
  return {
    register,
    isPending: registerMutation.isPending,
  };
}

export function useLogutService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const logoutMutate = useMutation<any, Error, void>(module.mutation.logout());

  const Logout = () => {
    logoutMutate.mutateAsync(undefined, {
      onSuccess: () => {
        ns.dispatch(logout());
        ns.alert.toast({
          title: "successfully",
          message: "you succesfuly logout",
          icon: "success",
        });
        ns.router.push({
          pathname: "/(auth)/login/page",
        });
      },
      onError: (err) => {
        ns.dispatch(logout());
        ns.alert.toast({
          title: "Failed",
          message: "Logout Failed",
          icon: "error",
          onVoid: () => {
            console.error(err);
          },
        });
        ns.router.push({
          pathname: "/(auth)/login/page",
        });
      },
    });
  };
  return {
    Logout,
    isPending: logoutMutate.isPending,
  };
}

export function useVerifyService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const Verifikasi = useMutation<any, Error, PickVerify>(
    module.mutation.verify(),
  );
  const VerifikasiOtp = async (payload: PickVerify) => {
    if (!payload.email || !payload.otp) {
      return false;
    }

    Verifikasi.mutateAsync(payload, {
      onSuccess: (res) => {
        const email = res.data.email as string;
        ns.alert.toast({
          title: "successfully",
          message: `you succesfuly verify email:${email}`,
          icon: "success",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          message: "Your Failed Verify",
          icon: "error",
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  };
  return {
    VerifikasiOtp,
    isPending: Verifikasi.isPending,
  };
}

export function useResendService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const resend = useMutation<any, Error, PickSendOtp>(module.mutation.resend());
  const Resend = async (formResend: PickSendOtp) => {
    if (!formResend.email) {
      return false;
    }

    resend.mutateAsync(formResend, {
      onSuccess: (res) => {
        const email = res.data.email as string;

        ns.alert.toast({
          title: "successfully",
          icon: "success",
          message: `Please check your email again ${email}`,
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          icon: "error",

          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  };
  return { Resend, isPending: resend.isPending };
}

export function useForgotPasswordService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const forgot = useMutation<any, Error, PickForgotPassword>(
    module.mutation.forgot(),
  );

  const ForgotPassword = async (formForgotPassword: FormForgotPassword) => {
    //validation
    if (!formForgotPassword.identifer) {
      return false;
    }

    const payload: any = { ...detect2Identifier(formForgotPassword.identifer) };

    // not test
    console.log(payload, "ini payload");
    forgot.mutate(payload, {
      onSuccess: (res) => {
        const email = res.data.email as string;
        const phone = res.data.phone as string;
        ns.router.push({
          pathname: "/(auth)/verifikasi/page",
          params: {
            target: "/(auth)/resetPassword/page",
            email: email,
            phone: phone,
            point: "forgotPassword",
          },
        });

        ns.alert.toast({
          title: "successfully",
          icon: "success",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          icon: "error",
          message: "failed detect email",
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  };
  return { ForgotPassword, isPending: forgot.isPending };
}

export function useResetPasswordService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const reset = useMutation<any, Error, PickResetPassword>(
    module.mutation.reset(),
  );

  const ResetPassword = async (
    formResetPassword: PickResetPassword,
    target: any,
  ) => {
    if (!formResetPassword.password) {
      // no alert
      return false;
    }
    reset.mutateAsync(formResetPassword, {
      onSuccess: () => {
        ns.router.push({
          pathname: target,
        });
        ns.alert.toast({
          title: "succesfuly",
          icon: "success",
          message: "successfully update password",
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          icon: "error",
          message: "failed reset your password",
          onVoid: () => {
            console.error(err);
          },
        });
      },
    });
  };
  return { ResetPassword, isPending: reset.isPending };
}

export function useAddUsernameService() {
  const ns = useAppNameSpace();
  const module = useAuthRepo();
  const addUsername = useMutation<any, Error, PickAddUsername>(
    module.mutation.addUsername(),
  );

  const AddUsername = async (formAddUsername: PickAddUsername) => {
    if (!formAddUsername) {
      // no alert
      return false;
    }

    addUsername.mutateAsync(formAddUsername, {
      onSuccess: () => {
        ns.router.push({
          pathname: "/login/page",
        });
        ns.alert.toast({
          title: "Succesfuly",
          icon: "success",
          message: "succesfuly add username",
          onVoid: () => {},
        });
      },
      onError: (err) => {
        ns.alert.toast({
          title: "Failed",
          icon: "error",
          message: "failed add your username",
          onVoid: () => {
            console.log(err);
          },
        });
      },
    });
  };
  return { AddUsername, isPending: addUsername.isPending };
}

// not inisiet
export function useUpdateProfileService() {
  const module = useAuthRepo();
  const updateProfile = useMutation<any, Error, PickUpdateProfile>(
    module.mutation.updateProfile(),
  );
  //
}
