"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TimeInputProps {
  disabled?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const TimeInput: React.FC<TimeInputProps> = ({
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-lg">Horaire: </div>
      <div className="flex flex-row items-baseline">
        <div className="w-40 relative">
          <input
            id="hour"
            disabled={disabled}
            {...register("hour", { required: true })}
            placeholder="heure"
            type="number"
            className={`
          peer
          w-full
          p-4
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors["hour"] ? "border-rose-500" : "border-neutral-300"}
          ${errors["hour"] ? "focus:border-rose-500" : "focus:border-black"}
        `}
          />
        </div>
        <div className="text-md px-4">h</div>
        <div className="w-40">
          <input
            id="minute"
            disabled={disabled}
            {...register("minute", { required: true })}
            placeholder="minute"
            type="number"
            className={`
          peer
          w-full
          p-4
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors["minute"] ? "border-rose-500" : "border-neutral-300"}
          ${errors["minute"] ? "focus:border-rose-500" : "focus:border-black"}
        `}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
