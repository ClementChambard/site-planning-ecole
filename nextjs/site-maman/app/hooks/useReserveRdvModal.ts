import { Rdv } from "@prisma/client";
import { DefaultValues } from "react-hook-form";
import { create } from "zustand";

interface ReserveRdvModalStore {
  isOpen: boolean;
  onOpen: (rdv: Rdv) => void;
  onClose: () => void;
  rdv: Rdv;
}

const useReserveRdvModal = create<ReserveRdvModalStore>((set) => ({
  isOpen: false,
  onOpen: (rdv: Rdv) => set({ isOpen: true, rdv: rdv }),
  onClose: () => set({ isOpen: false }),
  rdv: { id: "", hour: 0, minute: 0, student: "" },
}));

export type ReserveRdvModalFormValues = {
  student: string;
};

export const reserveRdvModalDefaultValues: DefaultValues<ReserveRdvModalFormValues> =
{
  student: "",
};

export default useReserveRdvModal;
