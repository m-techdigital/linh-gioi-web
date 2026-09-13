import {
  ApprovalFlowPlaceholder,
  AuditTimelinePlaceholder,
  DangerousActionDialogPlaceholder,
  DataList,
  DataListItem,
  PermissionGatePlaceholder,
  Player360Placeholder,
  RuntimeStatusPlaceholder,
  LinkButton,
  StatusBadge,
  VisualProofCard,
  VisualProofGrid,
  WorkspacePage
} from "@lgo-web/ui";
import Image from "next/image";
import { NO_ACCEPTED_BACKEND_CONTRACT, NO_REAL_OPS_MUTATION, opsHomeVisualPanels } from "../lib/ops-fixtures";

const workspaces = [
  { title: "Control Center", href: "/control-center" },
  { title: "Player Operations", href: "/player-operations" },
  { title: "Game Operations", href: "/game-operations" },
  { title: "Content & LiveOps", href: "/content-liveops" },
  { title: "Support", href: "/support" },
  { title: "Trust & Safety", href: "/trust-safety" },
  { title: "Security & Governance", href: "/security-governance" },
  { title: "Audit", href: "/audit" }
];
const boundary = "Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed.";

export default function OpsHomePage() {
  return (
    <WorkspacePage
      mainClassName="lgo-ops-shell"
      badge="PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION · NOT_CANONICAL_BACKEND_CONTRACT"
      title="Ops/Admin Shell"
      description="Workspace vận hành dùng chung page-pattern base, nhưng mọi dữ liệu và hành động vẫn là visual fixture cho tới khi contract backend được chấp nhận."
      boundaryBadge="Contract boundary"
      boundary={boundary}
    >
      <section className="lgo-panel" aria-labelledby="ops-home-visual-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">Visual route map</p>
          <h2 id="ops-home-visual-heading">Bản đồ vận hành trực quan</h2>
          <p>Ops home dùng hình ảnh để gom các workspace thành một bản đồ review dễ đọc, không mở thao tác thật.</p>
        </div>
        <VisualProofGrid aria-label="Ops home visual panels">
          {opsHomeVisualPanels.map((panel) => (
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
        <p className="lgo-data-list-meta">{NO_REAL_OPS_MUTATION} · {NO_ACCEPTED_BACKEND_CONTRACT}</p>
      </section>
      <DataList aria-label="Ops workspaces">
        {workspaces.map((workspace) => (
          <DataListItem
            key={workspace.href}
            title={workspace.title}
            description="Visual-only fixture workspace. NOT_CANONICAL_BACKEND_CONTRACT."
            trailing={<LinkButton href={workspace.href}>Mở {workspace.title}</LinkButton>}
          />
        ))}
      </DataList>
      <PermissionGatePlaceholder>RBAC/audit/security/API contract blocked.</PermissionGatePlaceholder>
      <AuditTimelinePlaceholder />
      <DangerousActionDialogPlaceholder />
      <ApprovalFlowPlaceholder />
      <Player360Placeholder />
      <RuntimeStatusPlaceholder />
    </WorkspacePage>
  );
}
