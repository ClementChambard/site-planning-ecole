import { Roller } from "@prisma/client";
import { create } from "zustand";

interface FillinRollerModalStore {
  isOpen: boolean;
  onOpen: (roller: Roller) => void;
  onClose: () => void;
  roller: Roller;
}

const useFillinRollerModal = create<FillinRollerModalStore>((set) => ({
  isOpen: false,
  onOpen: (roller: Roller) => set({ isOpen: true, roller: roller }),
  onClose: () => set({ isOpen: false }),
  roller: {
    id: "",
    student: "",
    size: 0,
    hasProtect: false,
    hasHelmet: false,
    hasRoller: false,
    hasAnswered: false,
  },
}));

export type FillinRollerModalFormValues = {
  size: number;
  hasRoller: boolean;
  hasHelmet: boolean;
  hasProtect: boolean;
};

export default useFillinRollerModal;
