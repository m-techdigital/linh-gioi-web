import "@lgo-web/design-tokens/tokens.css";
import "@lgo-web/ui/shell.css";
import "@lgo-web/ui/forms.css";
import "@lgo-web/ui/data.css";
import "@lgo-web/ui/progress.css";
import "./globals.css";
import { WorkspaceAppShell, type WorkspaceShellNavItem } from "@lgo-web/ui";
import type { ReactNode } from "react";

export const metadata = {
  title: "LGO Ops/Admin Shell",
  description: "Visual-only internal ops/admin shell. No RBAC, audit or real ops/admin mutation claimed."
};

const navItems: WorkspaceShellNavItem[] = [
  { href: "/", label: "Tổng quan" },
  { href: "/control-center", label: "Control" },
  { href: "/player-operations", label: "Players" },
  { href: "/game-operations", label: "Game" },
  { href: "/content-liveops", label: "LiveOps" },
  { href: "/support", label: "Support" },
  { href: "/audit", label: "Audit", badge: "blocked" },
  { href: "/security-governance", label: "Governance", badge: "fixture" }
];

export default function OpsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <WorkspaceAppShell
          appName="Linh Giới"
          appLabel="OPS / ADMIN"
          description="Không gian vận hành nội bộ. Hiện là visual shell, chưa claim RBAC, audit trail hoặc mutation backend thật."
          navItems={navItems}
          boundaryBadge="NO_REAL_OPS_MUTATION"
          boundary="RBAC / audit / security / API canonical contract chưa được chấp nhận; thao tác hiện tại chỉ là visual fixture."
          designTarget={{
            label: "Ops/Admin design target",
            href: "/design-reference/design-atlas-ops-v195.png",
            scope: "Ops/Admin",
            companionTargets: [{ label: "Component/state design target", href: "/design-reference/design-atlas-components-v195.png" }]
          }}
        >
          {children}
        </WorkspaceAppShell>
      </body>
    </html>
  );
}
