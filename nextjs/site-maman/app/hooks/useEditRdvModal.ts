import { Rdv } from "@prisma/client";
import { create } from "zustand";

interface EditRdvModalStore {
  isOpen: boolean;
  onOpen: (rdv: Rdv) => void;
  onClose: () => void;
  rdv: Rdv;
}

const useEditRdvModal = create<EditRdvModalStore>((set) => ({
  isOpen: false,
  onOpen: (rdv: Rdv) => set({ isOpen: true, rdv: rdv }),
  onClose: () => set({ isOpen: false }),
  rdv: { id: "", hour: 0, minute: 0, student: "" },
}));

export type EditRdvModalFormValues = {
  hour: string;
  minute: string;
  inactive: boolean;
};

export default useEditRdvModal;
