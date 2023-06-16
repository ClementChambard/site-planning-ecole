import { Piscine } from "@prisma/client";
import { create } from "zustand";

interface EditPiscineModalStore {
  isOpen: boolean;
  onOpen: (piscine: Piscine) => void;
  onClose: () => void;
  piscine: Piscine;
}

const useEditPiscineModal = create<EditPiscineModalStore>((set) => ({
  isOpen: false,
  onOpen: (piscine: Piscine) => set({ isOpen: true, piscine: piscine }),
  onClose: () => set({ isOpen: false }),
  piscine: { id: "", date: new Date(), parent: "" },
}));

export type EditPiscineModalFormValues = {
  date: Date;
};

export default useEditPiscineModal;
