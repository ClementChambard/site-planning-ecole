import { DefaultValues } from "react-hook-form";
import { create } from "zustand";

interface AddRdvModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddRdvModal = create<AddRdvModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type AddRdvModalFormValues = {
  hour: string;
  minute: string;
  inactive: boolean;
};

export const addRdvModalDefaultValues: DefaultValues<AddRdvModalFormValues> = {
  hour: "",
  minute: "",
  inactive: false,
};

export default useAddRdvModal;
