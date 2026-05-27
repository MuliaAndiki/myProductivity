import { ScrollView, Text,View } from "react-native";

import { ButtonWrapper } from "@/components/wrapper/ButtonWrapper";

const ProfileSection: React.FC = () => {
  return (
    <ScrollView className="relative">
      <View className="w-full min-h-screen flex items-center justify-start">
        <Text className="text-primary">Initial Profile User Section</Text>
        {/*  */}
      </View>
    </ScrollView>
  );
};

export default ProfileSection;
