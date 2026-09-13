import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { WorkspaceNavigation } from "./workspace-navigation";
import type { WorkspaceShellNavItem } from "./workspace-navigation";

export type Tone = "spirit" | "gold" | "jade" | "shadow" | "neutral";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone };
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: Tone };
export type NavItem = { href: string; label: string; blocked?: boolean };
export type ExperienceHeroAction = { href: string; label: string; tone?: Tone };


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

export function BlockedActionButton({
  tone = "spirit",
  className,
  children,
  reason = "NO_ACCEPTED_BACKEND_CONTRACT — action is blocked until the canonical backend contract is accepted.",
  id,
  ...props
}: ButtonProps & { reason?: ReactNode }) {
  const helpId = `${id ?? "lgo"}-blocked-action`;
  return (
    <span className="lgo-blocked-action">
      <button
        {...props}
        id={id}
        type={props.type ?? "button"}
        aria-disabled="true"
        data-disabled="true"
        aria-describedby={helpId}
        className={cx("lgo-button", toneClass(tone), className)}
      >
        {children}
      </button>
      <small id={helpId} className="lgo-blocked-action-help">{reason}</small>
    </span>
  );
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




export function VisualProofGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("lgo-visual-proof-grid", className)} />;
}

export function VisualProofCard({
  eyebrow,
  title,
  description,
  media,
  meta,
  className
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  media: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cx("lgo-visual-proof-card", className)}>
      <div className="lgo-visual-proof-media">{media}</div>
      <div className="lgo-visual-proof-copy">
        <span className="lgo-card-kicker">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        {meta ? <div className="lgo-visual-proof-meta">{meta}</div> : null}
      </div>
    </article>
  );
}

export function MediaFrame({
  eyebrow,
  title,
  description,
  action,
  media,
  meta,
  className
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  action?: ExperienceHeroAction;
  media: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cx("lgo-media-frame", className)}>
      <div className="lgo-media-frame-visual">{media}</div>
      <div className="lgo-media-frame-copy">
        <span className="lgo-card-kicker">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        {meta ? <div className="lgo-media-frame-meta">{meta}</div> : null}
        {action ? (
          <LinkButton href={action.href} {...(action.tone ? { tone: action.tone } : {})}>
            {action.label}
          </LinkButton>
        ) : null}
      </div>
    </article>
  );
}

export function ExperienceHero({
  badge,
  badgeTone = "spirit",
  kicker,
  title,
  lead,
  actions = [],
  className,
  copyClassName,
  detail,
  visual
}: {
  badge: string;
  badgeTone?: Tone;
  kicker: string;
  title: string;
  lead: ReactNode;
  actions?: ExperienceHeroAction[];
  className?: string;
  copyClassName?: string;
  detail?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className={cx(className, "lgo-experience-hero")}>
      <div className={copyClassName}>
        <StatusBadge tone={badgeTone}>{badge}</StatusBadge>
        <p className="lgo-hero-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lgo-hero-lead">{lead}</p>
        {detail}
        {actions.length ? (
          <div className="lgo-hero-actions">
            {actions.map((action) => (
              <LinkButton href={action.href} {...(action.tone ? { tone: action.tone } : {})} key={`${action.href}:${action.label}`}>
                {action.label}
              </LinkButton>
            ))}
          </div>
        ) : null}
      </div>
      {visual}
    </section>
  );
}


export type PageAction = ExperienceHeroAction;

