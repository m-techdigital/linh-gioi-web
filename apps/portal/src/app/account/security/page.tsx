import Image from "next/image";
import {
  DataList,
  DataListItem,
  InlineFeedback,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge,
  VisualProofCard,
  VisualProofGrid
} from "@lgo-web/ui";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalSecurityContinuityActions,
  portalSecurityContinuityPanels
} from "../../../lib/portal-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT} · ${NO_ACCEPTED_BACKEND_CONTRACT}`}
      title="Bảo mật tài khoản"
      description="Security posture fixture. No real session/token/security mutation. PROVISIONAL_WEB_FIXTURE NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Player Portal is blocked until accepted Auth/DB/API contract. No production auth is claimed."
    >
      <InlineFeedback tone="warning" title="Chưa có canonical auth contract">
        Route này chỉ giải thích security posture và điều hướng tiếp; không thu credential, không render form và không gọi backend.
      </InlineFeedback>

      <section className="lgo-panel" aria-labelledby="portal-security-continuity-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">Route continuity</p>
          <h2 id="portal-security-continuity-heading">Security route continuity</h2>
          <p>Bảo mật cần được đọc như một chặng trong Portal, nối tới phiên đăng nhập và hành trình người chơi.</p>
        </div>
        <VisualProofGrid aria-label="Portal security visual continuity panels">
          {portalSecurityContinuityPanels.map((panel) => (
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
                  loading={panel.claim === "WORLD_CONCEPT" ? "eager" : "lazy"}
                />
              )}
              meta={<StatusBadge tone="shadow">{NO_ACCEPTED_BACKEND_CONTRACT}</StatusBadge>}
            />
          ))}
        </VisualProofGrid>
      </section>

      <DataList aria-label="Security continuity next routes">
        {portalSecurityContinuityActions.map((action) => (
          <DataListItem
            key={action.href}
            title={action.title}
            description={action.description}
            trailing={<LinkButton href={action.href}>{action.title}</LinkButton>}
          />
        ))}
      </DataList>
    </ProvisionalFeatureShell>
  );
}
