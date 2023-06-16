"use client";

import React, { useCallback } from "react";
import axios from "axios";
import useEditRdvModal from "@/app/hooks/useEditRdvModal";
import { Rdv } from "@prisma/client";
import AdminCard from "../AdminCard";

interface AdminRdvCardProps {
  rdv: Rdv;
  refresh: () => void;
}

const AdminRdvCard: React.FC<AdminRdvCardProps> = ({ rdv, refresh }) => {
  const deleteRdv = useCallback(async () => {
    await axios.put(`/api/rdvs/${rdv.id}`);
    refresh();
  }, [rdv, refresh]);
  const editRdvModal = useEditRdvModal();
  return (
    <AdminCard onDelete={deleteRdv} onEdit={() => editRdvModal.onOpen(rdv)}>
      <div className="text-neutral-400 hidden sm:block font-light md:text-lg sm:text-sm text-xs">
        {rdv.id}
      </div>
      <div className="font-semibold">{`${rdv.hour}h${rdv.minute.toLocaleString(
        "en-US",
        {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }
      )}`}</div>
      <div
        className={
          rdv.student === "NONE"
            ? "text-gray-300"
            : rdv.student === "FREE"
            ? "text-green-500"
            : ""
        }
      >
        {rdv.student === "NONE" ? (
          "Inactif"
        ) : rdv.student === "FREE" ? (
          "Libre"
        ) : (
          <>
            Réservé par{" "}
            <span className="text-neutral-500 italic">{rdv.student}</span>
          </>
        )}
      </div>
    </AdminCard>
  );
};

export default AdminRdvCard;
