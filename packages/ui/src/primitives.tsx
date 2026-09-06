import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type Tone = "spirit" | "gold" | "jade" | "shadow" | "neutral";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone };
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: Tone };
export type NavItem = { href: string; label: string; blocked?: boolean };

function toneClass(tone: Tone = "spirit") {
  return `lgo-tone-${tone}`;
}

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function LgoThemeProvider({ children }: { children: ReactNode }) {
  return <div className="lgo-theme-root">{children}</div>;
}

export function SpiritButton({ tone = "spirit", className, ...props }: ButtonProps) {
  return <button {...props} className={cx("lgo-button", toneClass(tone), className)} />;
}

export function LinkButton({ tone = "spirit", className, ...props }: LinkButtonProps) {
  return <a {...props} className={cx("lgo-link-button", toneClass(tone), className)} />;
}

export function SpiritPanel({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section {...props} className={cx("lgo-panel lgo-spirit-panel", className)} />;
}

export function GameCard({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article {...props} className={cx("lgo-card", className)} />;
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="lgo-section-heading">
      {eyebrow ? <p className="lgo-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

export function StatusBadge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={cx("lgo-status-badge", toneClass(tone))}>{children}</span>;
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("lgo-container", className)} />;
}

export function Stack({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("lgo-stack", className)} />;
}

export function Grid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("lgo-grid", className)} />;
}

export function SiteNavigation({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Linh Giới Online public navigation" className="lgo-nav">
      {items.map((item) => (
        <a key={item.href} href={item.href} aria-disabled={item.blocked ? "true" : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function SiteFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className="lgo-footer">
      <p>Linh Giới Online — independent web program. Backend integration is contract-blocked.</p>
      {children}
    </footer>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return <div className="lgo-state"><strong>{title}</strong>{children ? <p>{children}</p> : null}</div>;
}

export function LoadingState({ label = "Đang tải" }: { label?: string }) {
  return <div className="lgo-state" aria-live="polite">{label}</div>;
}

export function ErrorState({ title = "Không thể tải dữ liệu", children }: { title?: string; children?: ReactNode }) {
  return <div className="lgo-state lgo-state-error" role="alert"><strong>{title}</strong>{children ? <p>{children}</p> : null}</div>;
}
