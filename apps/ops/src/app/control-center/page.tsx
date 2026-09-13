import { DataList, DataListItem, InlineFeedback, LinkButton, MetricCard, MetricGrid, ProvisionalFeatureShell } from "@lgo-web/ui";
import { opsReviewQueueFixtures } from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell mainClassName="lgo-ops-shell" badge="PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION"
      title="Control Center" description="Điểm bắt đầu ca rà soát mẫu: chọn hàng đợi, xem ngữ cảnh và kiểm tra điều kiện phê duyệt. NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed.">
      <InlineFeedback title="Tổng quan minh họa" tone="warning">Số lượng dưới đây đếm fixture trong bản mẫu, không phải trạng thái vận hành trực tiếp.</InlineFeedback>
      <MetricGrid>
        {opsReviewQueueFixtures.map((queue) => <MetricCard key={queue.href} label={queue.title} value={String(queue.count)} detail="Tình huống mẫu" tone="spirit" />)}
      </MetricGrid>
      <DataList aria-label="Hàng đợi rà soát">
        {opsReviewQueueFixtures.map((queue) => <DataListItem key={queue.href} title={queue.title} description={queue.description}
          trailing={<LinkButton href={queue.href}>Mở {queue.title.toLowerCase()}</LinkButton>} />)}
        <DataListItem title="Điều kiện thao tác" description="Kiểm tra quyền, phê duyệt và lưu vết trước khi mở thao tác thật."
          trailing={<LinkButton href="/security-governance">Xem điều kiện phê duyệt</LinkButton>} />
      </DataList>
    </ProvisionalFeatureShell>
  );
}
