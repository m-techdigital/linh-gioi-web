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
  WorkspacePage
} from "@lgo-web/ui";

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
