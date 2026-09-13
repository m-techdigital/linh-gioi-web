import { ActivityTimeline, ActivityTimelineItem, BlockedActionButton, FormActions, InlineFeedback, KeyValueGrid, KeyValueItem, LinkButton, ProvisionalFeatureShell } from "@lgo-web/ui";
import { NO_ACCEPTED_BACKEND_CONTRACT, NO_REAL_OPS_MUTATION, NOT_CANONICAL_BACKEND_CONTRACT, PROVISIONAL_WEB_FIXTURE, opsPlayerActivityFixtures, opsPlayerFixtures } from "../../../lib/ops-fixtures";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = opsPlayerFixtures.find((item) => item.id === id) ?? opsPlayerFixtures[0];
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NO_REAL_OPS_MUTATION} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title={`Player review · ${player.displayName}`}
      description="Player 360 fixture only. No canonical player model, moderation contract or live account query."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <KeyValueGrid aria-label="Player review fixture details">
        <KeyValueItem label="Account state" value={player.accountState} detail="Presentation only" tone="spirit" />
        <KeyValueItem label="Characters" value={player.characterSummary} detail="No canonical character relation" tone="gold" />
        <KeyValueItem label="Trust" value={player.trustState} detail="No canonical trust/safety scoring model" tone="shadow" />
        <KeyValueItem label="Surface" value={player.surface} detail={NOT_CANONICAL_BACKEND_CONTRACT} />
      </KeyValueGrid>
      <InlineFeedback tone="warning" title="Moderation actions are blocked">
        Review controls are disabled until accepted RBAC, audit and mutation contracts exist.
      </InlineFeedback>
      <ActivityTimeline aria-label="Fixture player review activity">
        {opsPlayerActivityFixtures.map((event) => (
          <ActivityTimelineItem key={event.id} title={event.title} timestamp={event.timestamp} description={event.description} meta={event.meta} />
        ))}
      </ActivityTimeline>
      <FormActions>
        <BlockedActionButton id="ops-player-suspend-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; suspension requires accepted account, RBAC and audit contracts.`}>Suspend account — blocked</BlockedActionButton>
        <BlockedActionButton id="ops-player-moderation-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; moderation mutation remains blocked until canonical contracts exist.`}>Apply moderation — blocked</BlockedActionButton>
        <LinkButton href="/player-operations" tone="neutral">Back to queue</LinkButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
