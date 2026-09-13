import {
  ApprovalFlowPlaceholder,
  AuditTimelinePlaceholder,
  DangerousActionDialogPlaceholder,
  DataList,
  DataListItem,
  PermissionGatePlaceholder,
  Player360Placeholder,
  RuntimeStatusPlaceholder,
  StatusBadge,
  WorkspacePage
} from "@lgo-web/ui";

const workspaces = ["Control Center", "Player Operations", "Game Operations", "Content & LiveOps", "Support", "Trust & Safety", "Security & Governance", "Audit"];
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
      <DataList aria-label="Ops workspaces">
        {workspaces.map((workspace) => (
          <DataListItem
            key={workspace}
            title={workspace}
            description="Visual-only fixture workspace. NOT_CANONICAL_BACKEND_CONTRACT."
            trailing={<StatusBadge tone="neutral">fixture</StatusBadge>}
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
