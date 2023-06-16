"use client";

import { useRouter } from "next/navigation";
import NavbarItem from "./NavbarItem";
import NavbarMenu from "./NavbarMenu";
import NavbarMenuItem from "./NavbarMenuItem";
import useAdminPasswordModal from "@/app/hooks/useAdminPasswordModal";

const Navbar = () => {
  const router = useRouter();
  const adminPasswordModal = useAdminPasswordModal();
  return (
    <div className="w-full bg-neutral-200 text-neutral-700 flex flex-row justify-between items-center px-4 md:px-8 border-b-neutral-700 border-b py-2 md:py-3">
      <div className="flex flex-row items-center gap-4">
        <div className="hidden sm:block w-8 h-8 md:w-10 md:h-10 rounded-full bg-white"></div>
        <div
          className="text-lg md:text-2xl cursor-pointer hover:text-neutral-600"
          onClick={() => router.push("/")}
        >
          Site de Mme Chambard
        </div>
      </div>
      <div className="flex-row items-center gap-6 lg:gap-8 hidden sm:flex text-lg md:text-xl">
        <NavbarItem label="Admin" onClick={adminPasswordModal.onOpen} />
        {/*        <NavbarItem label="Option 2" />  */}
        {/*        <NavbarItem label="Option 3" />  */}
        {/*        <NavbarItem label="Option 4" />  */}
      </div>
      <NavbarMenu>
        <NavbarMenuItem label="Admin" onClick={adminPasswordModal.onOpen} />
        {/*        <NavbarMenuItem label="Option 2" /> */}
        {/*        <NavbarMenuItem label="Option 3" /> */}
        {/*        <NavbarMenuItem label="Option 4" /> */}
      </NavbarMenu>
    </div>
  );
};

export default Navbar;
