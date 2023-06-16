"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SondageButtonProps {
  text: string;
  dest: string;
}

const SondageButton: React.FC<SondageButtonProps> = ({ text, dest }) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer mx-10 my-10 lg:mx-20 h-30 bg-rose-400 px-10 md:px-20 py-10 flex justify-center items-center text-2xl md:text-3xl font-bold text-white rounded-2xl hover:bg-rose-600 transition shadow-xl"
      onClick={() => router.push(dest)}
    >
      {text}
    </div>
  );
};

export default SondageButton;
