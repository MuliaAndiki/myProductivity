import OTPInput from "@/components/ui/inputOtp";
import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { PickVerify } from "@repo/shared";
import { Router } from "expo-router";
import { View, Text } from "react-native";

interface VerifyOtpSectionProps {
  ns: {
    route: Router;
  };
  state: {
    formVerifify: PickVerify;
    setFormVerify: React.Dispatch<React.SetStateAction<PickVerify>>;
  };
  service: {
    mutate: {
      verifyOtp: () => void;
      isPending: boolean;
      resend: () => void;
    };
  };
}
const VerifyOtpSection: React.FC<VerifyOtpSectionProps> = ({
  ns,
  state,
  service,
}) => {
  return (
    <View className="flex-1 px-6 py-12 items-center justify-center">
      <View className="items-center mb-10">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Verifikasi Kode
        </Text>
        <Text className="text-sm text-muted-foreground text-center px-4">
          Silakan masukkan 6 digit kode verifikasi yang telah dikirim ke
          perangkat Anda.
        </Text>
      </View>

      <View className="mb-8 gap-6">
        <OTPInput
          length={6}
          onCodeChange={(e) =>
            state.setFormVerify((prev) => ({
              ...prev,
              otp: e,
            }))
          }
        />
        <ButtonWrapper
          disabled={
            service.mutate.isPending || state.formVerifify.otp?.length !== 6
          }
          onPress={() => service.mutate.verifyOtp()}
        >
          <Text className="font-bold">Verify</Text>
        </ButtonWrapper>
      </View>

      <View className="mt-4">
        <Text
          className="text-sm text-muted-foreground"
          onPress={() => service.mutate.resend()}
          disabled={service.mutate.isPending}
        >
          Tidak menerima kode?{" "}
          <Text className="text-primary font-semibold">Kirim Ulang</Text>
        </Text>
      </View>
    </View>
  );
};
export default VerifyOtpSection;
