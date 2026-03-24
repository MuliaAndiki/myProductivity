import { createContext, useContext } from "react";
import { Toaster } from "sonner-native";

import { useTheme } from "@/core/providers/theme.provinder";
import {
  showConfirmAlert,
  showModalAlert,
  showToastAlert,
} from "@/hooks/useAlert/alert-wrapper";
import { AlertContexType, ModalProps, ToastProps } from "@/types/ui";

const AlertContex = createContext<AlertContexType | undefined>(undefined);

export const useAlert = (): AlertContexType => {
  const contex = useContext(AlertContex);
  if (!contex) throw new Error("useAlert must be used within an AlertProvider");
  return contex;
};

export const AlertProvinder = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useTheme();

  const toastAlert = ({ message, title, icon, onVoid }: ToastProps) => {
    showToastAlert({ message, title, icon, onVoid });
  };

  const showModal = (p: ModalProps) => {
    showModalAlert(p);
  };

  const confirm = (p: ModalProps): Promise<boolean> => {
    return showConfirmAlert(p);
  };

  return (
    <AlertContex.Provider
      value={{ toast: toastAlert, modal: showModal, confirm }}
    >
      {children}
      <Toaster
        theme={isDark ? "dark" : "light"}
        richColors
        position="top-center"
      />
    </AlertContex.Provider>
  );
};
