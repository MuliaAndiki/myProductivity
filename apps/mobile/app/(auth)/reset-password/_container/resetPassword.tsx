import ResetPasswordSection from "@/components/section/auth/resetPassword/page-section";
import { useLocalSearchParams } from "expo-router";

import { View } from "react-native";

const ResetPasswordContainer = () => {
  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  return (
    <View className="w-full min-h-screen">
      <ResetPasswordSection />
    </View>
  );
};

export default ResetPasswordContainer;
