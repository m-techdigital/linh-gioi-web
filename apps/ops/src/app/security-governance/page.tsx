import Image from "next/image";
import {
  DataList,
  DataListItem,
  InlineFeedback,
  LinkButton,
  ProgressStep,
  ProgressSteps,
  ProvisionalFeatureShell,
  StatusBadge,
  VisualProofCard,
  VisualProofGrid
} from "@lgo-web/ui";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NO_REAL_OPS_MUTATION,
  opsApprovalSteps,
  opsSecurityContinuityActions,
  opsSecurityContinuityPanels
} from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`PROVISIONAL_WEB_FIXTURE · ${NO_REAL_OPS_MUTATION} · ${NO_ACCEPTED_BACKEND_CONTRACT}`}
      title="Security & Governance"
      description="Visual-only ops/admin shell. NOT_CANONICAL_BACKEND_CONTRACT. No real mutation endpoints, no database mutation, no real permission model."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <InlineFeedback tone="warning" title="Governance controls are read-only fixtures">
        Không có canonical role, permission mutation hoặc approval backend. Route này chỉ nối điều kiện phê duyệt với audit/control-center.
      </InlineFeedback>

      <section className="lgo-panel" aria-labelledby="ops-security-continuity-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">Route continuity</p>
          <h2 id="ops-security-continuity-heading">Governance route continuity</h2>
          <p>Security & Governance cần chỉ rõ vì sao thao tác bị khóa và người vận hành nên đi đâu tiếp.</p>
        </div>
        <VisualProofGrid aria-label="Ops security visual continuity panels">
          {opsSecurityContinuityPanels.map((panel) => (
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

      <ProgressSteps label="Điều kiện phê duyệt dự kiến">
        {opsApprovalSteps.map((step) => <ProgressStep key={step.title} {...step} />)}
      </ProgressSteps>

      <DataList aria-label="Governance continuity next routes">
        {opsSecurityContinuityActions.map((action) => (
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
