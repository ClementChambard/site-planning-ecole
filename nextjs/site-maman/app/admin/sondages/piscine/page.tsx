"use client";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import AddPiscineModal from "@/app/components/piscine/AddPiscineModal";
import AdminPiscineCard from "@/app/components/piscine/AdminPiscineCard";
import EditPiscineModal from "@/app/components/piscine/EditPiscineModal";
import useAddPiscineModal from "@/app/hooks/useAddPiscineModal";
import fetcher from "@/app/lib/fetcher";
import piscineSortFunc from "@/app/util/piscineSortFunc";
import { Piscine } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Page() {
  const [trigger, setTrigger] = useState(false);
  const refresh = useCallback(() => setTrigger((t) => !t), [setTrigger]);

  const [piscines, setPiscines] = useState([]);

  useEffect(() => {
    fetcher("/api/piscine").then((dat) => setPiscines(dat));
  }, [trigger]);

  const addPiscineModal = useAddPiscineModal();

  return (
    <>
      <ClientOnly>
        <AddPiscineModal refresh={refresh} />
        <EditPiscineModal refresh={refresh} />
      </ClientOnly>
      <div className="flex flex-col gap-6 md:px-10 px-4 my-10 pb-40">
        <div className="flex flex-col gap-4">
          {piscines.sort(piscineSortFunc).map((piscine: Piscine) => {
            return (
              <AdminPiscineCard
                key={piscine.id}
                piscine={piscine}
                refresh={refresh}
              />
            );
          })}
        </div>
        <Button
          outline
          icon={IoMdAddCircleOutline}
          label="Ajouter Séance"
          onClick={addPiscineModal.onOpen}
        />
      </div>
    </>
  );
}
