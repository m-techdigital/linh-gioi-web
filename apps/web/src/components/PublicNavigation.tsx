import { RouteAwareLink } from "@lgo-web/ui";

const primaryItems = [
  { href: "/game", label: "Thế giới" },
  { href: "/classes", label: "Năm Lộ" },
  { href: "/story", label: "Cốt truyện" },
  { href: "/journey", label: "Hành trình" },
  { href: "/guides", label: "Hướng dẫn" },
  { href: "/news", label: "Tin tức" },
  { href: "/community", label: "Cộng đồng" }
];

export function PublicNavigation() {
  return (
    <nav className="lgo-brand-nav" aria-label="Linh Giới Online public navigation" tabIndex={0}>
      <a className="lgo-brand-mark" href="/" aria-label="Linh Giới Online — Trang chủ">
        <span className="lgo-brand-sigil" aria-hidden="true">界</span>
        <span><strong>Linh Giới</strong><small>ONLINE</small></span>
      </a>
      <div className="lgo-brand-links" role="region" aria-label="Public primary route links" tabIndex={0}>
        {primaryItems.map((item) => <RouteAwareLink href={item.href} currentWhen="section" key={item.href}>{item.label}</RouteAwareLink>)}
      </div>
      <RouteAwareLink className="lgo-nav-play" href="/download" currentWhen="section">Trạng thái chơi</RouteAwareLink>
    </nav>
  );
}
