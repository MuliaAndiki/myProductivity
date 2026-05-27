import * as ProgressPrimitive from "@rn-primitives/progress";
import { Platform, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import { cn } from "../../utils/classname";

const ProgressRoot = ProgressPrimitive.Root as React.ComponentType<any>;
const ProgressIndicatorPrimitive =
  ProgressPrimitive.Indicator as React.ComponentType<any>;
const ViewWithClassName = View as React.ComponentType<any>;
const AnimatedViewWithClassName = Animated.View as React.ComponentType<any>;

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressPrimitive.RootProps &
  React.RefAttributes<ProgressPrimitive.RootRef> & {
    className?: string;
    indicatorClassName?: string;
  }) {
  return (
    <ProgressRoot
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <Indicator value={value} className={indicatorClassName} />
    </ProgressRoot>
  );
}

export { Progress };

const Indicator = Platform.select({
  web: WebIndicator,
  native: NativeIndicator,
  default: NullIndicator,
});

type IndicatorProps = {
  value: number | undefined | null;
  className?: string;
};

function WebIndicator({ value, className }: IndicatorProps) {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <ViewWithClassName
      className={cn(
        "bg-primary h-full w-full flex-1 transition-all",
        className,
      )}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    >
      <ProgressIndicatorPrimitive className={cn("h-full w-full", className)} />
    </ViewWithClassName>
  );
}

function NativeIndicator({ value, className }: IndicatorProps) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  }, [value]);

  if (Platform.OS === "web") {
    return null;
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <AnimatedViewWithClassName
        style={indicator}
        className={cn("bg-foreground h-full", className)}
      />
    </ProgressPrimitive.Indicator>
  );
}

function NullIndicator(_props: IndicatorProps) {
  return null;
}
