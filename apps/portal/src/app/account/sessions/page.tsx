import { DataTable, DataToolbar, PaginationBar, ProvisionalFeatureShell, StatusBadge, type DataTableColumn, type DataTableRow } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, portalSessionFixtures } from "../../../lib/portal-fixtures";

const columns: DataTableColumn[] = [
  { key: "device", label: "Thiết bị" },
  { key: "location", label: "Vị trí" },
  { key: "lastSeen", label: "Hoạt động" },
  { key: "state", label: "Trạng thái" }
];

const rows: DataTableRow[] = portalSessionFixtures.map((session) => ({
  id: session.id,
  cells: {
    device: session.device,
    location: session.location,
    lastSeen: session.lastSeen,
    state: <StatusBadge tone="neutral">{session.state}</StatusBadge>
  }
}));

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Phiên đăng nhập"
      description="Session review fixture only. No session refresh or token model. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <DataToolbar eyebrow="Fixture sessions" title="Thiết bị và phiên" summary="Presentation rows only; no real token/session lifecycle or revoke action exists." />
      <DataTable caption="Fixture account sessions" columns={columns} rows={rows} />
      <PaginationBar label="Fixture page 1 / 1" />
    </ProvisionalFeatureShell>
  );
}
