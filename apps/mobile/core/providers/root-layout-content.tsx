import { ThemeToggle } from "@repo/shared";
import { Stack } from "expo-router";
import { useMemo } from "react";

import { useTheme } from "@/core/providers/theme.provinder";

export function RootLayoutContent() {
  const { colors, isDark, theme, toggleTheme } = useTheme();

  const screenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: isDark ? colors.card : colors.background,
      },
      headerTintColor: colors.text,
      headerRight: () => <ThemeToggle theme={theme} onPress={toggleTheme} />,
    }),
    [colors.background, colors.card, colors.text, isDark, theme, toggleTheme],
  );

  return (
    <Stack
      key={theme}
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    />
  );
}
