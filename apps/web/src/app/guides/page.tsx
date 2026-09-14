import { localContentRepository, type ContentEntry } from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, Stack, StatusBadge } from "@lgo-web/ui";
import { PublicPlayerHero } from "../../components/PublicPlayerHero";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hướng dẫn" };

const guideLabelBySlug: Record<string, { title?: string; summary?: string; phase?: string }> = {
  "gate-entry-guide": {
    title: "Vào Cổng Linh",
    summary: "Điểm đọc đầu tiên để hiểu vì sao người chơi bắt đầu ở cổng giới và chưa có cam kết chiến đấu hoặc máy chủ live.",
    phase: "Nhập môn"
  },
  "beginner-training-loop-guide": {
    title: "Vòng tập Đá Luyện",
    summary: "Luồng hiện tại: vào thế giới, gặp Người Giữ Cổng, tương tác Đá Luyện và hiểu ranh giới chưa có chiến đấu thật.",
    phase: "Lối chơi"
  },
  "download-readiness-guide": {
    title: "Điều kiện tải bản build",
    summary: "Giải thích checksum, ghi chú phát hành và phê duyệt owner trước khi xuất hiện CTA tải game thật.",
    phase: "Phát hành"
  },
  "support-and-community-guide": {
    title: "Hỗ trợ và cộng đồng",
    summary: "Cách đọc hỗ trợ, phản hồi và ranh giới cộng đồng khi forum/chat/ticket backend chưa mở.",
    phase: "An toàn"
  },
  "release-trust-and-checksum-guide": {
    title: "Tin cậy phát hành và checksum",
    summary: "Các bằng chứng cần có trước khi tải: artifact, nguồn gốc bản build, giới hạn đã biết và phê duyệt phát hành.",
    phase: "Tin cậy"
  },
  "start-here-content-hub-guide": {
    title: "Bắt đầu đọc website",
    phase: "Điều hướng"
  },
  "performance-copy-budget-guide": {
    title: "Ngân sách copy và hiệu năng",
    phase: "Hiệu năng"
  },
  "route-continuity-conversion-guide": {
    title: "Đi tiếp an toàn giữa các route",
    phase: "Điều hướng"
  },
  "player-trust-release-guide": {
    title: "Từ content-ready tới closed test",
    phase: "Tin cậy"
  },
  "release-readiness-hub-guide": {
    title: "Đọc release readiness",
    phase: "Phát hành"
  },
  "closed-tester-information-pack-guide": {
    title: "Gói thông tin closed tester",
    phase: "Tester"
  },
  "faq-search-helpfulness-guide": {
    title: "Tìm FAQ và gửi feedback hữu ích",
    phase: "Hỗ trợ"
  }
};

function guideTitle(entry: ContentEntry) {
  return guideLabelBySlug[entry.slug]?.title ?? entry.title;
}

function guideSummary(entry: ContentEntry) {
  return guideLabelBySlug[entry.slug]?.summary ?? entry.summary;
}

function guidePhase(entry: ContentEntry, index: number) {
  return guideLabelBySlug[entry.slug]?.phase ?? `Hướng dẫn ${String(index + 1).padStart(2, "0")}`;
}

