import { Piscine } from "@prisma/client";
import { DefaultValues } from "react-hook-form";
import { create } from "zustand";

interface ReservePiscineModalStore {
  isOpen: boolean;
  onOpen: (piscine: Piscine) => void;
  onClose: () => void;
  piscine: Piscine;
}

const useReservePiscineModal = create<ReservePiscineModalStore>((set) => ({
  isOpen: false,
  onOpen: (piscine: Piscine) => set({ isOpen: true, piscine: piscine }),
  onClose: () => set({ isOpen: false }),
  piscine: { id: "", date: new Date(), parent: "" },
}));

export type ReservePiscineModalFormValues = {
  parent: string;
};

export const reservePiscineModalDefaultValues: DefaultValues<ReservePiscineModalFormValues> =
{
  parent: "",
};

export default useReservePiscineModal;
