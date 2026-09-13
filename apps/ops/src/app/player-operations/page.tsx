import { DataTable, DataToolbar, LinkButton, MetricCard, MetricGrid, PaginationBar, ProvisionalFeatureShell, StatusBadge, type DataTableColumn, type DataTableRow } from "@lgo-web/ui";
import { NO_REAL_OPS_MUTATION, NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, opsPlayerFixtures } from "../../lib/ops-fixtures";

const columns: DataTableColumn[] = [
  { key: "player", label: "Player fixture" },
  { key: "surface", label: "Review surface" },
  { key: "state", label: "Contract state" },
  { key: "action", label: "" }
];

const rows: DataTableRow[] = opsPlayerFixtures.map((player) => ({
  id: player.id,
  cells: {
    player: player.displayName,
    surface: player.surface,
    state: <StatusBadge tone="shadow">{NOT_CANONICAL_BACKEND_CONTRACT}</StatusBadge>,
    action: <LinkButton href={`/player-operations/${player.id}`}>Review fixture</LinkButton>
  }
}));

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION}`}
      title="Player Operations"
      description="Visual-only ops/admin review journey. NOT_CANONICAL_BACKEND_CONTRACT. No real mutation endpoints, database mutation or permission model."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <DataToolbar eyebrow="Fixture operations view" title="Player review queue — presentation only" summary="Shared table/metric/pagination UX without player DTOs, account queries or moderation actions." />
      <MetricGrid>
        <MetricCard label="Fixture rows" value={String(opsPlayerFixtures.length)} detail="No player query API" tone="spirit" />
        <MetricCard label="Mutations" value="0" detail={NO_REAL_OPS_MUTATION} tone="shadow" />
      </MetricGrid>
      <DataTable caption="Fixture player operations rows" columns={columns} rows={rows} />
      <PaginationBar label="Fixture page 1 / 1" />
    </ProvisionalFeatureShell>
  );
}
