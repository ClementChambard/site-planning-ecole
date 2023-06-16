"use client";

import ClientOnly from "@/app/components/ClientOnly";
import SondageInfo from "@/app/components/SondageInfo";
import AddPiscineModal from "@/app/components/piscine/AddPiscineModal";
import PiscineCard from "@/app/components/piscine/PiscineCard";
import ReservePiscineModal from "@/app/components/piscine/ReservePiscineModal";
import fetcher from "@/app/lib/fetcher";
import piscineSortFunc from "@/app/util/piscineSortFunc";
import { Piscine } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [trigger, setTrigger] = useState(false);
  const refresh = useCallback(() => setTrigger((t) => !t), [setTrigger]);

  const [piscines, setPiscines] = useState([]);

  useEffect(() => {
    fetcher("/api/piscine").then((dat) => setPiscines(dat));
  }, [trigger]);

  return (
    <>
      <ClientOnly>
        <ReservePiscineModal updater={refresh} />
      </ClientOnly>
      <SondageInfo name="piscine" />
      <div className="mt-4 flex flex-col gap-3 pb-4">
        {piscines.sort(piscineSortFunc).map((piscine: Piscine) => {
          return <PiscineCard key={piscine.id} piscine={piscine} />;
        })}
      </div>
    </>
  );
}
