import { CustomTabBar } from "@repo/shared";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function PrivateLayout() {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 px-6 py-12 bg-background">
        <Slot />
      </View>
      <CustomTabBar />
    </View>
  );
}
