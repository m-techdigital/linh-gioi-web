import { ArtWordmark, RouteAwareLink } from "@lgo-web/ui";

const publicItems = [
  { href: "/game", label: "Thế giới" },
  { href: "/classes", label: "Lộ phái" },
  { href: "/game/loop", label: "Tính năng" },
  { href: "/community", label: "Cộng đồng" },
  { href: "/news", label: "Tin tức" }
];

export function PublicNavigation() {
  return (
    <nav className="lgo-brand-nav" aria-label="Điều hướng công khai Linh Giới Online" tabIndex={0}>
      <a className="lgo-brand-mark" href="/" aria-label="Linh Giới Online — Trang chủ">
        <span className="lgo-nav-sigil-art" aria-hidden="true">
          <img src="/game-art/marketing/header-sigil.png" width={42} height={42} alt=""/>
        </span>
        <span className="lgo-nav-brand-art" aria-hidden="true">
          <ArtWordmark src="/game-art/marketing/wordmark-brush.png" width={422} height={169} label="Linh Giới Online"
            fallback={<><span>Linh Giới</span><small>ONLINE</small></>}/>
        </span>
      </a>
      <div className="lgo-brand-links" role="region" aria-label="Liên kết điều hướng chính" tabIndex={0}>
        <RouteAwareLink href="/" currentWhen="exact" revealOnFocus>Trang chủ</RouteAwareLink>
        {publicItems.map((item) => <RouteAwareLink href={item.href} currentWhen="section" revealOnFocus key={item.href}>{item.label}</RouteAwareLink>)}
      </div>
      <RouteAwareLink className="lgo-nav-play" href="/download" currentWhen="section">Trạng thái chơi</RouteAwareLink>
    </nav>
  );
}
