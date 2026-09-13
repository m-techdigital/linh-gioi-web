import {
  DataTable,
  DataToolbar,
  LinkButton,
  MetricCard,
  MetricGrid,
  PaginationBar,
  ProvisionalFeatureShell,
  StatusBadge,
  type DataTableColumn,
  type DataTableRow
} from "@lgo-web/ui";
import {
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsSupportQueueFixtures
} from "../../lib/ops-fixtures";

const columns: DataTableColumn[] = [
  { key: "player", label: "Player fixture" },
  { key: "category", label: "Category" },
  { key: "age", label: "Age" },
  { key: "state", label: "Triage state" },
  { key: "action", label: "" }
];

const rows: DataTableRow[] = opsSupportQueueFixtures.map((item) => ({
  id: item.id,
  cells: {
    player: item.player,
    category: item.category,
    age: item.age,
    state: <StatusBadge tone="shadow">{item.state}</StatusBadge>,
    action: <LinkButton href={`/support/${item.id}`}>Review fixture</LinkButton>
  }
}));

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Support triage"
      description="Fixture queue for operator support UX. No real ticket lookup, assignment, escalation or moderation mutation."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. Support triage also requires an accepted Support contract. No real ops/admin mutation is claimed."
    >
      <DataToolbar eyebrow="Fixture support view" title="Support review queue" summary="Shared data-display UX with provisional case rows only; no ticket service or player query is called." />
      <MetricGrid>
        <MetricCard label="Fixture cases" value={String(opsSupportQueueFixtures.length)} detail="No support query API" tone="spirit" />
        <MetricCard label="Mutations" value="0" detail={NO_REAL_OPS_MUTATION} tone="shadow" />
      </MetricGrid>
      <DataTable caption="Fixture support triage rows" columns={columns} rows={rows} />
      <PaginationBar label="Fixture page 1 / 1" />
    </ProvisionalFeatureShell>
  );
}
