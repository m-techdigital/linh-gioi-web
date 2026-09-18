import {
  BlockedActionButton,
  DataList,
  DataListItem,
  FormActions,
  FormField,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge,
  TextInput
} from "@lgo-web/ui";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsPlayerFixtures
} from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={PROVISIONAL_WEB_FIXTURE + " · " + NO_REAL_OPS_MUTATION + " · " + NOT_CANONICAL_BACKEND_CONTRACT}
      title="Player Operations"
      description="Search-first operator workflow: tìm canonical identity trước, sau đó mở Player 360 read model. Không có generic player CRUD hoặc unrestricted dump."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <section className="lgo-ops-search-workflow" aria-labelledby="ops-player-search-heading">
        <div className="lgo-ops-source-heading">
          <div>
            <p className="lgo-card-kicker">Bounded lookup</p>
            <h2 id="ops-player-search-heading">Tìm người chơi trước, mở Player 360 sau</h2>
            <p>Public account ID và character ID/name là shape dự kiến. Search vẫn khóa cho tới khi ADM-04 + contract query được mở.</p>
          </div>
          <StatusBadge tone="shadow">Search backend unavailable</StatusBadge>
        </div>
        <div className="lgo-ops-search-fields">
          <FormField id="ops-player-account-query" label="Public Account ID" help="Không nhận email/token/secret trong fixture.">
            {(controlProps) => <TextInput {...controlProps} placeholder="acc_..." disabled />}
          </FormField>
          <FormField id="ops-player-character-query" label="Character ID / tên" help="Chỉ mở khi uniqueness/search policy được canonical hóa.">
            {(controlProps) => <TextInput {...controlProps} placeholder="char_... / tên nhân vật" disabled />}
          </FormField>
        </div>
        <FormActions>
          <BlockedActionButton id="ops-player-search-blocked" reason={NO_ACCEPTED_BACKEND_CONTRACT + " — bounded Player Search chưa có query contract."}>
            Search unavailable
          </BlockedActionButton>
        </FormActions>
      </section>

      <section className="lgo-ops-readmodel-section" aria-labelledby="ops-player-scenario-heading">
        <div className="lgo-ops-section-copy">
          <p className="lgo-card-kicker">Read-only UX scenarios</p>
          <h2 id="ops-player-scenario-heading">Fixture chỉ chứng minh đường vào Player 360</h2>
          <p>Không hiển thị trust score, fake lifecycle state hay metric tổng hợp như dữ liệu thật.</p>
        </div>
        <DataList aria-label="Player 360 fixture candidates">
          {opsPlayerFixtures.map((player) => (
            <DataListItem
              key={player.id}
              title={player.displayName}
              description="Fixture identity dùng để review hierarchy; canonical account/character read model chưa được kết nối."
              meta={<StatusBadge tone="shadow">{NOT_CANONICAL_BACKEND_CONTRACT}</StatusBadge>}
              trailing={<LinkButton href={"/player-operations/" + player.id}>Mở Player 360</LinkButton>}
            />
          ))}
        </DataList>
      </section>

      <aside className="lgo-ops-domain-note" aria-label="Player Operations mutation boundary">
        <StatusBadge tone="shadow">{NO_REAL_OPS_MUTATION}</StatusBadge>
        <p>Player Operations là client workflow. Không có PATCH arbitrary fields, trust score, SQL editor hoặc mutation trực tiếp từ fixture.</p>
      </aside>
    </ProvisionalFeatureShell>
  );
}
