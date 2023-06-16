"use client";

import ClientOnly from "@/app/components/ClientOnly";
import RdvCard from "@/app/components/rdvs/RdvCard";
import ReserveRdvModal from "@/app/components/rdvs/ReserveRdvModal";
import fetcher from "@/app/lib/fetcher";
import { useCallback, useEffect, useState } from "react";
import { Rdv } from "@prisma/client";
import rdvSortFunc from "@/app/util/rdvSortFunc";
import SondageInfo from "@/app/components/SondageInfo";

export default function Page() {
  const [trigger, setTrigger] = useState(false);
  const refresh = useCallback(() => setTrigger((t) => !t), [setTrigger]);

  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    fetcher("/api/rdvs").then((dat) => setRdvs(dat));
  }, [trigger]);

  return (
    <>
      <ClientOnly>
        <ReserveRdvModal updater={refresh} />
      </ClientOnly>
      <SondageInfo name="rdvs" />
      <div className="mt-4 flex flex-col gap-3 pb-4">
        {rdvs.sort(rdvSortFunc).map((rdv: Rdv) => {
          return <RdvCard key={rdv.id} rdv={rdv} />;
        })}
      </div>
    </>
  );
}
