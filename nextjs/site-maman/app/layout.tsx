import { Nunito } from "next/font/google";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import Navbar from "./components/Navbar/Navbar";
import AdminPasswordModal from "./components/modals/AdminPasswordModal";

export const metadata = {
  title: "Site de Mme Chambard",
  description: "Site pour les sondages de la classe de Mme Chambard",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <AdminPasswordModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
