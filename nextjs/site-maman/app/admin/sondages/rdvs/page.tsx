"use client";

import Button from "@/app/components/Button";
import AdminRdvCard from "@/app/components/rdvs/AdminRdvCard";
import useAddRdvModal from "@/app/hooks/useAddRdvModal";
import rdvSortFunc from "@/app/util/rdvSortFunc";
import { useCallback, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

import ClientOnly from "@/app/components/ClientOnly";
import AddRdvModal from "@/app/components/rdvs/AddRdvModal";
import EditRdvModal from "@/app/components/rdvs/EditRdvModal";
import fetcher from "@/app/lib/fetcher";
import { Rdv } from "@prisma/client";

const Page = () => {
  const [rdvs, setRdvs] = useState([]);

  const addRdvModal = useAddRdvModal();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetcher("/api/rdvs").then((dat) => setRdvs(dat));
  }, [trigger]);

  const refresh = useCallback(() => setTrigger((t) => !t), [setTrigger]);

  return (
    <>
      <ClientOnly>
        <EditRdvModal refresh={refresh} />
        <AddRdvModal refresh={refresh} />
      </ClientOnly>
      <div className="flex flex-col gap-6 md:px-10 px-4 my-10 pb-40">
        <div className="flex flex-col gap-4">
          {rdvs.sort(rdvSortFunc).map((rdv: Rdv) => {
            return <AdminRdvCard key={rdv.id} rdv={rdv} refresh={refresh} />;
          })}
        </div>
        <Button
          outline
          icon={IoMdAddCircleOutline}
          label="Ajouter RDV"
          onClick={addRdvModal.onOpen}
        />
      </div>
    </>
  );
};

export default Page;
