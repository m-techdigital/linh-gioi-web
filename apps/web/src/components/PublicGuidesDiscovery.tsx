import { localContentRepository } from "@lgo-web/content";
import { ExperienceHero, FeaturedReading, LinkButton, ReadingCatalog, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";
import type { ReadingCatalogGroup } from "@lgo-web/ui";

// Editorial shelves, not new content metadata or an account-aware recommendation model.
const shelfBySlug: Record<string, string> = {
  "gate-entry-guide":"beginner", "beginner-training-loop-guide":"beginner", "world-gameplay-loop-guide":"beginner",
  "download-readiness-guide":"release", "release-trust-and-checksum-guide":"release", "player-trust-release-guide":"release",
  "release-readiness-hub-guide":"release", "closed-tester-information-pack-guide":"release",
  "support-and-community-guide":"community", "community-roadmap-onboarding-guide":"community", "player-safety-support-guide":"community", "faq-search-helpfulness-guide":"community",
  "start-here-content-hub-guide":"reading", "accessibility-readability-guide":"reading", "performance-copy-budget-guide":"reading", "route-continuity-conversion-guide":"reading"
};
const shelves: readonly ReadingCatalogGroup[] = [
  {id:"beginner",label:"Nhập môn",icon:"document"},
  {id:"release",label:"Bản tải & kiểm thử",icon:"shield"},
  {id:"community",label:"Cộng đồng & hỗ trợ",icon:"users"},
  {id:"reading",label:"Đọc website",icon:"monitor"}
];

export function PublicGuidesDiscovery() {
  const entries = localContentRepository.list("guides");
  const featured = entries.find(entry => entry.slug === "world-gameplay-loop-guide") ?? entries[0];
  const groups = entries.some(entry => !shelfBySlug[entry.slug]) ? [...shelves,{id:"other",label:"Hướng dẫn khác",icon:"document" as const}] : shelves;
  return <Stack className="lgo-release-layout lgo-guides-discovery">
    <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy" badge="Linh Giới Online · Cẩm nang" badgeTone="gold"
      kicker="Mỗi câu hỏi · Một lối đọc" title="Hướng dẫn cho Người Thức Tỉnh"
      lead="Tìm đường vào thế giới, hiểu điều kiện bản tải và chuẩn bị phản hồi an toàn. Chọn một nhóm hoặc lọc từ khóa để đi thẳng tới bài cần đọc."
      actions={[{href:"#guide-library",label:"Tìm bài hướng dẫn",tone:"gold"},{href:"/guides/beginner",label:"Dành cho người mới",tone:"neutral"}]}
      detail={<p className="lgo-library-boundary"><ReleaseIcon name="shield"/><span>Không phải wiki trực tuyến.<br/>Hướng dẫn công khai không cấp quyền chơi hoặc lưu tiến trình.</span></p>}
      visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
        {featured ? <FeaturedReading title={featured.title} description={featured.summary} href={`/guides/${featured.slug}`} image={{src:"/game-art/world/dong-mon-skyline.webp",width:1360,height:765,alt:"Minh họa thế giới Linh Giới trên bìa bài hướng dẫn"}}/> : null}</>}/>
    <section id="guide-library" aria-labelledby="guide-library-heading">
      <div className="lgo-release-section-heading"><SectionHeading headingId="guide-library-heading" eyebrow="Thư viện hướng dẫn" title="Tìm đúng bài cần đọc"/><p>Nhóm đọc để định hướng.<br/>Tiêu đề và mô tả giữ nguyên từ bài đã công bố.</p></div>
      <ReadingCatalog entries={entries.map(entry=>({id:entry.slug,title:entry.title,description:entry.summary,href:`/guides/${entry.slug}`,groupId:shelfBySlug[entry.slug]??"other"}))} groups={groups} label="Kết quả hướng dẫn"/>
    </section>
    <aside className="lgo-release-reading-panel lgo-release-frame lgo-library-help" aria-labelledby="guide-help-heading">
      <div><SectionHeading headingId="guide-help-heading" eyebrow="Cần một điểm bắt đầu?" title="Đọc ít hơn, đi đúng hơn"/><p>Trang Bắt đầu giúp chọn lối đọc. Hướng dẫn an toàn giúp chuẩn bị góp ý mà không chia sẻ dữ liệu riêng tư.</p></div>
      <div><LinkButton href="/start" tone="gold">Tìm điểm bắt đầu</LinkButton><LinkButton href="/support/safety" tone="neutral">Hướng dẫn an toàn</LinkButton></div>
    </aside>
  </Stack>;
}
