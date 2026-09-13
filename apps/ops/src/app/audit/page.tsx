import { ActivityTimeline, ActivityTimelineItem, FormField, InlineFeedback, ProvisionalFeatureShell, SelectInput, TextInput } from "@lgo-web/ui";
import { NO_REAL_OPS_MUTATION, NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, opsAuditFixtureEvents } from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Audit"
      description="Visual-only audit review. No real mutation endpoints, database mutation, event store or permission model."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <InlineFeedback tone="warning" title="Audit filters are disabled fixtures">Không có audit query API, event store hoặc canonical actor/action schema.</InlineFeedback>
      <FormField id="ops-audit-actor" label="Actor" help="Fixture filter; không query audit backend.">
        {(controlProps) => <TextInput {...controlProps} placeholder="operator@example.com" disabled />}
      </FormField>
      <FormField id="ops-audit-action" label="Action type" help={NOT_CANONICAL_BACKEND_CONTRACT}>
        {(controlProps) => (
          <SelectInput {...controlProps} disabled defaultValue="all">
            <option value="all">All fixture actions</option>
            <option value="review">Review fixture</option>
          </SelectInput>
        )}
      </FormField>
      <ActivityTimeline aria-label="Fixture audit events">
        {opsAuditFixtureEvents.map((event) => (
          <ActivityTimelineItem key={event.id} title={event.title} timestamp={event.timestamp} description={event.description} meta={event.meta} />
        ))}
      </ActivityTimeline>
    </ProvisionalFeatureShell>
  );
}
