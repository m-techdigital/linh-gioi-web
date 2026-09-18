import { beginnerExpectations, gameplayLoopStages, gameplayScopeBoundaries, guideWorldNavigationLinks } from "@lgo-web/content";
import { ExperienceHero, LinkButton, QuestionDisclosureList, ReadingJourney, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { ReadingJourneyStep } from "@lgo-web/ui";

const labels: Record<string,string> = {
  "spirit-gate-entry":"Tìm hiểu cổng vào", "gate-keeper-orientation":"Nghe người dẫn đường",
  "training-stone-practice":"Hiểu vòng luyện tập", "return-to-trust-status":"Đối chiếu bản tải"
};
const actions: Record<string,string> = {
  "/game":"Khám phá thế giới", "/guides/world-gameplay-loop-guide":"Đọc hướng dẫn vòng chơi",
  "/guides/beginner":"Đọc hướng dẫn nhập môn", "/download/trust":"Kiểm tra bản tải"
};
const readingSteps: readonly ReadingJourneyStep[] = gameplayLoopStages.map(stage => ({
  id:stage.id, title:labels[stage.id] ?? stage.title, summary:stage.playerAction,
  detail:stage.expectedFeeling, note:`Tên nguồn: ${stage.title}. Giới hạn mô tả: ${stage.currentBoundary}`,
  href:stage.route, action:actions[stage.route] ?? "Đọc hướng dẫn"
}));

export function PublicWorldLoopHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Hành trình nhập môn" badgeTone="gold" kicker="Vào cổng · Được dẫn đường · Hiểu cách luyện tập"
    title="Vòng lặp gameplay thế giới" lead="Bắt đầu bằng một điểm đến rõ ràng. Tìm hiểu cổng vào, người dẫn đường và bia luyện tập, rồi đối chiếu điều kiện bản tải trước khi kỳ vọng bước vào game."
    actions={[{href:"#loop-reading",label:"Đọc bốn bước",tone:"gold"},{href:"/game",label:"Khám phá thế giới",tone:"neutral"}]}
    detail={<p className="lgo-release-art-note">Minh họa định hướng · Không phải client hoặc máy chủ đang chạy</p>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <figure className="lgo-loop-vista lgo-release-frame">
        <img src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="Minh họa cổng thành và kiến trúc Linh Giới giữa núi mây"/>
        <figcaption><span>LINH GIỚI · MỘT ĐIỂM KHỞI ĐẦU</span><strong>Hiểu đường đi trước khi bước tới</strong><small>Tranh thế giới, không phải bằng chứng tính năng đã mở.</small></figcaption>
      </figure></>}/>;
}
export function PublicWorldLoopReading() {
  return <section id="loop-reading" aria-labelledby="loop-reading-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="loop-reading-heading" eyebrow="Chọn một bước để đọc kỹ" title="Bốn điểm đọc trên hành trình"/><p>Thứ tự đọc từ nguồn biên soạn.<br/>Không phải nhiệm vụ hoặc tiến trình trong game.</p></div>
    <ReadingJourney columns={4} steps={readingSteps} label="Bốn bước đọc vòng lặp thế giới" boundary="Chỉ thay đổi bước đang xem trên trang này; không lưu tiến trình nhân vật, không hoàn thành nhiệm vụ và không nhận thưởng. Tải lại trang để về bước đầu."/>
  </section>;
}
export function PublicWorldLoopQuestionsAndScope() {
  return <div className="lgo-release-reading-grid lgo-release-reading-grid-even">
    <section id="loop-questions" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="loop-questions-heading">
      <SectionHeading headingId="loop-questions-heading" eyebrow="Hiểu rõ trước khi kỳ vọng" title="Người mới thường hỏi"/>
      <QuestionDisclosureList items={beginnerExpectations.map((item,index) => ({id:`loop-question-${index}`,question:item.topic,answer:<><p>{item.promiseNow}</p><p><strong>Chưa được khẳng định:</strong> {item.notYet}</p><LinkButton href={item.recommendedReading} tone="neutral">Đọc thêm về chủ đề này</LinkButton></>}))}/>
    </section>
    <aside className="lgo-release-paper-panel lgo-release-frame" aria-labelledby="loop-scope-heading">
      <ReleaseIcon name="lock"/><SectionHeading headingId="loop-scope-heading" eyebrow="Hướng dẫn không thay thế bản dựng" title="Đây chưa phải game trên web"/>
      <p><strong>Đang đọc, không phải đang chơi.</strong> Spirit Gate, Gate Keeper và Training Stone chỉ là điểm định hướng trong nội dung website; nút “Xem bước này” chỉ mở phần giải thích.</p>
      <p>Trang này không có mô phỏng combat, HP, sát thương, kỹ năng, vật phẩm, nhiệm vụ lưu máy chủ, phần thưởng hay quyền truy cập tài khoản.</p>
      <LinkButton href="/download/trust" tone="neutral">Đọc điều kiện bản tải</LinkButton>
      <p className="lgo-loop-contract-note">NO_ACCEPTED_BACKEND_CONTRACT</p>
    </aside>
  </div>;
}
export function PublicWorldLoopRoutes() {
  const titles: Record<string,string> = {"/game/loop":"Đọc vòng lặp thế giới","/guides/world-gameplay-loop-guide":"Hướng dẫn từng bước","/download/trust":"Tin cậy bản tải","/support":"Chuẩn bị góp ý"};
  return <section aria-labelledby="loop-routes-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="loop-routes-heading" eyebrow="Từ hướng dẫn tới thông tin cần biết" title="Đi tiếp mà không lạc hướng"/><p>Liên kết tới nội dung đang có, không phải lệnh trong game.</p></div>
    <div className="lgo-loop-route-grid">{guideWorldNavigationLinks.map(item => <article className="lgo-release-reading-panel lgo-release-frame" key={`${item.from}-${item.to}`}>
      <ReleaseIcon name="arrow"/><h3>{titles[item.to] ?? item.to}</h3><p>{item.reason}</p>
      <LinkButton href={item.to} tone="neutral">Mở hướng dẫn</LinkButton>
      <details className="lgo-release-gate-proof"><summary>Nguồn &amp; phạm vi <span aria-hidden="true">+</span></summary><div><p>{item.safeExpectation}</p><small>{item.from} → {item.to}</small></div></details>
    </article>)}</div>
  </section>;
}
export function PublicWorldLoopSourceNotes() {
  return <details className="lgo-release-more-evidence"><summary>Phạm vi mô tả và bằng chứng còn cần <span aria-hidden="true">+</span></summary>
    <QuestionDisclosureList items={gameplayScopeBoundaries.map((item,index) => ({id:`loop-boundary-${index}`,question:item.surface,answer:<><p>{item.currentTruth}</p><p><strong>Bằng chứng cần có:</strong> {item.nextProofNeeded}</p><p>{item.forbiddenClaim}</p></>}))}/>
  </details>;
}
