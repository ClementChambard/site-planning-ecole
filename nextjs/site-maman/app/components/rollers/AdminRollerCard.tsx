"use client";

import { Roller } from "@prisma/client";
import AdminCard from "../AdminCard";
import useEditRollerModal from "@/app/hooks/useEditRollerModal";
import { useCallback } from "react";
import axios from "axios";

const AdminRollerCard = ({
  roller,
  refresh,
}: {
  roller: Roller;
  refresh: () => void;
}) => {
  const editRollerModal = useEditRollerModal();

  const deleteRoller = useCallback(async () => {
    await axios.put(`/api/rollers/${roller.id}`);
    refresh();
  }, [roller]);

  return (
    <AdminCard
      onEdit={() => editRollerModal.onOpen(roller)}
      onDelete={deleteRoller}
    >
      <div className="text-neutral-400 hidden sm:block font-light md:text-lg sm:text-sm text-xs">
        {roller.id}
      </div>
      <div className="font-semibold">{roller.student}</div>
      <div className="flex flex-row gap-4">
        {roller.hasAnswered === false ? (
          <div className="text-orange-300">En attente de réponse</div>
        ) : (
          <>
            <div
              className={roller.hasRoller ? "text-green-500" : "text-red-500"}
            >
              Rollers
            </div>
            <div
              className={roller.hasHelmet ? "text-green-500" : "text-red-500"}
            >
              Casque
            </div>
            <div
              className={roller.hasProtect ? "text-green-500" : "text-red-500"}
            >
              Protections
            </div>
            {roller.hasRoller === false && <div>{roller.size}</div>}
          </>
        )}
      </div>
    </AdminCard>
  );
};

export default AdminRollerCard;
