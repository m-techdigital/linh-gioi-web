import {
  ApprovalFlowPlaceholder,
  AuditTimelinePlaceholder,
  DangerousActionDialogPlaceholder,
  PermissionGatePlaceholder,
  Player360Placeholder,
  RuntimeStatusPlaceholder,
  GameCard,
  Grid,
  SectionHeading,
  SpiritPanel,
  Stack,
  StatusBadge
} from "@lgo-web/ui";

const workspaces = ["Control Center", "Player Operations", "Game Operations", "Content & LiveOps", "Support", "Trust & Safety", "Security & Governance", "Audit"];

export default function OpsHomePage() {
  return (
    <main className="lgo-ops-shell">
      <Stack>
        <SpiritPanel>
          <StatusBadge tone="shadow">PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION</StatusBadge>
          <h1>Ops/Admin Shell</h1>
          <p>Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed.</p>
        </SpiritPanel>
        <SectionHeading title="Workspaces" />
        <Grid>{workspaces.map((workspace) => <GameCard key={workspace}><h3>{workspace}</h3><p>Visual-only fixture workspace. NOT_CANONICAL_BACKEND_CONTRACT.</p></GameCard>)}</Grid>
        <PermissionGatePlaceholder>RBAC/audit/security/API contract blocked.</PermissionGatePlaceholder>
        <AuditTimelinePlaceholder />
        <DangerousActionDialogPlaceholder />
        <ApprovalFlowPlaceholder />
        <Player360Placeholder />
        <RuntimeStatusPlaceholder />
      </Stack>
    </main>
  );
}
