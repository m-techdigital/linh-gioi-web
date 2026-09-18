import {
  ActivityTimeline,
  ActivityTimelineItem,
  BlockedActionButton,
  DataList,
  DataListItem,
  KeyValueGrid,
  KeyValueItem,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge
} from "@lgo-web/ui";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsPlayerActivityFixtures,
  opsPlayerFixtures
} from "../../../lib/ops-fixtures";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = opsPlayerFixtures.find((item) => item.id === id) ?? opsPlayerFixtures[0];
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={PROVISIONAL_WEB_FIXTURE + " · " + NO_REAL_OPS_MUTATION + " · " + NOT_CANONICAL_BACKEND_CONTRACT}
      title={"Player 360 · " + player.displayName}
      description="Player 360 là read model hợp nhất từ canonical domains trong tương lai, không phải một writable player row và không chứa trust score giả."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <section className="lgo-ops-readmodel-section" aria-labelledby="ops-player360-identity-heading">
        <div className="lgo-ops-source-heading">
          <div>
            <p className="lgo-card-kicker">Read model identity</p>
            <h2 id="ops-player360-identity-heading">Player 360 là read model, không phải form chỉnh player</h2>
          </div>
          <StatusBadge tone="shadow">ADM-04 not connected</StatusBadge>
        </div>
        <KeyValueGrid aria-label="Player 360 fixture identity">
          <KeyValueItem label="Display name" value={player.displayName} detail="Future source: canonical account read model" tone="spirit" />
          <KeyValueItem label="Fixture reference" value={player.id} detail="UX fixture only · not a canonical public account ID" />
          <KeyValueItem label="Read-model scope" value="Account + characters" detail="Sessions/progression/inventory open only with owning domains" tone="gold" />
        </KeyValueGrid>
      </section>
      <DataList aria-label="Player 360 domain sections">
        <DataListItem title="Account & characters" description="Canonical identity, class, slot and runtime context will be composed read-only when ADM-04 opens." meta={<StatusBadge tone="shadow">WAITING_ADM-04</StatusBadge>} />
        <DataListItem title="Sessions" description="Active/revoked/expired summaries require durable session authority; no token or secret is displayed." meta={<StatusBadge tone="shadow">BLOCKED_BY_ADM-05</StatusBadge>} />
        <DataListItem title="Support & audit" description="Context remains separate by domain and links to canonical case/audit stores when those dependencies exist." trailing={<LinkButton href="/audit" tone="neutral">Mở audit boundary</LinkButton>} />
      </DataList>

      <section className="lgo-ops-action-boundary" aria-labelledby="ops-player360-action-heading">
        <div className="lgo-ops-source-heading">
          <div>
            <p className="lgo-card-kicker">Safe-action boundary</p>
            <h2 id="ops-player360-action-heading">Candidate commands vẫn bị khóa</h2>
            <p>Chỉ session revoke và approved unstuck là candidate ban đầu; mỗi command vẫn cần capability, reason, idempotency và audit.</p>
          </div>
          <StatusBadge tone="shadow">{NO_REAL_OPS_MUTATION}</StatusBadge>
        </div>
        <div className="lgo-ops-action-grid" role="group" aria-label="Blocked Player 360 actions">
          <BlockedActionButton id="ops-player-revoke-session-blocked" reason={NO_ACCEPTED_BACKEND_CONTRACT + " — session.revoke + audit contract chưa tồn tại."}>Revoke session — blocked</BlockedActionButton>
          <BlockedActionButton id="ops-player-unstuck-blocked" reason={NO_ACCEPTED_BACKEND_CONTRACT + " — approved unstuck command + safe checkpoint contract chưa tồn tại."}>Unstuck — blocked</BlockedActionButton>
          <LinkButton href="/player-operations" tone="neutral">Back to search</LinkButton>
        </div>
      </section>
      <section className="lgo-ops-readmodel-section" aria-labelledby="ops-player360-scenario-heading">
        <div className="lgo-ops-section-copy">
          <p className="lgo-card-kicker">Scenario history · not audit</p>
          <h2 id="ops-player360-scenario-heading">Chuỗi review minh họa</h2>
          <p>Timeline dưới đây chỉ kiểm tra bố cục, không được coi là append-only audit event store.</p>
        </div>
        <ActivityTimeline aria-label="Fixture player review activity">
          {opsPlayerActivityFixtures.map((event) => (
            <ActivityTimelineItem key={event.id} title={event.title} timestamp={event.timestamp} description={event.description} meta={event.meta} />
          ))}
        </ActivityTimeline>
      </section>
    </ProvisionalFeatureShell>
  );
}
