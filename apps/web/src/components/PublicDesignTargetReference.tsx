"use client";

import { DesignTargetReference } from "@lgo-web/ui";
import { usePathname } from "next/navigation";

const PUBLIC_HOMEPAGE_TARGET = {
  label: "Thiết kế chi tiết trang chủ",
  href: "/design-reference/homepage-detailed-design-target-v1118.png",
  scope: "Public Homepage"
};

const PUBLIC_GAME_WORLD_TARGET = {
  label: "Thiết kế chi tiết thế giới",
  href: "/design-reference/game-world-detailed-design-target-v1120.png",
  scope: "Public Game World"
};

const PUBLIC_STORY_TARGET = {
  label: "Thiết kế chi tiết cốt truyện",
  href: "/design-reference/story-detailed-design-target-v1121.png",
  scope: "Public Story"
};

const PUBLIC_CLASSES_TARGET = {
  label: "Thiết kế chi tiết Năm Lộ",
  href: "/design-reference/classes-detailed-design-target-v1122.png",
  scope: "Public Classes"
};

const PUBLIC_JOURNEY_TARGET = {
  label: "Thiết kế chi tiết hành trình",
  href: "/design-reference/journey-detailed-design-target-v1123.png",
  scope: "Public Journey"
};

const PUBLIC_START_TARGET = {
  label: "Thiết kế chi tiết bắt đầu",
  href: "/design-reference/start-detailed-design-target-v1124.png",
  scope: "Public Start"
};

const PUBLIC_DOWNLOAD_TARGET = {
  label: "Thiết kế chi tiết tải game",
  href: "/design-reference/download-detailed-design-target-v1125.png",
  scope: "Public Download"
};

const PUBLIC_DOWNLOAD_TRUST_TARGET = {
  label: "Thiết kế chi tiết tin cậy tải game",
  href: "/design-reference/download-trust-detailed-design-target-v1126.png",
  scope: "Public Download Trust"
};

const PUBLIC_RELEASE_TARGET = {
  label: "Thiết kế chi tiết phát hành",
  href: "/design-reference/release-detailed-design-target-v1127.png",
  scope: "Public Release"
};

const PUBLIC_RELEASE_READINESS_TARGET = {
  label: "Thiết kế chi tiết sẵn sàng phát hành",
  href: "/design-reference/release-readiness-detailed-design-target-v1128.png",
  scope: "Public Release Readiness"
};

const PUBLIC_TESTER_PACK_TARGET = {
  label: "Thiết kế chi tiết gói tester",
  href: "/design-reference/tester-pack-detailed-design-target-v1129.png",
  scope: "Gói tester công khai"
};

const PUBLIC_STATUS_TARGET = {
  label: "Thiết kế chi tiết trạng thái",
  href: "/design-reference/status-detailed-design-target-v1130.png",
  scope: "Trạng thái công khai"
};

const PUBLIC_SUPPORT_TARGET = {
  label: "Thiết kế chi tiết hỗ trợ",
  href: "/design-reference/support-detailed-design-target-v1131.png",
  scope: "Hỗ trợ cộng đồng"
};

const PUBLIC_SUPPORT_HELP_TARGET = {
  label: "Thiết kế chi tiết trung tâm trợ giúp",
  href: "/design-reference/support-help-detailed-design-target-v1132.png",
  scope: "Trung tâm trợ giúp"
};

const PUBLIC_SUPPORT_SAFETY_TARGET = {
  label: "Thiết kế chi tiết hỗ trợ an toàn",
  href: "/design-reference/support-safety-detailed-design-target-v1133.png",
  scope: "Hỗ trợ an toàn"
};

const PUBLIC_COMMUNITY_TARGET = {
  label: "Thiết kế chi tiết cộng đồng",
  href: "/design-reference/community-detailed-design-target-v1149.png",
  scope: "Cộng đồng Linh Giới"
};

const PUBLIC_CORE_TARGET = {
  label: "Public Core design target",
  href: "/design-reference/design-atlas-public-core-v195.png",
  scope: "Public Core"
};

const PUBLIC_PERFORMANCE_TARGET = {
  label: "Thiết kế hiệu năng và khả năng đọc",
  href: "/design-reference/design-atlas-public-service-v195.png",
  scope: "Hiệu năng · Họ giao diện dịch vụ công khai"
};

const PUBLIC_ACCESSIBILITY_TARGET = {
  label: "Thiết kế cách đọc và thao tác",
  href: "/design-reference/design-atlas-public-service-v195.png",
  scope: "Dễ đọc · Họ giao diện dịch vụ công khai"
};

const PUBLIC_SERVICE_TARGET = {
  label: "Public Service design target",
  href: "/design-reference/design-atlas-public-service-v195.png",
  scope: "Public Service"
};

const COMPONENT_STATE_TARGET = { label: "Thiết kế component/trạng thái", href: "/design-reference/design-atlas-components-v195.png" };

const publicCorePrefixes = ["/game", "/classes", "/story", "/journey", "/start", "/guides", "/news", "/events", "/patch-notes"];
const publicServicePrefixes = ["/download", "/release", "/status", "/support", "/community", "/performance", "/accessibility", "/roadmap"];

function targetForPath(pathname: string) {
  if (pathname === "/guides/gate-entry-guide") return { ...PUBLIC_CORE_TARGET, label: "Bố cục cẩm nang Cổng Linh", scope: "Cổng Linh · Bài hướng dẫn, không phải bản đồ live" };
  if (pathname === "/guides/beginner") return { ...PUBLIC_CORE_TARGET, label: "Bố cục cẩm nang nhập môn", scope: "Người mới · Bốn bước đọc, không phải nhiệm vụ" };
  if (pathname === "/guides") return { ...PUBLIC_CORE_TARGET, label: "Bố cục thư viện và hành trình đọc", scope: "Cẩm nang · Bài đã công bố, không phải wiki trực tuyến" };
  if (pathname === "/guides/world-gameplay-loop-guide") return { ...PUBLIC_CORE_TARGET, label: "Bố cục cẩm nang và hành trình đọc", scope: "Cẩm nang vòng lặp · Nội dung biên soạn, không phải gameplay live" };
  if (pathname === "/roadmap") return { ...PUBLIC_SERVICE_TARGET, label: "Bố cục điều kiện và lộ trình", scope: "Roadmap · Kế hoạch không phải lịch phát hành" };
  if (pathname === "/accessibility") return PUBLIC_ACCESSIBILITY_TARGET;
  if (pathname === "/performance") return PUBLIC_PERFORMANCE_TARGET;
  if (pathname === "/") return PUBLIC_HOMEPAGE_TARGET;
  if (pathname === "/game") return PUBLIC_GAME_WORLD_TARGET;
  if (pathname === "/game/loop") return { ...PUBLIC_GAME_WORLD_TARGET, label: "Bố cục thế giới và hành trình đọc", scope: "Vòng lặp thế giới · Hướng dẫn, không phải gameplay live" };
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
  if (pathname === "/support/help") return PUBLIC_SUPPORT_HELP_TARGET;
  if (pathname === "/support/safety") return PUBLIC_SUPPORT_SAFETY_TARGET;
  if (pathname === "/support") return PUBLIC_SUPPORT_TARGET;
  // Onboarding uses the accepted Vietnamese community composition, not the old M1 combat diagram.
  if (pathname === "/community/onboarding") return { ...PUBLIC_COMMUNITY_TARGET, label: "Bố cục hòa nhập cộng đồng", scope: "Hòa nhập cộng đồng · Ba bước đọc, không đăng ký" };
  if (pathname === "/community") return PUBLIC_COMMUNITY_TARGET;
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
