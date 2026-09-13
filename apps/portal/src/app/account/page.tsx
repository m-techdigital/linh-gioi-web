import { KeyValueGrid, KeyValueItem, LinkButton, MetricCard, MetricGrid, ProvisionalFeatureShell } from "@lgo-web/ui";
import { NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, portalAccountFixture } from "../../lib/portal-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Tài khoản người chơi"
      description="Account overview fixture only. No DB persistence or real account portal integration. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <MetricGrid>
        <MetricCard label="Characters" value={String(portalAccountFixture.characterCount)} detail="Fixture only" tone="spirit" />
        <MetricCard label="Sessions" value={String(portalAccountFixture.sessionCount)} detail="No real session backend" tone="gold" />
      </MetricGrid>
      <KeyValueGrid aria-label="Account fixture summary">
        <KeyValueItem label="Display name" value={portalAccountFixture.displayName} detail="Presentation-only identity" tone="spirit" />
        <KeyValueItem label="Account ID" value={portalAccountFixture.accountId} detail="Not a canonical database identifier" />
        <KeyValueItem label="Email" value={portalAccountFixture.emailState} detail="No production verification flow" tone="gold" />
        <KeyValueItem label="Security" value={portalAccountFixture.securityState} detail="No password/token mutation" tone="shadow" />
      </KeyValueGrid>
      <div className="lgo-hero-actions">
        <LinkButton href="/account/security">Bảo mật</LinkButton>
        <LinkButton href="/account/sessions" tone="gold">Phiên đăng nhập</LinkButton>
        <LinkButton href="/characters" tone="jade">Nhân vật</LinkButton>
      </div>
    </ProvisionalFeatureShell>
  );
}
