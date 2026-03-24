import VerifyOtpSection from "@/components/section/auth/verifyOtp/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { useServiceMobile } from "@/hooks/service/module/useService";
import { FormResend, PickVerify } from "@repo/shared";
import { useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const VerifyOtpContainer = () => {
  const ns = useAppNameSpace();
  const service = useServiceMobile();

  //params
  const { target, email, point } = useLocalSearchParams<{
    target: any;
    email: string;
    point: string;
  }>();

  // mutate
  const verifyOtpMutation = service.auth.mutation.verifyOtp();
  const resendMutation = service.auth.mutation.resend();

  //state
  const [formVerifify, setFormVerify] = useState<PickVerify>({
    email: email,
    otp: "",
  });

  const [formResend, setFormResend] = useState<FormResend>({
    email: email,
  });

  const handleVerify = async () => {
    try {
      await verifyOtpMutation.VerifikasiOtp(formVerifify);

      if (point === "register") {
        ns.router.push({
          pathname: target,
        });
      } else {
        ns.router.push({
          pathname: target,
          params: {
            email: email,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // not test
  const handleResend = async () => {
    await resendMutation.Resend(formResend);
  };

  return (
    <View className="w-full min-h-screen">
      <VerifyOtpSection
        ns={{
          route: ns.router,
        }}
        state={{
          formVerifify: formVerifify,
          setFormVerify: setFormVerify,
        }}
        service={{
          mutate: {
            isPending: verifyOtpMutation.isPending || resendMutation.isPending,
            verifyOtp: handleVerify,
            resend: handleResend,
          },
        }}
      />
    </View>
  );
};

export default VerifyOtpContainer;
