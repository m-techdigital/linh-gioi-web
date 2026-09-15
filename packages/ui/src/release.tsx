import type { ReactNode } from "react";

export type ReleaseIconName = "shield" | "document" | "users" | "lock" | "download" | "signal" | "help" | "arrow";
export type ReleaseGateState = "blocked" | "review" | "planned";
const iconPaths: Record<ReleaseIconName, ReactNode> = {
  shield: <><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>,
  document: <><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h4M9 12h6M9 16h6"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
  signal: <path d="M2 12h5l3-8 4 16 3-8h5"/>,
  help: <><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 13H2v6h4v-6ZM20 13h2v6h-4v-6ZM18 19c0 2-3 2-6 2"/></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>
};
export function ReleaseIcon({ name, className }: { name: ReleaseIconName; className?: string }) {
  return <svg className={className ?? "lgo-release-icon"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{iconPaths[name]}</svg>;
}

export function ReleaseSeal({ children, caption }: { children: ReactNode; caption: ReactNode }) {
  return <div className="lgo-release-seal">
    <div className="lgo-release-seal-ring" aria-hidden="true" />
    <ReleaseIcon name="lock" />
    <strong>{children}</strong>
    <span className="lgo-release-seal-divider" aria-hidden="true" />
    <small>{caption}</small>
  </div>;
}

export function ReleaseGateCard({ id, title, icon, state, stateLabel, owner, evidence, rule, boundary }: {
  id: string; title: string; icon: ReleaseIconName; state: ReleaseGateState;
  stateLabel: string; owner: string; evidence: string; rule: string; boundary: string;
}) {
  return <article id={id} className="lgo-release-gate-card" data-state={state}>
    <div className="lgo-release-gate-card-top"><ReleaseIcon name={icon} /><span className="lgo-release-state">{stateLabel}</span></div>
    <h3>{title}</h3>
    <p className="lgo-release-gate-owner">{owner}</p>
    <p className="lgo-release-gate-boundary">{boundary}</p>
    <details className="lgo-release-gate-proof">
      <summary>Bằng chứng cần có <span aria-hidden="true">+</span></summary>
      <div><p>{evidence}</p><p><strong>Trước khi mở:</strong> {rule}</p></div>
    </details>
  </article>;
}