export function PageHeader({
  badge,
  badgeTone = "shadow",
  eyebrow,
  title,
  description,
  actions = []
}: {
  badge?: string;
  badgeTone?: Tone;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: PageAction[];
}) {
  return (
    <header className="lgo-page-header">
      <div className="lgo-page-header-copy">
        {badge ? <StatusBadge tone={badgeTone}>{badge}</StatusBadge> : null}
        {eyebrow ? <p className="lgo-eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="lgo-page-header-lead">{description}</p> : null}
      </div>
      {actions.length ? (
        <div className="lgo-page-header-actions">
          {actions.map((action) => (
            <LinkButton href={action.href} {...(action.tone ? { tone: action.tone } : {})} key={`${action.href}:${action.label}`}>
              {action.label}
            </LinkButton>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export function BoundaryBanner({
  badge,
  badgeTone = "shadow",
  children,
  ariaLabel = "Environment boundary",
  className
}: {
  badge: string;
  badgeTone?: Tone;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <aside className={cx("lgo-boundary-banner", className)} aria-label={ariaLabel}>
      <StatusBadge tone={badgeTone}>{badge}</StatusBadge>
      <div className="lgo-boundary-banner-copy">{children}</div>
    </aside>
  );
}

export function DataList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} role="list" className={cx("lgo-data-list", className)} />;
}

export function DataListItem({
  title,
  description,
  meta,
  trailing,
  className
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <article role="listitem" className={cx("lgo-data-list-item", className)}>
      <div className="lgo-data-list-copy">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
        {meta ? <div className="lgo-data-list-meta">{meta}</div> : null}
      </div>
      {trailing ? <div className="lgo-data-list-trailing">{trailing}</div> : null}
    </article>
  );
}

export function PageStateGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("lgo-page-state-group", className)}>{children}</div>;
}

export function WorkspacePage({
  mainClassName,
  badge,
  badgeTone = "shadow",
  eyebrow,
  title,
  description,
  actions = [],
  boundary,
  boundaryBadge,
  children
}: {
  mainClassName?: string;
  badge?: string;
  badgeTone?: Tone;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: PageAction[];
  boundary?: ReactNode;
  boundaryBadge?: string;
  children?: ReactNode;
}) {
  return (
    <main className={cx("lgo-workspace-page", mainClassName)}>
      <Stack>
        <PageHeader
          title={title}
          {...(badge ? { badge } : {})}
          {...(badgeTone ? { badgeTone } : {})}
          {...(eyebrow ? { eyebrow } : {})}
          {...(description ? { description } : {})}
          {...(actions.length ? { actions } : {})}
        />
        {boundary && boundaryBadge ? <BoundaryBanner badge={boundaryBadge}>{boundary}</BoundaryBanner> : null}
        {children}
      </Stack>
    </main>
  );
}

export function ProvisionalFeatureShell({
  mainClassName,
  badge,
  title,
  description,
  boundary,
  badgeTone = "shadow",
  children
}: {
  mainClassName: string;
  badge: string;
  title: string;
  description: ReactNode;
  boundary: ReactNode;
  badgeTone?: Tone;
  children?: ReactNode;
}) {
  return (
    <WorkspacePage
      mainClassName={mainClassName}
      badge={badge}
      badgeTone={badgeTone}
      title={title}
      description={description}
      boundaryBadge="Contract boundary"
      boundary={boundary}
    >
      {children}
    </WorkspacePage>
  );
}


export function WorkspaceBoundaryNotice({ badge, children }: { badge: string; children: ReactNode }) {
  return <BoundaryBanner badge={badge}>{children}</BoundaryBanner>;
}

export function WorkspaceAppShell({
  appName,
  appLabel,
  description,
  navItems,
  boundaryBadge,
  boundary,
  children,
  homeHref = "/"
}: {
  appName: string;
  appLabel: string;
  description: ReactNode;
  navItems: WorkspaceShellNavItem[];
  boundaryBadge: string;
  boundary: ReactNode;
  children: ReactNode;
  homeHref?: string;
}) {
  return (
    <LgoThemeProvider>
      <div className="lgo-workspace-shell">
        <a className="lgo-workspace-skip" href="#workspace-content">Bỏ qua điều hướng tới nội dung chính</a>
        <header className="lgo-workspace-header">
          <Container className="lgo-workspace-header-inner">
            <a className="lgo-workspace-brand" href={homeHref} aria-label={`${appName} — Trang chủ`}>
              <span className="lgo-workspace-brand-sigil" aria-hidden="true">界</span>
              <span><strong>{appName}</strong><small>{appLabel}</small></span>
            </a>
            <WorkspaceNavigation items={navItems} ariaLabel={`${appName} navigation`} />
          </Container>
        </header>
        <Container className="lgo-workspace-boundary-wrap">
          <WorkspaceBoundaryNotice badge={boundaryBadge}>{boundary}</WorkspaceBoundaryNotice>
        </Container>
        <div id="workspace-content" className="lgo-workspace-content" tabIndex={-1}>
          <Container>{children}</Container>
        </div>
        <footer className="lgo-workspace-footer">
          <Container>
            <strong>{appName}</strong>
            <p>{description}</p>
          </Container>
        </footer>
      </div>
    </LgoThemeProvider>
  );
}

export function SiteNavigation({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Linh Giới Online public navigation" className="lgo-nav" tabIndex={0}>
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
