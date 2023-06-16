"use client";

import React, { useEffect, useState } from "react";
import fetcher from "../lib/fetcher";
import { Sondage } from "@prisma/client";

interface SondageInfoProps {
  name: string;
}

const SondageInfo: React.FC<SondageInfoProps> = ({ name }) => {
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetcher("/api/sondages").then((dat) =>
      setInfo(dat.filter((d: Sondage) => d.name === name)[0].info)
    );
  }, []);

  return <div className="mx-6 md:mx-12 my-10 text-lg md:text-xl">{info}</div>;
};

export default SondageInfo;
