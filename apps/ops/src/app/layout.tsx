import "@lgo-web/design-tokens/tokens.css";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LGO Ops/Admin Shell",
  description: "Visual-only internal ops/admin shell. No RBAC, audit or real ops/admin mutation claimed."
};

export default function OpsLayout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
