"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface CheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-lg">{label}</div>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type="checkbox"
        className={` text-lg
         ${errors[id] ? "" : ""}
         `}
      />
    </div>
  );
};

export default Checkbox;
