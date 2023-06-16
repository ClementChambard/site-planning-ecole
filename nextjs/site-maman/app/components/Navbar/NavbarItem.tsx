"use client";

import React from "react";

interface NavbarItemProps {
  label: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer hover:text-neutral-500">
      {label}
    </div>
  );
};

export default NavbarItem;
