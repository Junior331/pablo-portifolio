export interface Snackbar {
  isOpen: boolean;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  severity: "success" | "info" | "warning" | "error";
}

export interface SnackbarContextType {
  snackbar: Snackbar;
  closeSnackbar: () => void;
  resetSnackbar: () => void;
  setSnackbar: (snackbarData: Snackbar) => void;
}
