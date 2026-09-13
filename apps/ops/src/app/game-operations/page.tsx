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
  opsGameOperationFixtures
} from "../../lib/ops-fixtures";

const columns: DataTableColumn[] = [
  { key: "surface", label: "Operation surface" },
  { key: "region", label: "Region" },
  { key: "capacity", label: "Capacity" },
  { key: "state", label: "State" },
  { key: "action", label: "" }
];

const rows: DataTableRow[] = opsGameOperationFixtures.map((item) => ({
  id: item.id,
  cells: {
    surface: item.surface,
    region: item.region,
    capacity: item.capacity,
    state: <StatusBadge tone="shadow">{item.state}</StatusBadge>,
    action: <LinkButton href={`/game-operations/${item.id}`}>Inspect fixture</LinkButton>
  }
}));

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Game Operations"
      description="World/session/event operations fixture only. No real server control, event scheduler or game-state mutation."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. Game Operations also requires accepted world/session/event contracts."
    >
      <DataToolbar eyebrow="Fixture operations" title="World & event review" summary="Shared data-display UX for provisional world/session/event rows only." />
      <MetricGrid>
        <MetricCard label="Fixture surfaces" value={String(opsGameOperationFixtures.length)} detail="No world/session query API" tone="spirit" />
        <MetricCard label="Mutations" value="0" detail={NO_REAL_OPS_MUTATION} tone="shadow" />
      </MetricGrid>
      <DataTable caption="Fixture game operations rows" columns={columns} rows={rows} />
      <PaginationBar label="Fixture page 1 / 1" />
    </ProvisionalFeatureShell>
  );
}
