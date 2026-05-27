import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  type ViewProps,
  type TextProps,
  type TouchableOpacityProps,
} from "react-native";
import { useRouter, usePathname } from "expo-router";

type CustomTabBarProps = {
  className?: string;
};

const ViewWithClassName = View as React.ComponentType<
  ViewProps & { className?: string }
>;
const TextWithClassName = Text as React.ComponentType<
  TextProps & { className?: string }
>;
const TouchableOpacityWithClassName = TouchableOpacity as React.ComponentType<
  TouchableOpacityProps & { className?: string }
>;

export default function CustomTabBar({ className }: CustomTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // data mapinghere
  return (
    <ViewWithClassName
      className={
        className ??
        "flex-row justify-around items-center bg-primary py-4 border-primary rounded-full  "
      }
    >
      <TouchableOpacityWithClassName
        onPress={() => router.push("/(private)/user/home/page")}
        className="items-center  p-2"
      >
        <TextWithClassName className={"text-background font-bold"}>
          Home
        </TextWithClassName>
      </TouchableOpacityWithClassName>
    </ViewWithClassName>
  );
}
