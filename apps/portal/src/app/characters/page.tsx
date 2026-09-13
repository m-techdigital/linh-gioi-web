import { DataTable, DataToolbar, LinkButton, MetricCard, MetricGrid, PaginationBar, ProvisionalFeatureShell, StatusBadge, type DataTableColumn, type DataTableRow } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, portalCharacterFixtures } from "../../lib/portal-fixtures";

const columns: DataTableColumn[] = [
  { key: "name", label: "Nhân vật" },
  { key: "path", label: "Lộ" },
  { key: "level", label: "Tiến trình" },
  { key: "zone", label: "Khu vực" },
  { key: "state", label: "Trạng thái" },
  { key: "action", label: "" }
];

const rows: DataTableRow[] = portalCharacterFixtures.map((character) => ({
  id: character.id,
  cells: {
    name: character.name,
    path: character.path,
    level: character.level,
    zone: character.zone,
    state: <StatusBadge tone="neutral">{character.state}</StatusBadge>,
    action: <LinkButton href={`/characters/${character.id}`}>Chi tiết</LinkButton>
  }
}));

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Nhân vật"
      description="Character journey fixture. No real character DTO or backend contract. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <DataToolbar eyebrow="Fixture character roster" title="Những nhân vật trong hành trình" summary="Rows validate portal information architecture only; they are not saved characters and do not define a canonical character DTO." />
      <MetricGrid>
        <MetricCard label="Fixture rows" value={String(portalCharacterFixtures.length)} detail="No DB persistence" tone="spirit" />
        <MetricCard label="Backend" value="Blocked" detail="Auth/DB/API contract required" tone="shadow" />
      </MetricGrid>
      <DataTable caption="Fixture character roster" columns={columns} rows={rows} />
      <PaginationBar label="Fixture page 1 / 1" />
    </ProvisionalFeatureShell>
  );
}
