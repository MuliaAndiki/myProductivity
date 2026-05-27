import { Ionicons } from "@expo/vector-icons";
import { FormForgotPassword, kebabCaseToWords } from "@repo/shared";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { FlatColors } from "@/core/providers/theme.provinder";
import { SelectedAuthIncludeEmail } from "@/types/form";

interface ForgotPasswordSectionProps {
  ns: {
    theme: FlatColors;
  };
  state: {
    formForgotPassword: FormForgotPassword;
    setFormForgotPassword: React.Dispatch<
      React.SetStateAction<FormForgotPassword>
    >;
    isKeyboardVisible: boolean;
    setIsKeyBoardVisible: React.Dispatch<React.SetStateAction<boolean>>;
    lottieSize: any;
  };

  service: {
    mutate: {
      isPending: boolean;
      onForgotPassword: () => void;
    };
  };
  isActive: {
    selectForgotPassword: SelectedAuthIncludeEmail;
    setSelectForgotPassword: React.Dispatch<
      React.SetStateAction<SelectedAuthIncludeEmail>
    >;
  };
}
const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
  ns,
  state,
  service,
  isActive,
}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: state.isKeyboardVisible ? "flex-start" : "center",
        alignItems: "center",
      }}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={24}
      style={{ flex: 1, backgroundColor: ns.theme.background }}
    >
      <View
        className="items-center w-full  px-6"
        style={{ paddingVertical: state.isKeyboardVisible ? 20 : 48 }}
      >
        <View
          className="items-center w-full"
          style={{ marginBottom: state.isKeyboardVisible ? 20 : 40 }}
        >
          <View className="w-full gap-2">
            <View className="flex items-center justify-center">
              <LottieView
                autoPlay
                loop
                style={{ width: state.lottieSize, height: state.lottieSize }}
                source={require("@/assets/lottie/Search.json")}
              />
            </View>
            <Text className="font-extrabold text-4xl text-primary">
              Verifikasi Your Account
            </Text>

            <Text className="font-semibold text-lg">
              Enter your registered email address, and we'll send you a recovery
              link
            </Text>

            <View className="w-full flex flex-row justify-between items-center gap-2">
              <ButtonWrapper
                className={`flex-1 ${isActive.selectForgotPassword === "email" ? "bg-primary" : "bg-background"}`}
                variant={"auth"}
                leftIcon={
                  <Ionicons
                    name="mail"
                    size={18}
                    color={`${isActive.selectForgotPassword === "email" ? ns.theme.secondary : ns.theme.foreground}`}
                  />
                }
                onPress={() => isActive.setSelectForgotPassword("email")}
              >
                <Text
                  className={`font-semibold ${isActive.selectForgotPassword === "email" ? "text-background" : "text-foreground"}`}
                >
                  Email
                </Text>
              </ButtonWrapper>
              <ButtonWrapper
                className={`flex-1 ${isActive.selectForgotPassword === "phone" ? "bg-primary" : "bg-background"}`}
                variant={"auth"}
                leftIcon={
                  <Ionicons
                    name="phone-portrait"
                    size={16}
                    color={`${isActive.selectForgotPassword === "phone" ? ns.theme.secondary : ns.theme.foreground}`}
                  />
                }
                onPress={() => isActive.setSelectForgotPassword("phone")}
              >
                <Text
                  className={`font-semibold ${isActive.selectForgotPassword === "phone" ? "text-background" : "text-foreground"}`}
                >
                  Phone
                </Text>
              </ButtonWrapper>
            </View>
            <View className="w-full">
              <Text variant={"h3"} className="text-primary">
                {kebabCaseToWords(isActive.selectForgotPassword)}
              </Text>
              <InputWrapper
                placeholder="Enter "
                onChangeText={(e) =>
                  state.setFormForgotPassword((prev) => ({
                    ...prev,
                    identifer: e,
                  }))
                }
              />
            </View>

            <ButtonWrapper
              disabled={service.mutate.isPending}
              onPress={() => service.mutate.onForgotPassword()}
            >
              <Text variant={"h4"} className="font-semibold text-background">
                Contine
              </Text>
            </ButtonWrapper>

            <Link href={"/login/_container/login"} className="">
              <Text className="font-semibold text-center text-primary">
                Login Again
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordSection;
