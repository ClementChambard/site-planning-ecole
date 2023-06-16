"use client";

import React, { useCallback, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface NavbarMenuProps {
  children: React.ReactNode;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((open) => {
      return !open;
    });
  }, [setOpen]);

  return (
    <div className="flex sm:hidden justify-center items-center z-20">
      <div
        onClick={toggleOpen}
        className="hover:text-neutral-500 cursor-pointer"
      >
        <RxHamburgerMenu size={20} />
      </div>
      <div
        className={`static transform transition duration-300 ${open ? "" : "scale-0"
          }`}
      >
        <div className="flex flex-col absolute right-4 top-8 rounded-md overflow-hidden gap-[1px] border-neutral-400 border-[1px] bg-neutral-400">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
