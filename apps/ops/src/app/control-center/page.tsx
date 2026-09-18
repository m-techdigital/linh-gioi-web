import {
  DataList,
  DataListItem,
  LinkButton,
  ProvisionalFeatureShell,
  StatusBadge,
  VisualProofCard,
  VisualProofGrid
} from "@lgo-web/ui";
import Image from "next/image";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NO_REAL_OPS_MUTATION,
  NOT_CANONICAL_BACKEND_CONTRACT,
  opsReviewQueueFixtures,
  opsVisualProofPanels
} from "../../lib/ops-fixtures";

const sourceMeta = {
  "/support": "Source: Support domain · Freshness: unavailable · capability: support.read",
  "/trust-safety": "Source: Moderation domain · Freshness: unavailable · capability: future moderation.read",
  "/game-operations": "Source: World/runtime read model · Freshness: unavailable · capability: world.read"
} as const;

export default function Page() {
  return (
    <ProvisionalFeatureShell
      mainClassName="lgo-ops-shell"
      badge={"PROVISIONAL_WEB_FIXTURE · " + NO_REAL_OPS_MUTATION + " · " + NOT_CANONICAL_BACKEND_CONTRACT}
      title="Control Center"
      description="Điểm bắt đầu ca trực theo câu hỏi vận hành và nguồn dữ liệu. Không dùng fixture count hoặc game-art làm tín hiệu trạng thái thật."
      boundary="Ops/Admin is blocked until accepted RBAC/audit/security/API contract. No real ops/admin mutation is claimed."
    >
      <section className="lgo-ops-source-summary" aria-labelledby="ops-source-summary-heading">
        <div className="lgo-ops-source-heading">
          <div>
            <p className="lgo-card-kicker">Operational question</p>
            <h2 id="ops-source-summary-heading">Điều gì cần chú ý, và dữ liệu đến từ đâu?</h2>
            <p>Mỗi hàng giữ domain owner, freshness và capability ở cùng hierarchy. Chưa có nguồn thật thì hiển thị unavailable, không suy diễn “healthy”.</p>
          </div>
          <div className="lgo-ops-status-cluster" aria-label="Control Center source status">
            <StatusBadge tone="shadow">Sources not connected</StatusBadge>
            <StatusBadge tone="neutral">Freshness unavailable</StatusBadge>
          </div>
        </div>
        <DataList aria-label="Hàng đợi rà soát">
          {opsReviewQueueFixtures.map((queue) => (
            <DataListItem
              key={queue.href}
              title={queue.title}
              description={queue.description}
              meta={sourceMeta[queue.href]}
              trailing={<LinkButton href={queue.href}>Mở {queue.title.toLowerCase()}</LinkButton>}
            />
          ))}
          <DataListItem
            title="Điều kiện thao tác"
            description="Quyền, phê duyệt, reason, idempotency và audit phải có contract trước khi bất kỳ mutation nào được mở."
            meta={NO_REAL_OPS_MUTATION}
            trailing={<LinkButton href="/security-governance">Xem điều kiện phê duyệt</LinkButton>}
          />
        </DataList>
      </section>

      <section className="lgo-panel lgo-ops-secondary-visual" aria-labelledby="ops-visual-proof-heading">
        <div className="lgo-section-heading">
          <p className="lgo-eyebrow">Visual proof · secondary</p>
          <h2 id="ops-visual-proof-heading">Ngữ cảnh game cho người vận hành</h2>
          <p>Art chỉ giúp định hướng sản phẩm sau khi operator đã thấy source/freshness/risk boundary.</p>
        </div>
        <VisualProofGrid aria-label="Ops visual proof panels">
          {opsVisualProofPanels.map((panel) => (
            <VisualProofCard
              key={panel.id}
              eyebrow={panel.claim}
              title={panel.title}
              description={panel.description}
              media={<Image src={panel.src} alt={panel.alt} width={panel.width} height={panel.height} sizes="(max-width: 720px) 100vw, 33vw" loading="lazy" />}
              meta={<StatusBadge tone="shadow">{NO_ACCEPTED_BACKEND_CONTRACT}</StatusBadge>}
            />
          ))}
        </VisualProofGrid>
      </section>
    </ProvisionalFeatureShell>
  );
}
