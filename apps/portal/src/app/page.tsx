import { portalShellStates } from "@lgo-web/auth";
import { DataList, DataListItem, LinkButton, MetricCard, MetricGrid, StatusBadge, WorkspacePage } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, portalAccountFixture } from "../lib/portal-fixtures";

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
