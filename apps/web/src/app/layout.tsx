import "./globals.css";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/public-chrome.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Linh Giới Online — MMORPG hành động cộng đồng 2D",
    template: "%s | Linh Giới Online"
  },
  description: "Linh Giới Online là MMORPG hành động cộng đồng 2D lấy Linh Thành làm trái tim xã hội, kết hợp chiến đấu hành động, năm Lộ Võ–Kiếm–Pháp–Cơ–Linh và câu chuyện về những cánh cổng Âm Giới.",
  openGraph: {
    title: "Linh Giới Online — Sống một đời khác trong Linh Giới",
    description: "Khám phá Linh Thành, chọn một trong năm Lộ và cùng cộng đồng đối mặt Âm Giới Xâm Lăng.",
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
