import { ProvisionalFeatureShell } from "@lgo-web/ui";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge="PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION"
      title="Trust & Safety"
      description="Visual-only ops/admin shell. NOT_CANONICAL_BACKEND_CONTRACT. No real mutation endpoints, no database mutation, no real permission model."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    />
  );
}
