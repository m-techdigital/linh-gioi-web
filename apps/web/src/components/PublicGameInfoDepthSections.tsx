import {
  beginnerGuideSections,
  communityReadinessSteps,
  downloadStatusNotes,
  supportFaqs,
  worldStoryChapters
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

function publicGuideText(value: string) {
  return value
    .replaceAll("accepted API/RBAC/audit contract", "hợp đồng API/RBAC/audit đã được chấp nhận")
    .replaceAll("Ticket/account lookup", "Tra cứu ticket/tài khoản")
    .replaceAll("Support/Community", "Hỗ trợ/Cộng đồng")
    .replaceAll("Gate Keeper", "Người Giữ Cổng")
    .replaceAll("Training Stone", "Đá Luyện")
    .replaceAll("Spirit Gate", "Cổng Linh")
    .replaceAll("release artifact", "artifact phát hành")
    .replaceAll("owner approval", "phê duyệt owner")
    .replaceAll("public web", "web công khai")
    .replaceAll("backend contract", "hợp đồng backend")
    .replaceAll("production deployment", "triển khai vận hành thật")
    .replaceAll("live server", "máy chủ live")
    .replaceAll("live shard MMO", "shard MMO live")
    .replaceAll("player journey", "hành trình người chơi")
    .replaceAll("branching quest", "nhánh nhiệm vụ")
    .replaceAll("dialogue persistence", "lưu hội thoại")
    .replaceAll("closed testing", "thử nghiệm kín")
    .replaceAll("non-combat", "chưa chiến đấu")
    .replaceAll("non‑combat", "chưa chiến đấu")
    .replaceAll("production", "vận hành thật")
    .replaceAll("contract", "hợp đồng")
    .replaceAll("claim", "cam kết");
}

function publicBoundaryLabel(value: string) {
  const labels: Record<string, string> = {
    "No production world map, no live server event, no MMO shard claim.": "Chưa có bản đồ vận hành thật, sự kiện máy chủ live hoặc shard MMO.",
    "No production quest system, no dialogue backend, no account lookup.": "Chưa có hệ thống nhiệm vụ vận hành thật, backend hội thoại hoặc tra cứu tài khoản.",
    "No combat damage, no HP, no loot, no skill economy.": "Chưa có sát thương chiến đấu, HP, loot hoặc kinh tế kỹ năng.",
    "No public launcher, no production persistence, no paid access.": "Chưa có launcher công khai, lưu trữ vận hành thật hoặc quyền truy cập trả phí.",
    "No public game download artifact.": "Chưa có artifact tải game công khai.",
    "No full combat/wiki/quest database.": "Chưa có cơ sở dữ liệu combat, wiki hoặc nhiệm vụ đầy đủ.",
    "WEB-08 backend contract sync remains blocked.": "Đồng bộ hợp đồng backend WEB-08 vẫn đang bị chặn.",
    "No support ticket backend or live community backend.": "Chưa có backend ticket hỗ trợ hoặc cộng đồng live.",
  };
  return labels[value] ?? value;
}

function supportScopeLabel(scope: string) {
  if (scope === "static public guidance") return "hướng dẫn tĩnh";
  if (scope === "auth non-claim") return "chưa claim tài khoản thật";
  if (scope === "gameplay non-claim") return "chưa claim gameplay live";
  if (scope === "governance") return "ranh giới backend";
  if (scope === "privacy-safe issue reporting") return "báo lỗi an toàn";
  if (scope === "closed-test support non-claim") return "chưa claim hỗ trợ live";
  return scope;
}

export function WorldStoryDepth() {
  return (
    <section className="lgo-panel lgo-depth-panel" aria-labelledby="world-story-depth-heading">
      <SectionHeading eyebrow="Nền tảng thế giới" title="Câu chuyện thế giới được giải thích theo nhịp người chơi" />
      <div id="world-story-depth-heading" className="lgo-story-chapters">
        {worldStoryChapters.map((chapter) => (
          <article className="lgo-story-chapter" key={chapter.id}>
            <span className="lgo-card-kicker">{chapter.subtitle}</span>
            <h3>{publicGuideText(chapter.title)}</h3>
            <p>{publicGuideText(chapter.summary)}</p>
            <p><strong>Người chơi hiểu:</strong> {publicGuideText(chapter.playerTakeaway)}</p>
            <small>{publicBoundaryLabel(chapter.nonClaim)}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BeginnerGuideDepth() {
  return (
    <section className="lgo-panel lgo-guide-panel" aria-labelledby="beginner-guide-depth-heading">
      <SectionHeading eyebrow="Guide nhập môn" title="Hướng dẫn người chơi mới theo 4 bước rõ ràng">
        Đây là hướng dẫn công khai tĩnh để người chơi hiểu trạng thái hiện tại; không phải quest, wiki hoặc backend production.
      </SectionHeading>
      <div id="beginner-guide-depth-heading" className="lgo-guide-steps">
        {beginnerGuideSections.map((item) => (
          <article className="lgo-guide-step" key={item.step}>
            <span>{item.step}</span>
            <div>
              <h3>{publicGuideText(item.title)}</h3>
              <p>{publicGuideText(item.action)}</p>
              <p><strong>Mẹo:</strong> {publicGuideText(item.playerTip)}</p>
              <small>{publicBoundaryLabel(item.blockedScope)}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DownloadStatusDepth() {
  return (
    <section className="lgo-panel lgo-download-depth" aria-labelledby="download-status-depth-heading">
      <SectionHeading eyebrow="Trạng thái tải game" title="Trạng thái tải game cần nói thật, không tạo cảm giác có build giả" />
      <Grid id="download-status-depth-heading">
        {downloadStatusNotes.map((note) => (
          <GameCard key={publicGuideText(note.label)}>
            <StatusBadge tone="gold">{note.owner}</StatusBadge>
            <h3>{publicGuideText(note.label)}</h3>
            <p>{publicGuideText(note.condition)}</p>
            <p><strong>{publicGuideText(note.playerMessage)}</strong></p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function SupportFaqDepth() {
  return (
    <section className="lgo-panel lgo-faq-panel" aria-labelledby="support-faq-depth-heading">
      <SectionHeading eyebrow="FAQ nhanh" title="FAQ nói thẳng về tải game, tài khoản, chiến đấu và hợp đồng backend" />
      <div id="support-faq-depth-heading" className="lgo-faq-list">
        {supportFaqs.map((faq) => (
          <article className="lgo-faq-item" key={publicGuideText(faq.question)}>
            <StatusBadge tone="jade">{supportScopeLabel(faq.scope)}</StatusBadge>
            <h3>{publicGuideText(faq.question)}</h3>
            <p>{publicGuideText(faq.answer)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CommunityReadinessDepth() {
  return (
    <section className="lgo-panel" aria-labelledby="community-readiness-depth-heading">
      <SectionHeading eyebrow="Community readiness" title="Chuẩn bị cộng đồng mà không hứa chat/forum/guild backend" />
      <Grid id="community-readiness-depth-heading">
        {communityReadinessSteps.map((step) => (
          <GameCard key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.purpose}</p>
            <p><strong>Hiện tại:</strong> {step.currentState}</p>
            <p><strong>Gate sau:</strong> {step.futureGate}</p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function GameInfoDepthCta() {
  return (
    <section className="lgo-depth-cta" aria-label="Game information depth next paths">
      <div>
        <StatusBadge tone="spirit">Game info depth</StatusBadge>
        <h2>WEB v1.8 ưu tiên nội dung game public: lore, beginner guide, download status, FAQ và community readiness.</h2>
        <p>Runtime/browser/e2e vẫn là guardrail, không phải trọng tâm phát triển web.</p>
      </div>
      <div className="lgo-product-first-actions">
        <LinkButton href="/guides" tone="jade">Đọc hướng dẫn</LinkButton>
        <LinkButton href="/support" tone="gold">Xem FAQ</LinkButton>
      </div>
    </section>
  );
}
