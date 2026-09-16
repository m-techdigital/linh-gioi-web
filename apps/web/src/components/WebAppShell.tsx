import type { ReactNode } from "react";
import { PublicSiteShell } from "./PublicSiteShell";

export function WebAppShell({ children, variant }: { children: ReactNode; variant?: "immersive" | undefined }) {
  return <PublicSiteShell variant={variant}>{children}</PublicSiteShell>;
}
