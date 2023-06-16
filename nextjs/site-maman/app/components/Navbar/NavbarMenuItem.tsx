"use client";

import React from "react";

interface NavbarMenuItemProps {
  label: string;
  onClick?: () => void;
}

const NavbarMenuItem: React.FC<NavbarMenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-40 h-8 bg-neutral-300 hover:bg-neutral-400 flex items-center justify-center"
    >
      {label}
    </div>
  );
};

export default NavbarMenuItem;
