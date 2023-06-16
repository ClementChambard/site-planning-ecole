import { DefaultValues } from "react-hook-form";
import { create } from "zustand";

interface AddRollerModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddRollerModal = create<AddRollerModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export type AddRollerModalFormValues = {
  student: string;
};

export const addRollerModalDefaultValues: DefaultValues<AddRollerModalFormValues> =
{
  student: "",
};

export default useAddRollerModal;
