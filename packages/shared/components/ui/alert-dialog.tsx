import * as AlertDialogPrimitive from "@rn-primitives/alert-dialog";
import * as React from "react";
import { Platform, View, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { buttonTextVariants, buttonVariants } from "./button";
import { NativeOnlyAnimatedView } from "./native-only-animated-view";
import { TextClassContext } from "./text";
import { cn } from "../../utils/classname";

type ClassNameProp = {
  className?: string;
};

const AlertDialogOverlayPrimitive =
  AlertDialogPrimitive.Overlay as React.ComponentType<any>;
const AlertDialogContentPrimitive =
  AlertDialogPrimitive.Content as React.ComponentType<any>;
const AlertDialogHeaderView = View as React.ComponentType<any>;
const AlertDialogTitlePrimitive =
  AlertDialogPrimitive.Title as React.ComponentType<any>;
const AlertDialogDescriptionPrimitive =
  AlertDialogPrimitive.Description as React.ComponentType<any>;
const AlertDialogActionPrimitive =
  AlertDialogPrimitive.Action as React.ComponentType<any>;
const AlertDialogCancelPrimitive =
  AlertDialogPrimitive.Cancel as React.ComponentType<any>;

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function AlertDialogOverlay({
  className,
  children,
  ...props
}: Omit<AlertDialogPrimitive.OverlayProps, "asChild"> &
  React.RefAttributes<AlertDialogPrimitive.OverlayRef> & {
    children?: React.ReactNode;
  } & ClassNameProp) {
  return (
    <FullWindowOverlay>
      <AlertDialogOverlayPrimitive
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-2",
          Platform.select({
            web: "animate-in fade-in-0 fixed",
          }),
          className,
        )}
        {...props}
      >
        <NativeOnlyAnimatedView
          entering={FadeIn.duration(200).delay(50)}
          exiting={FadeOut.duration(150)}
        >
          <>{children}</>
        </NativeOnlyAnimatedView>
      </AlertDialogOverlayPrimitive>
    </FullWindowOverlay>
  );
}

function AlertDialogContent({
  className,
  portalHost,
  ...props
}: AlertDialogPrimitive.ContentProps &
  React.RefAttributes<AlertDialogPrimitive.ContentRef> & {
    portalHost?: string;
  } & ClassNameProp) {
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogContentPrimitive
          className={cn(
            "bg-background border-border/20 dark:border-border/10 z-50 flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg",
            Platform.select({
              web: "animate-in fade-in-0 zoom-in-95 duration-200",
            }),
            className,
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: ViewProps & ClassNameProp) {
  return (
    <TextClassContext.Provider value="text-center sm:text-left">
      <AlertDialogHeaderView
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function AlertDialogFooter({ className, ...props }: ViewProps & ClassNameProp) {
  return (
    <AlertDialogHeaderView
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.TitleProps &
  React.RefAttributes<AlertDialogPrimitive.TitleRef> &
  ClassNameProp) {
  return (
    <AlertDialogTitlePrimitive
      className={cn("text-foreground text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.DescriptionProps &
  React.RefAttributes<AlertDialogPrimitive.DescriptionRef> &
  ClassNameProp) {
  return (
    <AlertDialogDescriptionPrimitive
      className={cn("text-muted-foreground/60 text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: AlertDialogPrimitive.ActionProps &
  React.RefAttributes<AlertDialogPrimitive.ActionRef> &
  ClassNameProp) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ className })}>
      <AlertDialogActionPrimitive
        className={cn(buttonVariants(), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function AlertDialogCancel({
  className,
  ...props
}: AlertDialogPrimitive.CancelProps &
  React.RefAttributes<AlertDialogPrimitive.CancelRef> &
  ClassNameProp) {
  return (
    <TextClassContext.Provider
      value={buttonTextVariants({ className, variant: "outline" })}
    >
      <AlertDialogCancelPrimitive
        className={cn(buttonVariants({ variant: "outline" }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
