import { View, type ViewProps } from "react-native";

import { Text, TextClassContext } from "./text";
import { cn } from "../../utils/classname";

const ViewWithClassName = View as React.ComponentType<any>;
const TextWithClassName = Text as React.ComponentType<any>;

function Card({
  className,
  ...props
}: ViewProps & React.RefAttributes<View> & { className?: string }) {
  return (
    <TextClassContext.Provider value="text-card-foreground">
      <ViewWithClassName
        className={cn(
          "bg-card border-border/20 dark:border-border/10 flex flex-col gap-6 rounded-xl border py-6 shadow-sm shadow-black/5",
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({
  className,
  ...props
}: ViewProps & React.RefAttributes<View> & { className?: string }) {
  return (
    <ViewWithClassName
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> &
  React.RefAttributes<Text> & { className?: string }) {
  return (
    <TextWithClassName
      role="heading"
      aria-level={3}
      className={cn("font-semibold leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> &
  React.RefAttributes<Text> & { className?: string }) {
  return (
    <TextWithClassName
      className={cn("text-muted-foreground/60 text-sm", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: ViewProps & React.RefAttributes<View> & { className?: string }) {
  return <ViewWithClassName className={cn("px-6", className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: ViewProps & React.RefAttributes<View> & { className?: string }) {
  return (
    <ViewWithClassName
      className={cn("flex flex-row items-center px-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
