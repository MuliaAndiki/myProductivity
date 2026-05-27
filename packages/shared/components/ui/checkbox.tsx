import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Check } from "lucide-react-native";
import { Platform } from "react-native";

import { Icon } from "./icon";
import { cn } from "../../utils/classname";

const CheckboxRoot = CheckboxPrimitive.Root as React.ComponentType<any>;
const CheckboxIndicator =
  CheckboxPrimitive.Indicator as React.ComponentType<any>;
const IconWithClassName = Icon as React.ComponentType<any>;

const DEFAULT_HIT_SLOP = 24;

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: CheckboxPrimitive.RootProps &
  React.RefAttributes<CheckboxPrimitive.RootRef> & {
    className?: string;
    checkedClassName?: string;
    indicatorClassName?: string;
    iconClassName?: string;
  }) {
  return (
    <CheckboxRoot
      className={cn(
        "border-input/20 dark:border-input/15 dark:bg-input/30 size-4 shrink-0 rounded-[4px] border shadow-sm shadow-black/5",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive peer cursor-default outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed",
          native: "overflow-hidden",
        }),
        props.checked && cn("border-primary", checkedClassName),
        props.disabled && "opacity-50",
        className,
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxIndicator
        className={cn(
          "bg-primary h-full w-full items-center justify-center",
          indicatorClassName,
        )}
      >
        <IconWithClassName
          as={Check}
          size={12}
          strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          className={cn("text-primary-foreground", iconClassName)}
        />
      </CheckboxIndicator>
    </CheckboxRoot>
  );
}

export { Checkbox };
