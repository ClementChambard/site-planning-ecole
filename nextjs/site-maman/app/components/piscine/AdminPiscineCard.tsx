"use client";

import { Piscine } from "@prisma/client";
import AdminCard from "../AdminCard";
import dateFormat from "dateformat";
import { useCallback } from "react";
import axios from "axios";
import useEditPiscineModal from "@/app/hooks/useEditPiscineModal";

const AdminPiscineCard = ({
  piscine,
  refresh,
}: {
  piscine: Piscine;
  refresh: () => void;
}) => {
  const deletePiscine = useCallback(async () => {
    await axios.put(`/api/piscine/${piscine.id}`);
    refresh();
  }, [piscine, refresh]);
  const editPiscineModal = useEditPiscineModal();
  return (
    <AdminCard
      onEdit={() => editPiscineModal.onOpen(piscine)}
      onDelete={deletePiscine}
    >
      <div className="text-neutral-400 hidden sm:block font-light md:text-lg sm:text-sm text-xs">
        {piscine.id}
      </div>
      <div className="font-semibold">
        {dateFormat(piscine.date, "dd/mm/yyyy")}
      </div>
      <div
        className={
          piscine.parent === "NONE"
            ? "text-gray-300"
            : piscine.parent === "FREE"
            ? "text-green-500"
            : ""
        }
      >
        {piscine.parent === "NONE" ? (
          "Inactif"
        ) : piscine.parent === "FREE" ? (
          "Libre"
        ) : (
          <>
            Réservé par{" "}
            <span className="text-neutral-500 italic">{piscine.parent}</span>
          </>
        )}
      </div>
    </AdminCard>
  );
};

export default AdminPiscineCard;
