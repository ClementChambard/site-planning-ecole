import { ReactNode } from "react";

export const metadata = {
  title: "Admin panel",
};

// TODO: auth
export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
