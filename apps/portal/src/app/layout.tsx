import "@lgo-web/design-tokens/tokens.css";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "LGO Player Portal Shell",
  description: "Fixture-only Player Portal shell. No production auth, DB persistence or real portal integration claimed."
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
