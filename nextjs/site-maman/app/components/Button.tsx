"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label?: String;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  reduceIcon?: boolean;
  small?: boolean;
  icon?: IconType;
  gray?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  reduceIcon,
  small,
  gray,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${reduceIcon ? "md:relative flex" : "relative"}
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        justify-center items-center
        ${outline
          ? "bg-white border-black text-black"
          : gray
            ? "bg-gray-200 text-gray-400 hover:bg-gray-300"
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
        }
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className={reduceIcon ? "md:hidden" : "absolute left-4 top-3"}
        />
      )}
      <span className={reduceIcon ? "hidden md:inline" : ""}>{label}</span>
    </button>
  );
};

export default Button;
