import { DefaultValues } from "react-hook-form";
import { create } from "zustand";

interface AddPiscineModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddPiscineModal = create<AddPiscineModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type AddPiscineModalFormValues = {
  date: Date;
};

export const addPiscineModalDefaultValues: DefaultValues<AddPiscineModalFormValues> =
{
  date: new Date(),
};

export default useAddPiscineModal;
