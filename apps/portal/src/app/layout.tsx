import "@lgo-web/design-tokens/tokens.css";
import "@lgo-web/ui/shell.css";
import "@lgo-web/ui/forms.css";
import "@lgo-web/ui/data.css";
import "./globals.css";
import { WorkspaceAppShell, type WorkspaceShellNavItem } from "@lgo-web/ui";
import type { ReactNode } from "react";

export const metadata = {
  title: "LGO Player Portal Shell",
  description: "Fixture-only Player Portal shell. No production auth, DB persistence or real portal integration claimed."
};

const navItems: WorkspaceShellNavItem[] = [
  { href: "/", label: "Tổng quan" },
  { href: "/account", label: "Tài khoản" },
  { href: "/characters", label: "Nhân vật" },
  { href: "/support", label: "Hỗ trợ" },
  { href: "/login", label: "Đăng nhập", badge: "fixture" }
];

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <WorkspaceAppShell
          appName="Linh Giới"
          appLabel="PLAYER PORTAL"
          description="Không gian tài khoản và nhân vật của người chơi. Hiện là fixture UX, chưa claim production auth hoặc database persistence."
          navItems={navItems}
          boundaryBadge="PROVISIONAL_WEB_FIXTURE"
          boundary="Auth / DB / API canonical contract chưa được chấp nhận; mọi trạng thái hiện tại chỉ là UX fixture."
        >
          {children}
        </WorkspaceAppShell>
      </body>
    </html>
  );
}
