import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Linh Giới Online — 2D Social Action MMORPG",
    template: "%s | Linh Giới Online"
  },
  description: "Linh Giới Online là 2D Side-Scrolling Social Action MMORPG lấy Linh Thành làm trái tim xã hội, kết hợp action combat, năm Lộ Võ–Kiếm–Pháp–Cơ–Linh và câu chuyện về những cánh cổng Âm Giới.",
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
