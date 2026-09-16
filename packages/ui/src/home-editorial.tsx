import type { ReactNode } from "react";
import { ArtWordmark } from "./art-wordmark";

export type EditorialPreviewCardProps = {
  title: string; href: string; dateTime: string; dateLabel: string; category: string; summary: string;
  image: { src: string; width: number; height: number };
};

export function EditorialPreviewCard({ title, href, dateTime, dateLabel, category, summary, image }: EditorialPreviewCardProps) {
  return <article className="lgo-editorial-preview-card">
    <img {...image} alt="" loading="lazy"/>
    <div className="lgo-editorial-preview-copy">
      <div className="lgo-editorial-preview-meta"><span>{category}</span><time dateTime={dateTime}>{dateLabel}</time></div>
      <h3><a href={href}>{title}</a></h3>
      <details><summary>Đọc tóm tắt</summary><p>{summary}</p></details>
    </div>
  </article>;
}

export type MarketingFooterProps = {
  brandSrc: string; brandWidth: number; brandHeight: number; brandLabel: string; tagline: string;
  status: string; statusHref: string; statusActionLabel?: string;
  links: readonly { href: string; label: string }[];
  fallback?: ReactNode;
};

export function MarketingFooter({ brandSrc, brandWidth, brandHeight, brandLabel, tagline, status, statusHref, statusActionLabel = "Xem trạng thái chơi", links, fallback = brandLabel }: MarketingFooterProps) {
  return <footer className="lgo-marketing-footer">
    <div className="lgo-container lgo-marketing-footer-inner">
      <div className="lgo-marketing-footer-brand">
        <ArtWordmark src={brandSrc} width={brandWidth} height={brandHeight} label={brandLabel} fallback={fallback}/>
        <p>{tagline}</p>
      </div>
      <nav className="lgo-marketing-footer-links" aria-label="Liên kết cuối trang">{links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
      <div className="lgo-marketing-footer-status"><span>{status}</span><a href={statusHref}>{statusActionLabel}</a></div>
    </div>
  </footer>;
}
