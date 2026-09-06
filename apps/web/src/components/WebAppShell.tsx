import type { ReactNode } from "react";
import { PublicSiteShell } from "./PublicSiteShell";

export function WebAppShell({ children }: { children: ReactNode }) {
  return <PublicSiteShell>{children}</PublicSiteShell>;
}
