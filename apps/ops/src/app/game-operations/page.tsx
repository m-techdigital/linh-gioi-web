import {
  DataList,
  DataListItem,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge
} from "@lgo-web/ui";
import {
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsGameOperationFixtures
} from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={PROVISIONAL_WEB_FIXTURE + " · " + NO_REAL_OPS_MUTATION + " · " + NOT_CANONICAL_BACKEND_CONTRACT}
      title="Game Operations"
      description="Read-first world/runtime workspace. Source và freshness phải tồn tại trước khi một giá trị được xem là operational state."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. Game Operations also requires accepted world/session/event contracts."
    >
      <section className="lgo-ops-source-summary" aria-labelledby="ops-game-source-heading">
        <div className="lgo-ops-source-heading">
          <div>
            <p className="lgo-card-kicker">World/runtime read model</p>
            <h2 id="ops-game-source-heading">Nguồn vận hành trước, scenario fixture sau</h2>
            <p>Không hiển thị capacity, region hoặc health giả như telemetry. “Không có dữ liệu” không đồng nghĩa “healthy”.</p>
          </div>
          <StatusBadge tone="shadow">ADM-07 blocked by domain</StatusBadge>
        </div>
        <DataList aria-label="Game Operations source readiness">
          <DataListItem
            title="World / zone / channel identity"
            description="Chờ canonical world/runtime read model và stable IDs."
            meta="Source: Game runtime · Freshness: unavailable · capability: world.read"
          />
          <DataListItem
            title="Session & telemetry freshness"
            description="Chờ runtime/session summary có timestamp và partial/stale semantics."
            meta="Source: realtime/session · Freshness: unavailable"
          />
          <DataListItem
            title="Event state"
            description="Event lifecycle thuộc Content & LiveOps, không được suy ra từ fixture world row."
            meta="Source: LiveOps domain · separate authority"
            trailing={<LinkButton href="/content-liveops" tone="neutral">Mở LiveOps boundary</LinkButton>}
          />
        </DataList>
      </section>

      <section className="lgo-ops-readmodel-section" aria-labelledby="ops-game-scenario-heading">
        <div className="lgo-ops-section-copy">
          <p className="lgo-card-kicker">Read-only UX scenarios</p>
          <h2 id="ops-game-scenario-heading">Fixture rows chỉ kiểm tra drill-down</h2>
          <p>Capacity/region/state minh họa không nằm trong primary hierarchy và không trở thành backend requirement.</p>
        </div>
        <DataList aria-label="Fixture game operations scenarios">
          {opsGameOperationFixtures.map((item) => (
            <DataListItem
              key={item.id}
              title={item.surface}
              description={item.note}
              meta={<StatusBadge tone="shadow">Fixture scenario</StatusBadge>}
              trailing={<LinkButton href={"/game-operations/" + item.id}>Inspect boundary</LinkButton>}
            />
          ))}
        </DataList>
      </section>

      <aside className="lgo-ops-domain-note" aria-label="Game Operations mutation boundary">
        <StatusBadge tone="shadow">{NO_REAL_OPS_MUTATION}</StatusBadge>
        <p>World observation, Support, Trust & Safety và Content & LiveOps giữ domain riêng. Không có restart/drain/kick/teleport/publish action trong release read-only đầu tiên.</p>
      </aside>
    </ProvisionalFeatureShell>
  );
}
