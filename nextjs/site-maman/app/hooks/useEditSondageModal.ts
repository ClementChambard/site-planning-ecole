import { Sondage } from "@prisma/client";
import { create } from "zustand";

interface EditSondageModalStore {
  isOpen: boolean;
  onOpen: (sondage: Sondage) => void;
  onClose: () => void;
  sondage: Sondage;
}

const useEditSondageModal = create<EditSondageModalStore>((set) => ({
  isOpen: false,
  onOpen: (sondage: Sondage) => set({ isOpen: true, sondage: sondage }),
  onClose: () => set({ isOpen: false }),
  sondage: { id: "", name: "", buttonText: "", info: "", active: true },
}));

export type EditSondageModalFormValues = {
  buttonText: string;
  info: string;
};

export default useEditSondageModal;
