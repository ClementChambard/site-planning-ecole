"use client";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import EditSondageModal from "@/app/components/modals/EditSondageModal";
import useEditSondageModal from "@/app/hooks/useEditSondageModal";
import fetcher from "@/app/lib/fetcher";
import { Sondage } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsGear } from "react-icons/bs";

export default function Page() {
  const [trigger, setTrigger] = useState(false);
  const refresh = useCallback(() => {
    setTrigger((b) => !b);
  }, [setTrigger]);
  if (trigger) {
  }

  const editSondageModal = useEditSondageModal();
  const [sondages, setSondages] = useState([]);

  useEffect(() => {
    fetcher("/api/sondages")
      .then((res) => setSondages(res))
      .catch((e) => console.log(e));
  }, [trigger]);

  const toggleActive = (id: string, active: boolean) => {
    axios
      .patch(`/api/sondages/${id}`, { active: !active })
      .then((res) => refresh())
      .catch((e) => toast.error(e.message));
  };

  const router = useRouter();

  const Card = ({ sondage }: { sondage: Sondage }) => {
    return (
      <div className="flex rounded-lg bg-neutral-100 flex-row sm:text-lg text-md items-center md:mx-40 mx-10 py-4">
        <div
          onClick={() => router.push(`/admin/sondages/${sondage.name}`)}
          className="flex-1 flex justify-center items-center"
        >
          <div className="cursor-pointer hover:bg-neutral-200 transition rounded-lg px-4 py-2">
            {sondage.name}
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center flex-row gap-3 px-3">
          <Button
            label={sondage.active ? "actif" : "inactif"}
            onClick={() => toggleActive(sondage.id, sondage.active)}
            gray={!sondage.active}
          />
          <Button
            reduceIcon
            label="propriétés"
            icon={BsGear}
            outline
            onClick={() => editSondageModal.onOpen(sondage)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <ClientOnly>
        <EditSondageModal updater={refresh} />
      </ClientOnly>
      <div className="flex flex-col gap-3 mt-3">
        {sondages.map((s: Sondage) => {
          return <Card key={s.id} sondage={s} />;
        })}
      </div>
    </>
  );
}
