import { Roller } from "@prisma/client";
import { create } from "zustand";

interface EditRollerModalStore {
  isOpen: boolean;
  onOpen: (roller: Roller) => void;
  onClose: () => void;
  roller: Roller;
}

const useEditRollerModal = create<EditRollerModalStore>((set) => ({
  isOpen: false,
  onOpen: (roller: Roller) => set({ isOpen: true, roller: roller }),
  onClose: () => set({ isOpen: false }),
  roller: {
    id: "",
    student: "",
    size: 0,
    hasAnswered: false,
    hasHelmet: false,
    hasProtect: false,
    hasRoller: false,
  },
}));

export type EditRollerModalFormValues = {
  student: string;
};

export default useEditRollerModal;
