import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { FormForgotPassword } from "@repo/shared";
import { Router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScrollView, View, Text } from "react-native";

interface ForgotPasswordSectionProps {
  ns: {
    router: Router;
    theme: FlatColors;
  };
  state: {
    formForgotPassword: FormForgotPassword;
    setFormForgotPassword: React.Dispatch<
      React.SetStateAction<FormForgotPassword>
    >;
  };
  service: {
    mutate: {
      isPending: boolean;
      onForgotPassword: () => void;
    };
  };
}
const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
  ns,
  state,
  service,
}) => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flex items-center justify-start flex-col gap-20">
        <View className="w-full flex-row  gap-2">
          <ChevronLeft
            color={ns.theme.foreground}
            width={30}
            height={30}
            onPress={() => ns.router.back()}
          />
          <Text className="text-2xl font-bold text-foreground">Back</Text>
        </View>
        <View className="w-full gap-2">
          <Text className="font-bold text-4xl">Verifikasi Akun Anda</Text>
          <InputWrapper
            placeholder="Masukkan Email/Nomor Hp"
            onChangeText={(e) =>
              state.setFormForgotPassword((prev) => ({
                ...prev,
                identifer: e,
              }))
            }
          />
          <ButtonWrapper
            disabled={service.mutate.isPending}
            onPress={() => service.mutate.onForgotPassword()}
          >
            <Text className="font-bold">Verify</Text>
          </ButtonWrapper>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordSection;
