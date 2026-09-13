import {
  ActivityTimeline,
  ActivityTimelineItem,
  BlockedActionButton,
  CaseSummary,
  CaseSummaryItem,
  FormActions,
  InlineFeedback,
  ProvisionalFeatureShell
} from "@lgo-web/ui";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsGameOperationActivityFixtures
} from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Content & LiveOps"
      description="Visual-only content/live-event review. No scheduler, publish pipeline, rollback contract or production content mutation."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <CaseSummary title="Live event preview" state="Scheduled fixture" tone="gold" summary="Presentation-only lifecycle preview for future LiveOps workflows.">
        <CaseSummaryItem label="Publish" value="Blocked" />
        <CaseSummaryItem label="Rollback" value="Blocked" />
        <CaseSummaryItem label="Scheduler" value="Not canonical" />
        <CaseSummaryItem label="Audit" value="Contract required" />
      </CaseSummary>
      <InlineFeedback tone="warning" title="LiveOps mutations are blocked">
        This page does not publish, schedule, enable or rollback content.
      </InlineFeedback>
      <ActivityTimeline aria-label="Fixture live operations activity">
        {opsGameOperationActivityFixtures.map((event) => (
          <ActivityTimelineItem key={`liveops:${event.id}`} title={event.title} timestamp={event.timestamp} description={event.description} meta={event.meta} />
        ))}
      </ActivityTimeline>
      <FormActions>
        <BlockedActionButton id="ops-liveops-publish-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; publish requires accepted scheduler, RBAC and audit contracts.`}>Publish event — blocked</BlockedActionButton>
        <BlockedActionButton id="ops-liveops-rollback-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; rollback requires canonical content mutation and audit contracts.`}>Rollback — blocked</BlockedActionButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
