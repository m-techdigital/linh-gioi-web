import { AccessJourney } from "../../components/AccessJourney";
import {
  ActivityTimeline,
  ActivityTimelineItem,
  CaseSummary,
  CaseSummaryItem,
  BlockedActionButton,
  FormActions,
  FormField,
  InlineFeedback,
  ProvisionalFeatureShell,
  TextInput
} from "@lgo-web/ui";
import {
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalRecoveryFixture
} from "../../lib/portal-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT}`}
      title="Khôi phục tài khoản"
      description="Recovery journey fixture giúp kiểm tra hierarchy và trạng thái trước khi auth/recovery backend contract được chấp nhận."
      boundary="No real account lookup, email delivery, recovery token or credential mutation exists in this Web Program task."
    >
      <AccessJourney journey="recovery" />
      <InlineFeedback tone="warning" title="Recovery fixture only">
        Không gửi email/token recovery và không lookup tài khoản thật.
      </InlineFeedback>

      <CaseSummary
        title="Recovery state"
        state={portalRecoveryFixture.state}
        tone="shadow"
        summary="Flow được trình bày đầy đủ để người chơi hiểu các bước, nhưng mọi hành động có side effect đều bị khóa."
      >
        <CaseSummaryItem label="Mã recovery" value={portalRecoveryFixture.id} />
        <CaseSummaryItem label="Kênh" value={portalRecoveryFixture.channel} />
        <CaseSummaryItem label="Ownership check" value={portalRecoveryFixture.ownershipCheck} />
        <CaseSummaryItem label="Token delivery" value={portalRecoveryFixture.tokenDelivery} />
      </CaseSummary>

      <FormField id="portal-recovery-identity" label="Email / tài khoản" help="Disabled fixture field; không thu account data.">
        {(controlProps) => <TextInput {...controlProps} placeholder="player@example.com" disabled />}
      </FormField>
      <FormActions>
        <BlockedActionButton id="portal-recovery-blocked-action" reason="NO_ACCEPTED_BACKEND_CONTRACT — No production auth, recovery token delivery or credential mutation exists yet.">Khôi phục chưa khả dụng</BlockedActionButton>
      </FormActions>

      <ActivityTimeline aria-label="Recovery stages">
        {portalRecoveryFixture.stages.map((stage) => (
          <ActivityTimelineItem
            key={stage.timestamp}
            title={stage.title}
            timestamp={stage.timestamp}
            description={stage.description}
            tone="neutral"
          />
        ))}
      </ActivityTimeline>
    </ProvisionalFeatureShell>
  );
}
