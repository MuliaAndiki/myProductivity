import { PickResetPassword } from "@repo/shared";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Keyboard, View } from "react-native";

import ResetPasswordSection from "@/components/section/auth/resetPassword/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useServiceMobile } from "@/hooks/service/module/useService";

const ResetPasswordContainer = () => {
  const service = useServiceMobile();
  const ns = useAppNameSpace();
  const params = useLocalSearchParams<{
    email?: string;
    target?: any;
    phone?: string;
  }>();

  // not use
  const isEmail = params.email!.includes("@");
  const target = params.target ?? "";

  const resetPasswordMutate = service.auth.mutation.reset();

  //state
  const [formResetPassword, setFormResetPassword] = useState<PickResetPassword>(
    {
      email: params.email ?? "",
      password: "",
      phone: params.phone ?? "",
      username: "",
    },
  );

  console.log(formResetPassword, "payload");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false);

  //handler
  const handlerResetPassword = async () => {
    await resetPasswordMutate.ResetPassword(formResetPassword, params.target);
  };
  //async
  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener("keyboardWillHide", () =>
      setIsKeyboardVisible(false),
    );
    return () => {
      (showListener.remove(), hideListener.remove());
    };
  }, []);

  const lottieSize = useMemo(
    () => (isKeyboardVisible ? 150 : 220),
    [isKeyboardVisible],
  );

  return (
    <View className="w-full min-h-screen">
      <ResetPasswordSection
        ns={{
          theme: ns.colors,
        }}
        state={{
          isKeyboardVisible: isKeyboardVisible,
          setIsKeyboardVisible: setIsKeyboardVisible,
          formResetPassword: formResetPassword,
          setFormResetPassword: setFormResetPassword,
          newPassword: newPassword,
          setNewPassword: setNewPassword,
          setVisiblePassword: setVisiblePassword,
          visiblePassword: visiblePassword,
          setVisibleConfirmPassword: setVisibleConfirmPassword,
          visibleConfirmPassword: visibleConfirmPassword,
          lottieSize: lottieSize,
        }}
        service={{
          mutate: {
            onReset: handlerResetPassword,
            isPending: resetPasswordMutate.isPending,
          },
        }}
      />
    </View>
  );
};

export default ResetPasswordContainer;
