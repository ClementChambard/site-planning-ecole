"use client";

import { useEffect, useState } from "react";
import SondageButton from "./components/SondageButton";
import axios from "axios";
import { Sondage } from "@prisma/client";

export default function Home() {
  const [sondages, setSondages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/sondages")
      .then((res) => setSondages(res.data))
      .catch((e) => console.log(e));
  }, [setSondages]);

  return (
    <div className="flex flex-col gap-10 pt-10">
      {sondages.map((sondage: Sondage) => {
        if (!sondage.active) return null;
        return (
          <SondageButton
            key={sondage.id}
            text={sondage.buttonText}
            dest={`/sondages/${sondage.name}`}
          />
        );
      })}
    </div>
  );
}
