"use client";

import { Piscine } from "@prisma/client";
import SondageCard from "../SondageCard";
import dateFormat from "dateformat";
import useReservePiscineModal from "@/app/hooks/useReservePiscineModal";

const PiscineCard = ({ piscine }: { piscine: Piscine }) => {
  const reservePiscineModal = useReservePiscineModal();

  return (
    <SondageCard
      name={dateFormat(piscine.date, "dd/mm/yyyy")}
      buttonText="disponible"
      openModal={() => reservePiscineModal.onOpen(piscine)}
      done={piscine.parent !== "FREE"}
    >
      <div className="py-2">{piscine.parent}</div>
    </SondageCard>
  );
};

export default PiscineCard;
