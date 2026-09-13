import { portalShellStates } from "@lgo-web/auth";
import { DataList, DataListItem, LinkButton, MetricCard, MetricGrid, StatusBadge, VisualProofCard, VisualProofGrid, WorkspacePage } from "@lgo-web/ui";
import Image from "next/image";
import { NO_ACCEPTED_BACKEND_CONTRACT, NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, portalAccountFixture, portalHomeVisualPanels } from "../lib/portal-fixtures";

const boundary = "Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed.";

export default function PortalHomePage() {
  return (
    <WorkspacePage
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      eyebrow="Player journey"
      title="Tổng quan người chơi"
      description="Một dashboard fixture để kiểm tra hành trình account → security → sessions → characters trước khi canonical backend contract được mở."
      boundaryBadge="Contract boundary"
      boundary={boundary}
      actions={[{ href: "/account", label: "Xem tài khoản", tone: "spirit" }, { href: "/characters", label: "Xem nhân vật", tone: "gold" }]}
    >
      <section className="lgo-panel" aria-labelledby="portal-home-visual-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">Visual journey</p>
          <h2 id="portal-home-visual-heading">Tổng quan hình ảnh hành trình</h2>
          <p>Ảnh game-art giúp tổng quan người chơi có cảm giác game hơn, nhưng mọi trạng thái vẫn là fixture.</p>
        </div>
        <VisualProofGrid aria-label="Portal home visual panels">
          {portalHomeVisualPanels.map((panel) => (
            <VisualProofCard
              key={panel.id}
              eyebrow={panel.claim}
              title={panel.title}
              description={panel.description}
              media={(
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  width={panel.width}
                  height={panel.height}
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              )}
              meta={<StatusBadge tone="shadow">{NO_ACCEPTED_BACKEND_CONTRACT}</StatusBadge>}
            />
          ))}
        </VisualProofGrid>
      </section>
      <MetricGrid>
        <MetricCard label="Nhân vật" value={String(portalAccountFixture.characterCount)} detail="Fixture rows only" tone="spirit" />
        <MetricCard label="Phiên" value={String(portalAccountFixture.sessionCount)} detail="No real token/session model" tone="gold" />
        <MetricCard label="Backend" value="Blocked" detail="Auth/DB/API contract required" tone="shadow" />
      </MetricGrid>
      <DataList aria-label="Portal journey states">
        <DataListItem title="Tài khoản & bảo mật" description="Xem identity, security posture và session fixture." trailing={<LinkButton href="/account">Mở account</LinkButton>} />
        <DataListItem title="Nhân vật" description="Xem character overview và character detail fixture." trailing={<LinkButton href="/characters" tone="gold">Mở characters</LinkButton>} />
        <DataListItem title="State coverage" description={`${portalShellStates.length} fixture UX states vẫn được giữ để test boundary behavior.`} trailing={<StatusBadge tone="neutral">fixture</StatusBadge>} />
      </DataList>
    </WorkspacePage>
  );
}
