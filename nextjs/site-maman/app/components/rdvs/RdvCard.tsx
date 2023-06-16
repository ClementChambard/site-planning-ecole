import useReserveRdvModal from "@/app/hooks/useReserveRdvModal";
import { Rdv } from "@prisma/client";
import React from "react";
import SondageCard from "../SondageCard";

interface RdvCardProps {
  rdv: Rdv;
}

const RdvCard: React.FC<RdvCardProps> = ({ rdv }) => {
  const reserveRdvModal = useReserveRdvModal();

  if (rdv.student === "NONE") return null;

  return (
    <SondageCard
      openModal={() => reserveRdvModal.onOpen(rdv)}
      buttonText="Réserver"
      name={`${rdv.hour}h${rdv.minute.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`}
      done={rdv.student !== "FREE"}
    >
      <div className="py-2">
        <span className="hidden sm:inline">Réservé par </span>
        <span className="text-neutral-500 italic">{rdv.student}</span>
      </div>
    </SondageCard>
  );
};

export default RdvCard;
