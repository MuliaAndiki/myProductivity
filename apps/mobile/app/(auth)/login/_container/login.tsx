import { View } from "react-native";
import LoginSection from "@/components/section/auth/login/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import useService from "../../../../../module/service/service.props";
import { useState } from "react";
import { FormLogin } from "../../../../../module/@types/auth.types";
import { setRole, setToken } from "@/stores/authSlice/authSlice";

const LoginContainer = () => {
  const namespace = useAppNameSpace();
  const service = useService();

  //mutate
  const loginMutation = service.auth.mutation.login();

  //state
  const [formLogin, setFormLogin] = useState<FormLogin>({
    identifer: "",
    password: "",
  });

  // not testing
  const handlerLogin = async () => {
    const payload: any = {
      password: formLogin.password,
    };

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formLogin.identifer);

    if (isEmail) {
      payload.email = formLogin.identifer;
    } else {
      payload.phone = formLogin.identifer;
    }

    try {
      const res = await loginMutation.mutateAsync(payload);
      const { token, role } = res.data;
      // save token
      namespace.dispatch(setToken(token));
      namespace.dispatch(setRole(role));

      if (role === "admin") {
        namespace.router.push({
          pathname: "/(private)/admin/home/page",
        });
      } else {
        namespace.router.push({
          pathname: "/(private)/user/home/page",
        });
      }
    } catch (error) {
      namespace.alert.toast({
        title: "Failed",
        message: "Login Failed",
        icon: "error",
        onVoid: () => {
          console.log("error from login mutate", error);
        },
      });
    }
  };

  return (
    <View className="w-full min-h-screen ">
      <LoginSection
        namespace={{
          router: namespace.router,
          theme: namespace.colors,
        }}
        state={{
          formLogin: formLogin,
          setFormLogin: setFormLogin,
        }}
        service={{
          mutation: {
            isPending: loginMutation.isPending,
            login: handlerLogin,
          },
        }}
      />
    </View>
  );
};

export default LoginContainer;
