import * as DialogPrimitive from "@rn-primitives/dialog";
import { X } from "lucide-react-native";
import * as React from "react";
import { Platform, Text, View, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { Icon } from "./icon";
import { NativeOnlyAnimatedView } from "./native-only-animated-view";
import { cn } from "../../utils/classname";

type ClassNameProp = {
  className?: string;
};

const DialogOverlayPrimitive =
  DialogPrimitive.Overlay as React.ComponentType<any>;
const DialogContentPrimitive =
  DialogPrimitive.Content as React.ComponentType<any>;
const DialogClosePrimitive = DialogPrimitive.Close as React.ComponentType<any>;
const DialogTitlePrimitive = DialogPrimitive.Title as React.ComponentType<any>;
const DialogDescriptionPrimitive =
  DialogPrimitive.Description as React.ComponentType<any>;
const ViewWithClassName = View as React.ComponentType<any>;
const TextWithClassName = Text as React.ComponentType<any>;

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function DialogOverlay({
  className,
  children,
  ...props
}: Omit<DialogPrimitive.OverlayProps, "asChild"> &
  React.RefAttributes<DialogPrimitive.OverlayRef> & {
    children?: React.ReactNode;
  } & ClassNameProp) {
  return (
    <FullWindowOverlay>
      <DialogOverlayPrimitive
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-2",
          Platform.select({
            web: "animate-in fade-in-0 fixed cursor-default [&>*]:cursor-auto",
          }),
          className,
        )}
        {...props}
        asChild={Platform.OS !== "web"}
      >
        <NativeOnlyAnimatedView
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
        >
          <NativeOnlyAnimatedView
            entering={FadeIn.delay(50)}
            exiting={FadeOut.duration(150)}
          >
            <>{children}</>
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </DialogOverlayPrimitive>
    </FullWindowOverlay>
  );
}
function DialogContent({
  className,
  portalHost,
  children,
  ...props
}: DialogPrimitive.ContentProps &
  React.RefAttributes<DialogPrimitive.ContentRef> & {
    portalHost?: string;
  } & ClassNameProp) {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogContentPrimitive
          className={cn(
            "bg-background border-border/20 dark:border-border/10 z-50 mx-auto flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg",
            Platform.select({
              web: "animate-in fade-in-0 zoom-in-95 duration-200",
            }),
            className,
          )}
          {...props}
        >
          <>{children}</>
          <DialogClosePrimitive
            className={cn(
              "absolute right-4 top-4 rounded opacity-70 active:opacity-100",
              Platform.select({
                web: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
              }),
            )}
            hitSlop={12}
          >
            <Icon
              as={X}
              className={cn(
                "text-accent-foreground web:pointer-events-none size-4 shrink-0",
              )}
            />
            <TextWithClassName className="sr-only">Close</TextWithClassName>
          </DialogClosePrimitive>
        </DialogContentPrimitive>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ViewProps & ClassNameProp) {
  return (
    <ViewWithClassName
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ViewProps & ClassNameProp) {
  return (
    <ViewWithClassName
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.TitleProps &
  React.RefAttributes<DialogPrimitive.TitleRef> &
  ClassNameProp) {
  return (
    <DialogTitlePrimitive
      className={cn(
        "text-foreground text-lg font-semibold leading-none",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.DescriptionProps &
  React.RefAttributes<DialogPrimitive.DescriptionRef> &
  ClassNameProp) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-muted-foreground/60 text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
