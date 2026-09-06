import { SiteNavigation, type NavItem } from "@lgo-web/ui";

export const publicNavigationItems: NavItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/start", label: "Bắt đầu" },
  { href: "/accessibility", label: "Dễ đọc" },
  { href: "/performance", label: "Hiệu năng" },
  { href: "/journey", label: "Journey" },
  { href: "/release", label: "Release" },
  { href: "/release/readiness", label: "Readiness" },
  { href: "/release/tester-pack", label: "Tester pack" },
  { href: "/game", label: "Thế giới" },
  { href: "/game/loop", label: "World loop" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/news", label: "Tin tức" },
  { href: "/events", label: "Sự kiện" },
  { href: "/community", label: "Cộng đồng" },
  { href: "/community/onboarding", label: "Onboarding" },
  { href: "/guides", label: "Hướng dẫn" },
  { href: "/patch-notes", label: "Patch notes" },
  { href: "/download", label: "Tải game" },
  { href: "/support", label: "Hỗ trợ" },
  { href: "/support/help", label: "FAQ help" },
  { href: "/support/safety", label: "Safety" }
];

export function PublicNavigation() {
  return <SiteNavigation items={publicNavigationItems} />;
}
