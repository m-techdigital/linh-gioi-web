import type { ReactNode } from "react";

export const NO_REAL_OPS_MUTATION = "NO_REAL_OPS_MUTATION" as const;
export const PROVISIONAL_WEB_FIXTURE = "PROVISIONAL_WEB_FIXTURE" as const;
export const NOT_CANONICAL_BACKEND_CONTRACT = "NOT_CANONICAL_BACKEND_CONTRACT" as const;

export function PermissionGatePlaceholder({ children }: { children: ReactNode }) {
  return <div className="lgo-ops-placeholder" data-contract="RBAC_AUDIT_SECURITY_API_BLOCKED">{children}</div>;
}

export function AuditTimelinePlaceholder() {
  return <div className="lgo-ops-placeholder">AuditTimeline placeholder — {NO_REAL_OPS_MUTATION}</div>;
}

export function DangerousActionDialogPlaceholder() {
  return <div className="lgo-ops-placeholder">DangerousActionDialog visual-only — {NO_REAL_OPS_MUTATION}</div>;
}

export function ApprovalFlowPlaceholder() {
  return <div className="lgo-ops-placeholder">ApprovalFlow visual-only — {NO_REAL_OPS_MUTATION}</div>;
}

export function Player360Placeholder() {
  return <div className="lgo-ops-placeholder">Player360 visual-only — {PROVISIONAL_WEB_FIXTURE}</div>;
}

export function RuntimeStatusPlaceholder() {
  return <div className="lgo-ops-placeholder">RuntimeStatus visual-only — {NOT_CANONICAL_BACKEND_CONTRACT}</div>;
}