export default function GuidesPage() {
  const entries = localContentRepository.list("guides");
  const featured = entries.find((entry) => entry.slug === "world-gameplay-loop-guide") ?? entries[0];

  if (!featured) {
    return (
      <WebAppShell>
        <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-guidespage-stack">
          <section className="lgo-panel lgo-guides-index-board">
            <SectionHeading eyebrow="Thư viện hướng dẫn" title="Chưa có guide công khai">
              Nội dung guide vẫn thuộc nguồn content tĩnh của web; không tạo backend hoặc fixture mới ở route này.
            </SectionHeading>
          </section>
        </Stack>
      </WebAppShell>
    );
  }

  const remaining = entries.filter((entry) => entry.slug !== featured.slug);
  const firstGuides = remaining.slice(0, 6);
  const laterGuides = remaining.slice(6);

  return (
    <WebAppShell>
      <Stack className="lgo-player-facing-stack lgo-service-compact-proof-page lgo-guidespage-stack">
        <PublicPlayerHero
          className="lgo-detail-hero-card lgo-guides-index-hero"
          badge="Thư viện hướng dẫn"
          badgeTone="jade"
          kicker="ĐỌC ĐÚNG THỨ TỰ TRƯỚC KHI KỲ VỌNG BẢN TEST"
          title="Hướng dẫn cho Người Thức Tỉnh"
          lead="Bắt đầu từ vòng lặp thế giới, trạng thái tải game và ranh giới hỗ trợ/phát hành để người chơi hiểu Linh Giới Online hiện đang công khai ở mức nào."
          actions={[
            { href: `/guides/${featured.slug}`, label: "Đọc guide chính", tone: "gold" },
            { href: "/start", label: "Bắt đầu chơi", tone: "spirit" },
            { href: "/game/loop", label: "Vòng lặp thế giới", tone: "jade" }
          ]}
          detail={
            <div className="lgo-guides-index-quickmap" aria-label="Trật tự đọc guide">
              <span>01 Cổng Linh</span>
              <span>02 Đá Luyện</span>
              <span>03 Tin cậy tải</span>
              <span>04 Hỗ trợ an toàn</span>
            </div>
          }
        />

        <section className="lgo-panel lgo-guides-index-board" aria-label="Thư viện hướng dẫn Linh Giới">
          <div className="lgo-guides-index-featured">
            <SectionHeading eyebrow="Guide đang ưu tiên" title="Vòng lặp thế giới trước, tin cậy phát hành sau">
              Chọn hướng dẫn theo kịch bản game: vào cổng, hiểu Đá Luyện, rồi mới đọc tải game, hỗ trợ và trạng thái sẵn sàng. Đây là index đọc nhanh, không phải backend hoặc cơ sở dữ liệu nhiệm vụ.
            </SectionHeading>
            <GameCard className="lgo-guides-index-card lgo-guides-index-card-featured">
              <StatusBadge tone="gold">Guide chính</StatusBadge>
              <h3>{guideTitle(featured)}</h3>
              <p>{guideSummary(featured)}</p>
              <LinkButton href={`/guides/${featured.slug}`} tone="gold">Mở hướng dẫn</LinkButton>
            </GameCard>
          </div>

          <div className="lgo-guides-index-shelf">
            <SectionHeading eyebrow="Thư viện hướng dẫn" title="Đọc nhanh theo nhu cầu">
              Các card dùng cùng một nhịp: giai đoạn, tiêu đề, mô tả ngắn và CTA rõ ràng để mobile không thành một danh sách kéo dài khó quét.
            </SectionHeading>
            <Grid className="lgo-guides-index-grid">
              {firstGuides.map((entry, index) => (
                <GameCard className="lgo-guides-index-card" key={entry.slug}>
                  <StatusBadge tone="jade">{guidePhase(entry, index)}</StatusBadge>
                  <h3>{guideTitle(entry)}</h3>
                  <p>{guideSummary(entry)}</p>
                  <LinkButton href={`/guides/${entry.slug}`} tone="jade">Mở hướng dẫn</LinkButton>
                </GameCard>
              ))}
            </Grid>
          </div>
        </section>

        <section className="lgo-panel lgo-guides-index-archive" aria-label="Các guide hỗ trợ kiểm chứng">
          <SectionHeading eyebrow="Đọc thêm" title="Các guide hỗ trợ kiểm chứng">
            Nhóm guide còn lại được nén thành archive để giữ trang index dễ scan trước, nhưng vẫn không làm mất đường dẫn tới nội dung cũ.
          </SectionHeading>
          <Grid className="lgo-guides-index-archive-grid">
            {laterGuides.map((entry, index) => (
              <GameCard className="lgo-guides-index-card lgo-guides-index-card-compact" key={entry.slug}>
                <StatusBadge tone="spirit">{guidePhase(entry, index + firstGuides.length)}</StatusBadge>
                <h3>{guideTitle(entry)}</h3>
                <p>{guideSummary(entry)}</p>
                <LinkButton href={`/guides/${entry.slug}`} tone="spirit">Mở</LinkButton>
              </GameCard>
            ))}
          </Grid>
        </section>
      </Stack>
    </WebAppShell>
  );
}
