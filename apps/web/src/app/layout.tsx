import "./globals.css";
import "@lgo-web/ui/public-chrome.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { metadataForRoute, publicMetadataBase } from "../lib/public-metadata";

const homeMetadata = metadataForRoute("/");
export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: publicMetadataBase,
  title: {
    default: "Linh Giới Online — MMORPG hành động cộng đồng 2D",
    template: "%s | Linh Giới Online"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
