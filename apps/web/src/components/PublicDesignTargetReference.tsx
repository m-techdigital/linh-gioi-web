"use client";

import { DesignTargetReference } from "@lgo-web/ui";
import { usePathname } from "next/navigation";

const PUBLIC_HOMEPAGE_TARGET = {
  label: "Homepage detailed design target",
  href: "/design-reference/homepage-detailed-design-target-v1118.png",
  scope: "Public Homepage"
};

const PUBLIC_CORE_TARGET = {
  label: "Public Core design target",
  href: "/design-reference/design-atlas-public-core-v195.png",
  scope: "Public Core"
};

const PUBLIC_SERVICE_TARGET = {
  label: "Public Service design target",
  href: "/design-reference/design-atlas-public-service-v195.png",
  scope: "Public Service"
};

const COMPONENT_STATE_TARGET = { label: "Component/state design target", href: "/design-reference/design-atlas-components-v195.png" };

const publicCorePrefixes = ["/game", "/classes", "/story", "/journey", "/start", "/guides", "/news", "/events", "/patch-notes"];
const publicServicePrefixes = ["/download", "/release", "/status", "/support", "/community", "/performance", "/accessibility", "/roadmap"];

function targetForPath(pathname: string) {
  if (pathname === "/") return PUBLIC_HOMEPAGE_TARGET;
  if (publicServicePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return PUBLIC_SERVICE_TARGET;
  if (publicCorePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return PUBLIC_CORE_TARGET;
  return PUBLIC_CORE_TARGET;
}

export function PublicDesignTargetReference() {
  const pathname = usePathname() ?? "/";
  const target = targetForPath(pathname);

  return (
    <DesignTargetReference
      {...target}
      note={<>Base UI/UX Layout · đối chiếu page này với atlas đã đăng ký trước khi sửa UI.</>}
      companionTargets={[COMPONENT_STATE_TARGET]}
    />
  );
}
