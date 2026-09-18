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
  portalAccountFixture,
  portalCharacterFixtures
} from "../../lib/portal-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Tài khoản người chơi"
      description="Hierarchy chỉ giữ các field có đường đi rõ tới AccountResponse; security/email/session fixture không còn đứng như dữ liệu tài khoản thật."
      boundary="Player Portal vẫn chờ accepted Auth / DB / API contract. Không có account persistence hoặc mutation thật trong Web."
    >
      <section className="lgo-portal-account-primary" aria-labelledby="portal-account-primary-heading">
        <div className="lgo-portal-section-intro">
          <p className="lgo-card-kicker">Future-real-capable identity</p>
          <h2 id="portal-account-primary-heading">Thông tin nhận diện</h2>
          <p>Hai field này có mapping trực tiếp tới AccountResponse hiện tại; giá trị vẫn là fixture cho tới khi CT/BFF mở.</p>
        </div>
        <KeyValueGrid aria-label="Account fixture summary">
          <KeyValueItem label="Display name" value={portalAccountFixture.displayName} detail="Future source: AccountResponse.displayName" tone="spirit" />
          <KeyValueItem label="Public Account ID" value={portalAccountFixture.accountId} detail="Future source: AccountResponse.accountId · không phải DB UUID" tone="gold" />
        </KeyValueGrid>
      </section>

      <section className="lgo-portal-account-capabilities" aria-labelledby="portal-account-capability-heading">
        <div className="lgo-portal-section-intro">
          <p className="lgo-card-kicker">Capability boundaries</p>
          <h2 id="portal-account-capability-heading">Phần nào có thể mở tiếp</h2>
        </div>
        <DataList aria-label="Account capability status">
          <DataListItem
            title="Nhân vật"
            description="Character count sẽ được derive từ roster thật, không lưu thành một account metric độc lập."
            meta={`${portalCharacterFixtures.length}/3 slot fixture hiện có`}
            trailing={<LinkButton href="/characters" tone="jade">Xem nhân vật</LinkButton>}
          />
          <DataListItem
            title="Phiên đăng nhập"
            description="Chỉ mở khi session list/revoke trở thành durable backend capability."
            meta={<StatusBadge tone="shadow">BLOCKED_BY_DB-05</StatusBadge>}
            trailing={<LinkButton href="/account/sessions" tone="neutral">Xem boundary</LinkButton>}
          />
          <DataListItem
            title="Bảo mật"
            description="Không hiển thị security score/email verification giả; route chỉ giữ guidance cho tới khi có canonical source."
            meta={<StatusBadge tone="shadow">NO_SECURITY_POSTURE_MODEL</StatusBadge>}
            trailing={<LinkButton href="/account/security">Mở hướng dẫn</LinkButton>}
          />
        </DataList>
      </section>
    </ProvisionalFeatureShell>
  );
}
