import {
  ActivityTimeline,
  ActivityTimelineItem,
  CaseSummary,
  CaseSummaryItem,
  FormActions,
  FormField,
  InlineFeedback,
  LinkButton,
  ProvisionalFeatureShell,
  SelectInput,
  SpiritButton
} from "@lgo-web/ui";
import {
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsSupportCaseFixture
} from "../../../lib/ops-fixtures";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supportCase = { ...opsSupportCaseFixture, id };
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title={`Support review · ${supportCase.id}`}
      description="Support case fixture only. No live ticket, player lookup, assignment, escalation or moderation contract."
      boundary="Ops/Admin support is blocked until accepted Support/RBAC/API/audit contracts exist. No real ops/admin mutation is claimed."
    >
      <CaseSummary title={supportCase.player} state={supportCase.state} tone="gold" summary={supportCase.summary}>
        <CaseSummaryItem label="Category" value={supportCase.category} />
        <CaseSummaryItem label="Priority" value={supportCase.priority} />
        <CaseSummaryItem label="Owner" value={supportCase.owner} />
        <CaseSummaryItem label="Escalation" value={supportCase.escalation} />
      </CaseSummary>

      <InlineFeedback tone="warning" title="Triage actions are blocked">
        Assignment, escalation and moderation controls are disabled until accepted Support/RBAC/API/audit contracts exist.
      </InlineFeedback>

      <FormField id="ops-support-assignee" label="Assignee" help={NOT_CANONICAL_BACKEND_CONTRACT}>
        {(controlProps) => (
          <SelectInput {...controlProps} disabled defaultValue="unassigned">
            <option value="unassigned">Unassigned fixture</option>
            <option value="support">Support operator fixture</option>
          </SelectInput>
        )}
      </FormField>

      <ActivityTimeline aria-label="Fixture support case activity">
        {supportCase.timeline.map((event) => (
          <ActivityTimelineItem key={event.id} title={event.title} timestamp={event.timestamp} description={event.description} meta={event.meta} />
        ))}
      </ActivityTimeline>

      <FormActions>
        <SpiritButton type="button" disabled>Assign case — blocked</SpiritButton>
        <SpiritButton type="button" disabled>Escalate — blocked</SpiritButton>
        <LinkButton href="/support" tone="neutral">Back to queue</LinkButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
