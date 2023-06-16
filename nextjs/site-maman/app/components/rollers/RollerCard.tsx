"use client";

import { Roller } from "@prisma/client";
import SondageCard from "../SondageCard";
import Button from "../Button";
import { BiEdit } from "react-icons/bi";
import useFillinRollerModal from "@/app/hooks/useFillinRollerModal";

const RollerCard = ({ roller }: { roller: Roller }) => {
  const fillinRollerModal = useFillinRollerModal();

  return (
    <SondageCard
      name={roller.student}
      openModal={() => fillinRollerModal.onOpen(roller)}
      buttonText="Répondre"
      done={roller.hasAnswered}
    >
      <div className="flex-1 sm:pr-4">
        <div className="flex flex-row justify-between">
          <div className={roller.hasRoller ? "text-green-500" : "text-red-500"}>
            Roller
          </div>
          {roller.hasRoller === false && (
            <span className="text-neutral-500">{roller.size}</span>
          )}
        </div>
        <div className={roller.hasHelmet ? "text-green-500" : "text-red-500"}>
          Casque
        </div>
        <div className={roller.hasProtect ? "text-green-500" : "text-red-500"}>
          Protections
        </div>
      </div>
      <div className="flex-1">
        <Button
          onClick={() => fillinRollerModal.onOpen(roller)}
          label="Modifier"
          icon={BiEdit}
          reduceIcon
          outline
        />
      </div>
    </SondageCard>
  );
};

export default RollerCard;
