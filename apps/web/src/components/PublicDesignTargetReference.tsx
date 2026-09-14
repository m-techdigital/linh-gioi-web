"use client";

import { DesignTargetReference } from "@lgo-web/ui";
import { usePathname } from "next/navigation";

const PUBLIC_HOMEPAGE_TARGET = {
  label: "Homepage detailed design target",
  href: "/design-reference/homepage-detailed-design-target-v1118.png",
  scope: "Public Homepage"
};

const PUBLIC_GAME_WORLD_TARGET = {
  label: "Game world detailed design target",
  href: "/design-reference/game-world-detailed-design-target-v1120.png",
  scope: "Public Game World"
};

const PUBLIC_STORY_TARGET = {
  label: "Story detailed design target",
  href: "/design-reference/story-detailed-design-target-v1121.png",
  scope: "Public Story"
};

const PUBLIC_CLASSES_TARGET = {
  label: "Classes detailed design target",
  href: "/design-reference/classes-detailed-design-target-v1122.png",
  scope: "Public Classes"
};

const PUBLIC_JOURNEY_TARGET = {
  label: "Journey detailed design target",
  href: "/design-reference/journey-detailed-design-target-v1123.png",
  scope: "Public Journey"
};

const PUBLIC_START_TARGET = {
  label: "Start detailed design target",
  href: "/design-reference/start-detailed-design-target-v1124.png",
  scope: "Public Start"
};

const PUBLIC_DOWNLOAD_TARGET = {
  label: "Download detailed design target",
  href: "/design-reference/download-detailed-design-target-v1125.png",
  scope: "Public Download"
};

const PUBLIC_DOWNLOAD_TRUST_TARGET = {
  label: "Download trust detailed design target",
  href: "/design-reference/download-trust-detailed-design-target-v1126.png",
  scope: "Public Download Trust"
};

const PUBLIC_RELEASE_TARGET = {
  label: "Release detailed design target",
  href: "/design-reference/release-detailed-design-target-v1127.png",
  scope: "Public Release"
};

const PUBLIC_RELEASE_READINESS_TARGET = {
  label: "Release readiness detailed design target",
  href: "/design-reference/release-readiness-detailed-design-target-v1128.png",
  scope: "Public Release Readiness"
};

const PUBLIC_TESTER_PACK_TARGET = {
  label: "Tester pack detailed design target",
  href: "/design-reference/tester-pack-detailed-design-target-v1129.png",
  scope: "Public Tester Pack"
};

const PUBLIC_STATUS_TARGET = {
  label: "Status detailed design target",
  href: "/design-reference/status-detailed-design-target-v1130.png",
  scope: "Public Status"
};

const PUBLIC_SUPPORT_TARGET = {
  label: "Support detailed design target",
  href: "/design-reference/support-detailed-design-target-v1131.png",
  scope: "Public Support"
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
  if (pathname === "/game") return PUBLIC_GAME_WORLD_TARGET;
  if (pathname === "/story") return PUBLIC_STORY_TARGET;
  if (pathname === "/classes") return PUBLIC_CLASSES_TARGET;
  if (pathname === "/journey") return PUBLIC_JOURNEY_TARGET;
  if (pathname === "/start") return PUBLIC_START_TARGET;
  if (pathname === "/download/trust") return PUBLIC_DOWNLOAD_TRUST_TARGET;
  if (pathname === "/download") return PUBLIC_DOWNLOAD_TARGET;
  if (pathname === "/release/readiness") return PUBLIC_RELEASE_READINESS_TARGET;
  if (pathname === "/release/tester-pack") return PUBLIC_TESTER_PACK_TARGET;
  if (pathname === "/release") return PUBLIC_RELEASE_TARGET;
  if (pathname === "/status") return PUBLIC_STATUS_TARGET;
  if (pathname === "/support") return PUBLIC_SUPPORT_TARGET;
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
