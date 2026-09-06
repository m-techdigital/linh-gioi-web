import {
  contentDetailSections,
  downloadExplainers,
  guideDetailSteps,
  statusExplainers
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function toneForStatus(status: string) {
  if (status === "ready" || status === "public") return "jade" as const;
  if (status === "planned" || status === "internal") return "gold" as const;
  return "shadow" as const;
}

export function ArticleDetailDepth({ slug }: { slug: string }) {
  const sections = contentDetailSections.filter((section) => section.slug === slug);
  if (sections.length === 0) return null;

  return (
    <section className="lgo-panel lgo-article-depth" aria-labelledby="article-detail-depth-heading">
      <SectionHeading eyebrow="WEB v1.9 article detail" title="Bối cảnh chi tiết cho bài viết">
        Detail page không chỉ lặp summary; mỗi section nói rõ ý nghĩa cho người chơi và non-claim cần giữ.
      </SectionHeading>
      <div id="article-detail-depth-heading" className="lgo-article-depth-grid">
        {sections.map((section) => (
          <article className="lgo-article-depth-card" key={`${section.slug}-${section.heading}`}>
            <span className="lgo-card-kicker">Detail section</span>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
            <p><strong>Ý nghĩa cho người chơi:</strong> {section.playerImpact}</p>
            <small>{section.nonClaim}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GuideDetailDepth({ slug }: { slug: string }) {
  const steps = guideDetailSteps.filter((step) => step.slug === slug);
  if (steps.length === 0) return null;

  return (
    <section className="lgo-panel lgo-guide-detail-depth" aria-labelledby="guide-detail-depth-heading">
      <SectionHeading eyebrow="WEB v1.9 guide detail" title="Các bước guide có kết quả mong đợi và blocked scope">
        Guide detail là static public content. Không claim wiki backend, quest database, support ticket hoặc entitlement.
      </SectionHeading>
      <div id="guide-detail-depth-heading" className="lgo-guide-detail-steps">
        {steps.map((step) => (
          <article className="lgo-guide-detail-step" key={`${step.slug}-${step.step}`}>
            <span>{step.step}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.action}</p>
              <p><strong>Kết quả mong đợi:</strong> {step.expectedResult}</p>
              <small>{step.blockedScope}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DownloadExplanationDepth() {
  return (
    <section className="lgo-panel lgo-download-explainers" aria-labelledby="download-explainers-heading">
      <SectionHeading eyebrow="WEB v1.9 download explanation" title="Giải thích trạng thái tải game sâu hơn">
        Người chơi cần biết vì sao chưa có download, cần điều kiện gì để mở closed testing, và vì sao web không tạo entitlement giả.
      </SectionHeading>
      <Grid id="download-explainers-heading">
        {downloadExplainers.map((item) => (
          <GameCard key={item.title}>
            <StatusBadge tone={toneForStatus(item.status)}>{item.status}</StatusBadge>
            <h3>{item.title}</h3>
            <p>{item.explanation}</p>
            <p><strong>{item.nextAction}</strong></p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function StatusExplanationDepth() {
  return (
    <section className="lgo-panel lgo-status-explainers" aria-labelledby="status-explainers-heading">
      <SectionHeading eyebrow="WEB v1.9 status transparency" title="Status public phải tách rõ public, internal và blocked">
        Status page không được biến runtime guardrail thành release readiness hoặc live service claim.
      </SectionHeading>
      <Grid id="status-explainers-heading">
        {statusExplainers.map((item) => (
          <GameCard key={item.label}>
            <StatusBadge tone={toneForStatus(item.visibility)}>{item.visibility}</StatusBadge>
            <h3>{item.label}</h3>
            <p>{item.detail}</p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function DetailPageNextSteps() {
  return (
    <section className="lgo-detail-next-steps" aria-label="News and guide detail next steps">
      <div>
        <StatusBadge tone="spirit">WEB v1.9 product content</StatusBadge>
        <h2>News, guide, download và status pages đang được làm sâu theo hướng người chơi đọc được ngay.</h2>
        <p>Runtime/browser/e2e chỉ là guardrail sau cùng; nội dung chính vẫn là web public chất lượng hơn.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/news" tone="spirit">Tin tức</LinkButton>
        <LinkButton href="/guides" tone="jade">Hướng dẫn</LinkButton>
        <LinkButton href="/status" tone="gold">Status</LinkButton>
      </div>
    </section>
  );
}
