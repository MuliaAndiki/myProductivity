import { View } from "react-native";

import { cn } from "../../utils/classname";

const ViewWithClassName = View as React.ComponentType<any>;

function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof View> &
  React.RefAttributes<View> & { className?: string }) {
  return (
    <ViewWithClassName
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
