"use client";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import AddRollerModal from "@/app/components/rollers/AddRollerModal";
import AdminRollerCard from "@/app/components/rollers/AdminRollerCard";
import EditRollerModal from "@/app/components/rollers/EditRollerModal";
import useAddRollerModal from "@/app/hooks/useAddRollerModal";
import fetcher from "@/app/lib/fetcher";
import rollerSortFunc from "@/app/util/rollerSortFunc";
import { Roller } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Page() {
  const [trigger, setTrigger] = useState(false);
  const refresh = useCallback(() => setTrigger((t) => !t), [setTrigger]);

  const [rollers, setRollers] = useState([]);

  useEffect(() => {
    fetcher("/api/rollers").then((dat) => setRollers(dat));
  }, [trigger]);

  const addRollerModal = useAddRollerModal();

  return (
    <>
      <ClientOnly>
        <AddRollerModal refresh={refresh} />
        <EditRollerModal refresh={refresh} />
      </ClientOnly>
      <div className="flex flex-col gap-6 md:px-10 px-4 my-10 pb-40">
        <div className="flex flex-col gap-4">
          {rollers.sort(rollerSortFunc).map((roller: Roller) => {
            return (
              <AdminRollerCard
                key={roller.id}
                roller={roller}
                refresh={refresh}
              />
            );
          })}
        </div>
        <Button
          outline
          icon={IoMdAddCircleOutline}
          label="Ajouter Eleve"
          onClick={addRollerModal.onOpen}
        />
      </div>
    </>
  );
}
