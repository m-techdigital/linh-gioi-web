import { ActivityTimeline, ActivityTimelineItem, BlockedActionButton, CaseSummary, CaseSummaryItem, FormActions, InlineFeedback, LinkButton, ProgressStep, ProgressSteps, ProvisionalFeatureShell } from "@lgo-web/ui";
import { NO_ACCEPTED_BACKEND_CONTRACT, NO_REAL_OPS_MUTATION, opsApprovalSteps, opsSafetyReviewFixture } from "../../lib/ops-fixtures";

export default function Page() {
  const review = opsSafetyReviewFixture;
  return (
    <ProvisionalFeatureShell mainClassName="lgo-ops-shell" badge="PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION"
      title="Trust & Safety" description="Rà soát báo cáo mẫu theo ngữ cảnh trước khi cân nhắc quyết định. NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed.">
      <InlineFeedback title="Không có kết luận vi phạm hoặc xử phạt thật" tone="warning">Bản mẫu không tiếp nhận báo cáo, đọc tin nhắn, khóa tài khoản hay gửi thông báo tới người chơi.</InlineFeedback>
      <CaseSummary title={review.title} state={review.state} summary={review.summary}>
        <CaseSummaryItem label="Mã mẫu" value={review.id} />
        <CaseSummaryItem label="Bằng chứng" value={review.evidence} />
        <CaseSummaryItem label="Bước tiếp theo" value={review.nextStep} />
      </CaseSummary>
      <ProgressSteps label="Các bước rà soát dự kiến">
        {opsApprovalSteps.map((step) => <ProgressStep key={step.title} {...step} />)}
      </ProgressSteps>
      <ActivityTimeline aria-label="Diễn tiến báo cáo mẫu">
        {review.timeline.map((event) => <ActivityTimelineItem key={event.title} {...event} tone="neutral" />)}
      </ActivityTimeline>
      <FormActions>
        <BlockedActionButton id="ops-trust-approval-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; approval transition requires accepted RBAC/audit/security/API contracts.`}>Chuyển phê duyệt — chưa khả dụng</BlockedActionButton>
        <BlockedActionButton id="ops-trust-action-blocked" reason={`${NO_ACCEPTED_BACKEND_CONTRACT} — ${NO_REAL_OPS_MUTATION}; enforcement action remains blocked until canonical mutation and audit contracts exist.`}>Áp dụng biện pháp — chưa khả dụng</BlockedActionButton>
        <LinkButton href="/security-governance">Xem điều kiện phê duyệt</LinkButton>
        <LinkButton href="/control-center">Trở về Control Center</LinkButton>
      </FormActions>
    </ProvisionalFeatureShell>
  );
}
