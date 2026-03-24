export type ToastType = "success" | "error" | "warning" | "info" | "question";
export type ConfirmButtonColor =
  | "primary"
  | "secondary"
  | "destructive"
  | "default";

export interface ModalProps {
  title: string;
  icon?: ToastType;
  deskripsi: string;
  confirmButtonText?: string;
  confirmButtonColor?: ConfirmButtonColor;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface ToastProps {
  title?: string;
  icon?: ToastType;
  message?: string;
  onVoid?: () => void;
}

export interface AlertContexType {
  toast: (p: ToastProps) => void;
  modal: (p: ModalProps) => void;
  confirm: (p: ModalProps) => Promise<boolean>;
}

export interface PopUpProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export interface SpreedType {
  orientation?: "horizontal" | "vertical";
  className?: string;
}
