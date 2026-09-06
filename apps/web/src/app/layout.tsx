import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Linh Giới Online",
    template: "%s | Linh Giới Online"
  },
  description: "Official public website source for Linh Giới Online. Public RC source only; no production auth, DB, CMS or backend integration claim.",
  openGraph: {
    title: "Linh Giới Online",
    description: "Vietnamese spiritual fantasy online RPG web source.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
