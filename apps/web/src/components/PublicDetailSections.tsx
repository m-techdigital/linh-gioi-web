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

const articleDetailTitles: Record<string, string> = {
  "web-program-control-tower": "Bài viết giải thích governance web độc lập",
  "public-ux-content-polish-started": "Bài viết giải thích polish UX public",
  "visual-responsive-polish-started": "Bài viết giải thích visual và responsive",
  "public-game-info-depth-started": "Bài viết giải thích thông tin game public",
  "news-guide-detail-pages-started": "Bài viết giải thích news và guide detail",
  "status-download-trust-polish-started": "Bài viết giải thích status và download trust",
  "closed-tester-information-pack-started": "Bài viết giải thích closed tester information pack",
};

function articleDetailTitle(slug: string) {
  return articleDetailTitles[slug] ?? "Bài viết giải thích nội dung public";
}

function vietnameseStatusLabel(status: string) {
  if (status === "public") return "công khai";
  if (status === "internal") return "nội bộ";
  if (status === "blocked") return "tạm khóa";
  if (status === "ready") return "sẵn sàng";
  if (status === "planned") return "đã lên kế hoạch";
  return status;
}

export function ArticleDetailDepth({ slug }: { slug: string }) {
  const sections = contentDetailSections.filter((section) => section.slug === slug);
  if (sections.length === 0) return null;

  return (
    <section className="lgo-panel lgo-article-depth lgo-newsdetail-depth" aria-labelledby="article-detail-depth-heading">
      <SectionHeading eyebrow="Chi tiết bài viết" title={articleDetailTitle(slug)}>
        Trang bài viết mở rộng ngữ cảnh người chơi cần biết, tác động thực tế và ranh giới không tuyên bố quá phạm vi phải giữ.
      </SectionHeading>
      <div id="article-detail-depth-heading" className="lgo-article-depth-grid lgo-newsdetail-depth-grid">
        {sections.map((section) => (
          <article className="lgo-article-depth-card lgo-newsdetail-depth-card" key={`${section.slug}-${section.heading}`}>
            <span className="lgo-card-kicker">Chi tiết bài viết</span>
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
      <SectionHeading eyebrow="Chi tiết hướng dẫn" title="Các bước guide có kết quả mong đợi và phạm vi tạm khóa">
        Trang hướng dẫn là nội dung public tĩnh. Không công bố wiki vận hành, cơ sở dữ liệu nhiệm vụ, ticket hỗ trợ hoặc quyền tải game.
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
    <section className="lgo-panel lgo-service-proof-card-grid lgo-status-explainers" aria-labelledby="status-explainers-heading">
      <SectionHeading eyebrow="Minh bạch trạng thái" title="Tách rõ công khai, nội bộ và tạm khóa">
        Trang trạng thái không được biến guardrail kỹ thuật thành readiness phát hành hoặc claim live service.
      </SectionHeading>
      <Grid id="status-explainers-heading">
        {statusExplainers.map((item) => (
          <GameCard className="lgo-service-proof-card" key={item.label}>
            <StatusBadge tone={toneForStatus(item.visibility)}>{vietnameseStatusLabel(item.visibility)}</StatusBadge>
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
    <section className="lgo-detail-next-steps lgo-newsdetail-next-steps" aria-label="News and guide detail next steps">
      <div>
        <StatusBadge tone="spirit">Nội dung public tĩnh</StatusBadge>
        <h2>Tin tức, hướng dẫn, tải game và trạng thái đang được làm sâu theo hướng người chơi đọc được ngay.</h2>
        <p>Kiểm tra trình duyệt/e2e là bằng chứng layout; nội dung vẫn là web public rõ ràng, không tuyên bố backend vận hành chính thức.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/news" tone="spirit">Tin tức</LinkButton>
        <LinkButton href="/guides" tone="jade">Hướng dẫn</LinkButton>
        <LinkButton href="/status" tone="gold">Trạng thái</LinkButton>
      </div>
    </section>
  );
}
