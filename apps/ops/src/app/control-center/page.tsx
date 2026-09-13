import { DataList, DataListItem, InlineFeedback, LinkButton, MetricCard, MetricGrid, ProvisionalFeatureShell, StatusBadge, VisualProofCard, VisualProofGrid } from "@lgo-web/ui";
import Image from "next/image";
import { NO_ACCEPTED_BACKEND_CONTRACT, opsReviewQueueFixtures, opsVisualProofPanels } from "../../lib/ops-fixtures";

export default function Page() {
  return (
    <ProvisionalFeatureShell mainClassName="lgo-ops-shell" badge="PROVISIONAL_WEB_FIXTURE · NO_REAL_OPS_MUTATION"
      title="Control Center" description="Điểm bắt đầu ca rà soát mẫu: chọn hàng đợi, xem ngữ cảnh và kiểm tra điều kiện phê duyệt. NOT_CANONICAL_BACKEND_CONTRACT."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed.">
      <InlineFeedback title="Tổng quan minh họa" tone="warning">Số lượng dưới đây đếm fixture trong bản mẫu, không phải trạng thái vận hành trực tiếp. {NO_ACCEPTED_BACKEND_CONTRACT}.</InlineFeedback>
      <section className="lgo-panel" aria-labelledby="ops-visual-proof-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">Visual proof</p>
          <h2 id="ops-visual-proof-heading">Visual proof cho ca trực</h2>
          <p>Ảnh game-art giúp kiểm tra hierarchy và cảm giác vận hành thật, nhưng mọi số liệu và thao tác vẫn là fixture.</p>
        </div>
        <VisualProofGrid aria-label="Ops visual proof panels">
          {opsVisualProofPanels.map((panel) => (
            <VisualProofCard
              key={panel.id}
              eyebrow={panel.claim}
              title={panel.title}
              description={panel.description}
              media={(
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  width={panel.width}
                  height={panel.height}
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
              )}
              meta={<StatusBadge tone="shadow">{NO_ACCEPTED_BACKEND_CONTRACT}</StatusBadge>}
            />
          ))}
        </VisualProofGrid>
      </section>
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
