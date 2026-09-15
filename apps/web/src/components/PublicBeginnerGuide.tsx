import { beginnerGuideSections } from "@lgo-web/content";
import { ExperienceHero, GuideArticle, LinkButton, ReleaseIcon, SectionHeading, Stack } from "@lgo-web/ui";

// These destinations follow the authored step actions; they do not execute game commands.
const destinations: Record<string,{href:string;label:string}> = {
  "01":{href:"/download",label:"Đọc trạng thái bản tải"},
  "02":{href:"/game",label:"Khám phá thế giới"},
  "03":{href:"/roadmap",label:"Đọc lộ trình"},
  "04":{href:"/support",label:"Đọc hướng dẫn hỗ trợ"}
};

export function PublicBeginnerGuide() {
  return <Stack className="lgo-release-layout lgo-beginner-guide">
    <nav className="lgo-article-breadcrumbs" aria-label="Đường dẫn nhập môn"><a href="/guides">Cẩm nang</a><span aria-hidden="true">/</span><span aria-current="page">Dành cho người mới</span></nav>
    <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-guide-article-hero" copyClassName="lgo-release-hero-copy"
      badge="Linh Giới Online · Bước đọc đầu tiên" badgeTone="gold" kicker="Hiểu trạng thái · Khám phá · Theo dõi · Góp ý"
      title="Hướng dẫn người chơi mới" lead="Bốn việc cần biết khi mới đến Linh Giới: đọc điều kiện bản tải, hiểu thế giới, theo dõi lộ trình và chuẩn bị phản hồi. Mỗi bước dẫn tới thông tin đang có trên website."
      actions={[{href:"#beginner-step-01",label:"Bắt đầu từ bước một",tone:"gold"},{href:"/guides",label:"Tìm bài hướng dẫn",tone:"neutral"}]}
      detail={<p className="lgo-article-hero-boundary"><ReleaseIcon name="shield"/>Không phải nhiệm vụ trong game. Đọc hướng dẫn không tạo tài khoản, cấp bản tải hoặc lưu tiến trình.</p>}
      visual={<figure className="lgo-article-cover"><img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Minh họa thế giới Linh Giới dành cho cẩm nang người mới" fetchPriority="high"/>
        <figcaption><span>CHỌN ĐƯỜNG ĐỌC, GIỮ ĐÚNG KỲ VỌNG</span><strong>Một điểm bắt đầu rõ ràng</strong><small>Tranh minh họa · Không phải bản dựng gameplay</small></figcaption></figure>}/>
    <GuideArticle contentsId="beginner-contents" contentsLabel="Mục lục nhập môn"
      intro={<><span className="lgo-article-intro-label">Trước khi tìm bản chơi</span><p>Bốn bước dưới đây giữ nguyên nội dung nhập môn đã biên soạn. Mỗi phần nói rõ điều cần đọc, mẹo định hướng và giới hạn hiện tại; không đánh dấu nhiệm vụ hoặc cấp quyền truy cập.</p></>}
      sections={beginnerGuideSections.map(step => {
        const destination = destinations[step.step];
        return {id:`beginner-step-${step.step}`,marker:step.step,title:step.title,
          body:<><p className="lgo-article-instruction">{step.action}</p>
            <div className="lgo-article-outcome"><h3><ReleaseIcon name="document"/>Gợi ý cho người mới</h3><p>{step.playerTip}</p></div>
            <div className="lgo-article-boundary"><h3><ReleaseIcon name="lock"/>Giới hạn trong nguồn biên soạn</h3><p>{step.blockedScope}</p></div>
            {destination ? <LinkButton className="lgo-beginner-reading-action" href={destination.href} tone="neutral">{destination.label} <ReleaseIcon name="arrow"/></LinkButton> : null}</>};
      })}/>
    <section className="lgo-article-related lgo-release-frame" aria-labelledby="beginner-next-heading">
      <div><SectionHeading headingId="beginner-next-heading" eyebrow="Còn muốn đọc kỹ hơn?" title="Đi tiếp bằng thông tin rõ ràng"/><p>Bài vòng lặp thế giới giải thích từng điểm nhập môn. Hướng dẫn an toàn giúp chuẩn bị góp ý; những liên kết này không mở phiên chơi hoặc gửi phiếu hỗ trợ.</p><small>NO_ACCEPTED_BACKEND_CONTRACT</small></div>
      <div className="lgo-article-related-actions"><LinkButton href="/guides/world-gameplay-loop-guide" tone="gold">Đọc vòng lặp thế giới</LinkButton><LinkButton href="/support/safety" tone="neutral">Chuẩn bị phản hồi an toàn</LinkButton><LinkButton href="/community" tone="neutral">Đọc về cộng đồng</LinkButton></div>
    </section>
  </Stack>;
}
