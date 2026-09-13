import {
  ActivityTimeline,
  ActivityTimelineItem,
  BlockedActionButton,
  CaseSummary,
  CaseSummaryItem,
  FormActions,
  FormField,
  InlineFeedback,
  LinkButton,
  ProvisionalFeatureShell,
  SelectInput
} from "@lgo-web/ui";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  opsGameOperationActivityFixtures,
  opsGameOperationFixtures
} from "../../../lib/ops-fixtures";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const operation = opsGameOperationFixtures.find((item) => item.id === id) ?? opsGameOperationFixtures[0];
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title={`Operation review · ${operation.surface}`}
      description="Operational detail fixture only. No canonical world/session/event DTO or server control API."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real game operations mutation is claimed."
    >
      <CaseSummary title={operation.surface} state={operation.state} tone="gold" summary={operation.note}>
        <CaseSummaryItem label="Region" value={operation.region} />
        <CaseSummaryItem label="Capacity" value={operation.capacity} />
        <CaseSummaryItem label="Contract" value={NOT_CANONICAL_BACKEND_CONTRACT} />
        <CaseSummaryItem label="Mutation" value={NO_REAL_OPS_MUTATION} />
      </CaseSummary>
      <InlineFeedback tone="warning" title="Operational controls are blocked">
        Restart, drain, publish and rollback controls remain disabled until accepted Game Operations/RBAC/API/audit contracts exist.
      </InlineFeedback>
      <FormField id="ops-operation-action" label="Operation action" help={NOT_CANONICAL_BACKEND_CONTRACT}>
        {(controlProps) => (
          <SelectInput {...controlProps} disabled defaultValue="observe">
            <option value="observe">Observe fixture only</option>
            <option value="restart">Restart — blocked</option>
            <option value="drain">Drain — blocked</option>
          </SelectInput>
        )}
      </FormField>
      <ActivityTimeline aria-label="Fixture game operation activity">
        {opsGameOperationActivityFixtures.map((event) => (
          <ActivityTimelineItem key={event.id} title={event.title} timestamp={event.timestamp} description={event.description} meta={event.meta} />
        ))}
      </ActivityTimeline>
      <FormActions>
        <BlockedActionButton id="ops-game-operation-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; game operation mutation requires accepted Game Operations/RBAC/API/audit contracts.`}>Apply operation — blocked</BlockedActionButton>
        <LinkButton href="/game-operations" tone="neutral">Back to operations</LinkButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
