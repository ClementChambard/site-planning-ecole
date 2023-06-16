import React, { ReactNode } from "react";

interface SondageCardProps {
  children: ReactNode;
  name: string;
  buttonText: string;
  openModal: () => void;
  done: boolean;
}

const SondageCard: React.FC<SondageCardProps> = ({
  children,
  name,
  buttonText,
  openModal,
  done,
}) => {
  return (
    <div className="mx-5 sm:mx-10 p-4 rounded-2xl bg-gray-100 text-lg md:text-2xl sm:text-xl flex flex-row items-center">
      <div className="flex-1 flex justify-center items-center text-bold">
        {name}
      </div>
      <div className="flex-1 flex justify-center gap-4 items-center">
        {done === false ? (
          <div
            onClick={openModal}
            className="cursor-pointer px-4 py-2 bg-rose-500 hover:bg-opacity-50 transition text-white rounded-lg md:w-[200px] flex justify-center items-center"
          >
            {buttonText}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default SondageCard;
