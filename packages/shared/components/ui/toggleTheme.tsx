import { View } from "react-native";
import { MoonStar, SunMedium } from "lucide-react-native";

import { Button } from "./button";
import { Icon } from "./icon";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onPress: () => void;
  className?: string;
};

export default function ThemeToggle({
  theme,
  onPress,
  className,
}: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onPress={onPress}
      className={className ?? "w-9 h-9 rounded-md"}
      accessibilityLabel="Toggle theme"
    >
      <View>
        {theme === "dark" ? (
          <Icon as={MoonStar} size={20} className="text-primary" />
        ) : (
          <Icon as={SunMedium} size={20} className="text-primary" />
        )}
      </View>
    </Button>
  );
}
