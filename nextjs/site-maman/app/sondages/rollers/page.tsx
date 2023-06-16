"use client";

import ClientOnly from "@/app/components/ClientOnly";
import SondageInfo from "@/app/components/SondageInfo";
import FillinRollerModal from "@/app/components/rollers/FillinRollerModal";
import RollerCard from "@/app/components/rollers/RollerCard";
import fetcher from "@/app/lib/fetcher";
import rollerSortFunc from "@/app/util/rollerSortFunc";
import { Roller } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [trigger, setTrigger] = useState(false);
  const refresh = useCallback(() => setTrigger((t) => !t), [setTrigger]);

  const [rollers, setRollers] = useState([]);

  useEffect(() => {
    fetcher("/api/rollers").then((dat) => setRollers(dat));
  }, [trigger]);

  return (
    <>
      <ClientOnly>
        <FillinRollerModal refresh={refresh} />
      </ClientOnly>
      <SondageInfo name="rollers" />
      <div className="mt-4 flex flex-col gap-3 pb-4">
        {rollers.sort(rollerSortFunc).map((roller: Roller) => {
          return <RollerCard key={roller.id} roller={roller} />;
        })}
      </div>
    </>
  );
}
