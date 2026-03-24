import { Alert } from "react-native";
import { toast } from "sonner-native";

import { ModalProps, ToastProps } from "@/types/ui";

const toastMethodByType = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info,
  question: toast.info,
} as const;

const fallbackTitle = "Notification";

export function showToastAlert({ title, message, icon, onVoid }: ToastProps) {
  const method = icon ? (toastMethodByType[icon] ?? toast) : toast;
  const heading = title ?? message ?? fallbackTitle;
  const description = title && message ? message : undefined;

  method(heading, {
    description,
    onDismiss: () => {
      onVoid?.();
    },
  });
}

export function showModalAlert(p: ModalProps) {
  Alert.alert(p.title, p.deskripsi, [
    {
      text: p.confirmButtonText || "OK",
      style: p.confirmButtonColor === "destructive" ? "destructive" : "default",
      onPress: () => {
        p.onConfirm?.();
      },
    },
  ]);
}

export function showConfirmAlert(p: ModalProps): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(p.title, p.deskripsi, [
      {
        text: "Batal",
        style: "cancel",
        onPress: () => {
          p.onClose?.();
          resolve(false);
        },
      },
      {
        text: p.confirmButtonText || "OK",
        style:
          p.confirmButtonColor === "destructive" ? "destructive" : "default",
        onPress: () => {
          p.onConfirm?.();
          resolve(true);
        },
      },
    ]);
  });
}
