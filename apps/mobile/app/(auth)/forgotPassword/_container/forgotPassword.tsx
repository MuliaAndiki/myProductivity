import ForgotPasswordSection from "@/components/section/auth/forgotPassword/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { FormForgotPassword } from "@repo/shared";
import { useState } from "react";
import { View } from "react-native";

const ForgotPasswordContainer = () => {
  const ns = useAppNameSpace();
  const service = useServiceMobile();

  //mutate
  const forgotPasswordMutate = service.auth.mutation.forgot();
  //state
  const [formForgotPassword, setFormForgotPassword] =
    useState<FormForgotPassword>({
      identifer: "",
    });

  const handleForgotPassword = async () => {
    await forgotPasswordMutate.ForgotPassword(formForgotPassword);
  };
  return (
    <View className="w-full min-h-screen">
      <ForgotPasswordSection
        ns={{
          router: ns.router,
          theme: ns.colors,
        }}
        state={{
          formForgotPassword: formForgotPassword,
          setFormForgotPassword: setFormForgotPassword,
        }}
        service={{
          mutate: {
            isPending: forgotPasswordMutate.isPending,
            onForgotPassword: handleForgotPassword,
          },
        }}
      />
    </View>
  );
};

export default ForgotPasswordContainer;
