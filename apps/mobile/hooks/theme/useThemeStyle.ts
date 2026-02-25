import { useColorScheme } from "nativewind";

export function useThemeStyles() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";

  const themeClasses = {
    background: "bg-background",
    text: "text-foreground",
    textMuted: "text-muted-foreground/60",

    card: "bg-card",
    cardText: "text-card-foreground",

    primary: "bg-primary",
    primaryText: "text-primary-foreground",

    secondary: "bg-secondary",
    secondaryText: "text-secondary-foreground",

    border: "border-border/20 dark:border-border/10",

    input: "bg-transparent border-input/20 dark:border-input/15",
  };

  return {
    theme,
    themeClasses,
    isDark: theme === "dark",
  };
}
