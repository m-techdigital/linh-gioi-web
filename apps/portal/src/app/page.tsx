import {
  DataList,
  DataListItem,
  LinkButton,
  StatusBadge,
  VisualProofCard,
  VisualProofGrid,
  WorkspacePage
} from "@lgo-web/ui";
import Image from "next/image";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalAccountFixture,
  portalCharacterFixtures,
  portalHomeVisualPanels
} from "../lib/portal-fixtures";

const boundary = "Player Portal vẫn chờ accepted Auth / DB / API contract. Dữ liệu dưới đây là fixture có chủ đích; hierarchy được chuẩn bị để thay bằng AccountResponse/CharacterResponse thật.";

export default function PortalHomePage() {
  const openSlots = Math.max(0, 3 - portalCharacterFixtures.length);

  return (
    <WorkspacePage
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      eyebrow="Player companion"
      title="Tổng quan người chơi"
      description="Quay lại tài khoản, nhân vật và bước tiếp theo bằng hierarchy sẵn sàng cho dữ liệu thật — không dùng metric fixture làm trung tâm."
      boundaryBadge="Contract boundary"
      boundary={boundary}
      actions={[
        { href: "/characters", label: "Mở nhân vật", tone: "gold" },
        { href: "/account", label: "Tài khoản", tone: "spirit" }
      ]}
    >
      <section className="lgo-portal-overview-grid" aria-label="Portal account and character journey">
        <article className="lgo-portal-identity-card">
          <div className="lgo-portal-task-card-heading">
            <div>
              <p className="lgo-card-kicker">Hồ sơ người chơi</p>
              <h2>{portalAccountFixture.displayName}</h2>
            </div>
            <StatusBadge tone="spirit">Fixture identity</StatusBadge>
          </div>
          <p>
            Account ID <strong>{portalAccountFixture.accountId}</strong> đang là dữ liệu trình bày. Khi tích hợp, vùng này chỉ nhận các field canonical từ AccountResponse.
          </p>
          <div className="lgo-portal-slot-summary" aria-label="Character slot summary">
            <strong>{portalCharacterFixtures.length}/3 slot đang có nhân vật</strong>
            <span>{openSlots} slot còn trống trong bản mẫu</span>
          </div>
        </article>

        <DataList aria-label="Việc chính trong Player Portal">
          <DataListItem
            title="Nhân vật"
            description="Đi thẳng vào roster ba slot, ưu tiên tên, Lộ và ngữ cảnh nhân vật thay vì level/state chưa có authority."
            meta={`${portalCharacterFixtures.length} fixture character · tối đa 3 slot`}
            trailing={<LinkButton href="/characters" tone="gold">Mở roster</LinkButton>}
          />
          <DataListItem
            title="Tài khoản"
            description="Display name và public account ID là trục dữ liệu đầu tiên có thể nối với backend thật."
            trailing={<LinkButton href="/account">Xem tài khoản</LinkButton>}
          />
          <DataListItem
            title="Hành trình"
            description="Progression vẫn bị khóa cho đến khi server-authoritative progression domain được mở."
            meta="BLOCKED_BY_DOMAIN · không dựng level/progress giả"
            trailing={<LinkButton href="/journey" tone="neutral">Xem boundary</LinkButton>}
          />
        </DataList>
      </section>

      <section className="lgo-panel lgo-portal-secondary-art" aria-labelledby="portal-home-visual-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">World context · secondary</p>
          <h2 id="portal-home-visual-heading">Tổng quan hình ảnh hành trình</h2>
          <p>Art giữ cảm giác game nhưng đứng sau account/character journey; không được hiểu là state thật của người chơi.</p>
        </div>
        <VisualProofGrid aria-label="Portal home visual panels">
          {portalHomeVisualPanels.map((panel) => (
            <VisualProofCard
              key={panel.id}
              eyebrow={panel.claim}
              title={panel.title}
              description={panel.description}
              media={
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  width={panel.width}
                  height={panel.height}
                  loading="lazy"
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              }
              meta={<StatusBadge tone="shadow">{NO_ACCEPTED_BACKEND_CONTRACT}</StatusBadge>}
            />
          ))}
        </VisualProofGrid>
      </section>
    </WorkspacePage>
  );
}
