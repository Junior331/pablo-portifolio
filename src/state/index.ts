import { Snackbar } from "@/types/types";

export const initialState: Snackbar = {
  message: "",
  isOpen: false,
  severity: "info",
  vertical: "bottom",
  horizontal: "left",
};
