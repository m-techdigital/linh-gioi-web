import {
  DataList,
  DataListItem,
  KeyValueGrid,
  KeyValueItem,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge
} from "@lgo-web/ui";
import {
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalCharacterFixtures
} from "../../../lib/portal-fixtures";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = Math.max(0, portalCharacterFixtures.findIndex((item) => item.id === id));
  const character = portalCharacterFixtures[index] ?? portalCharacterFixtures[0];
  const slot = index + 1;

  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title={`Nhân vật · ${character.name}`}
      description="Character detail ưu tiên identity có thể nối CharacterResponse; progression/equipment/state fixture chuyển thành capability boundary thay vì giả profile hoàn chỉnh."
      boundary="Player Portal vẫn chờ accepted Auth / DB / API contract. Route này không mutation character hoặc map state."
    >
      <section className="lgo-portal-character-detail-primary" aria-labelledby="portal-character-identity-heading">
        <div className="lgo-portal-section-intro">
          <p className="lgo-card-kicker">Character identity</p>
          <h2 id="portal-character-identity-heading">Thông tin có đường đi tới contract thật</h2>
        </div>
        <KeyValueGrid aria-label="Character fixture identity">
          <KeyValueItem label="Tên nhân vật" value={character.name} detail="Future source: CharacterResponse.name" tone="spirit" />
          <KeyValueItem label="Lộ" value={character.path} detail="Future display source: canonical runtimeClassId mapping" tone="gold" />
          <KeyValueItem label="Slot" value={`Slot ${slot}`} detail="Future source: CharacterResponse.slot" tone="jade" />
        </KeyValueGrid>
      </section>

      <DataList aria-label="Character capability boundaries">
        <DataListItem
          title="Khu vực hiện tại"
          description="Runtime map có thể trở thành read-only companion context sau khi Game xác nhận read-model policy."
          meta={<StatusBadge tone="shadow">WAITING_GAME_REVIEW</StatusBadge>}
        />
        <DataListItem
          title="Tiến trình"
          description="Không dùng level fixture làm dữ liệu thật; chờ server-authoritative Progression domain."
          meta={<StatusBadge tone="shadow">BLOCKED_BY_GAME-DATA-01</StatusBadge>}
        />
        <DataListItem
          title="Trang bị & ngoại hình"
          description="Chờ Inventory/Equipment authority; không tạo character sheet bằng dữ liệu minh họa."
          meta={<StatusBadge tone="shadow">BLOCKED_BY_GAME-DATA-02</StatusBadge>}
        />
      </DataList>

      <div className="lgo-hero-actions">
        <LinkButton href="/characters">Về roster</LinkButton>
        <LinkButton href="/account" tone="gold">Tài khoản</LinkButton>
      </div>
    </ProvisionalFeatureShell>
  );
}
