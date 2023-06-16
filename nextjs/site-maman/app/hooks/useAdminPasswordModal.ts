import { DefaultValues } from "react-hook-form";
import { create } from "zustand";

interface AdminPasswordModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAdminPasswordModal = create<AdminPasswordModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type AdminPasswordModalFormValues = {
  password: string;
};

export const adminPasswordModalDefaultValues: DefaultValues<AdminPasswordModalFormValues> =
{
  password: "",
};

export default useAdminPasswordModal;
