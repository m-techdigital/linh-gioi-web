import {mobileDensityBudgets, perceivedLoadSignals, performanceCopyBudgetPrinciples, staticRouteCompositionRules} from "@lgo-web/content";
import {ExperienceHero, LinkButton, QuestionDisclosureList, ReadingPreview, ReleaseIcon, SectionHeading} from "@lgo-web/ui";
import type {ReleaseIconName} from "@lgo-web/ui";

const routeLabels: Record<string, {title: string; summary: string; icon: ReleaseIconName}> = {
  "/performance": {title: "Nguyên tắc đọc nhẹ", summary: "Nội dung cần thiết trước, phần chi tiết mở khi cần.", icon: "document"},
  "/download/trust": {title: "Tin cậy bản tải", summary: "Đọc nguồn gốc và điều kiện phát hành trước khi tìm nút tải.", icon: "download"},
  "/game/loop": {title: "Hiểu vòng chơi", summary: "Phân biệt định hướng thế giới với tính năng đã hoạt động.", icon: "signal"},
  "/support/safety": {title: "Phản hồi an toàn", summary: "Chuẩn bị mô tả rõ ràng, không gửi thông tin riêng tư.", icon: "shield"}
};

export function PublicPerformanceHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-performance-hero" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Trải nghiệm đọc" badgeTone="gold" kicker="Ít nhiễu hơn · Quyết định rõ hơn"
    title="Hiệu năng và ngân sách nội dung" lead="Đọc điều quan trọng trước. Mở chi tiết khi cần. Thử khoảng cách nội dung và chọn có tải thêm minh họa trong một khung đọc riêng."
    actions={[{href:"#performance-preview",label:"Thử cách đọc",tone:"gold"},{href:"/accessibility",label:"Hướng dẫn dễ đọc",tone:"neutral"}]}
    detail={<p className="lgo-performance-hero-note"><ReleaseIcon name="shield"/>Trải nghiệm thử tại chỗ, không phải báo cáo tốc độ website.</p>}
    visual={<section className="lgo-performance-priority-console" aria-labelledby="performance-priority-heading">
      <div className="lgo-performance-crest" aria-hidden="true"><ReleaseIcon name="document"/></div>
      <span className="lgo-performance-console-overline">Ngân sách cho sự chú ý</span>
      <h2 id="performance-priority-heading">Rõ trước.<br/><em>Đẹp vừa đủ.</em></h2>
      <ol><li><span>Nội dung</span><strong>Điều cần biết nằm trước</strong></li><li><span>Minh họa</span><strong>Tải thêm khi bạn chọn</strong></li><li><span>Chi tiết</span><strong>Mở rộng, không cắt bỏ</strong></li></ol>
      <small>Không gắn điểm số cho điều chưa đo.</small>
    </section>}/>;
}
export function PublicPerformanceWorkshop() {
  return <section id="performance-preview" aria-labelledby="performance-preview-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="performance-preview-heading" eyebrow="Khung thử có thể thao tác" title="Chọn nhịp đọc của bạn"/><p>Cùng một nội dung, khác khoảng cách.<br/>Thay đổi chỉ áp dụng trong khung thử.</p></div>
    <ReadingPreview title="Đọc trước khi vào Linh Giới" image={{src:"/game-art/world/dong-mon-skyline.webp",alt:"Minh họa cảnh quan Linh Giới, không phải ảnh gameplay",width:1360,height:765}}>
      <p>Linh Giới Online hiện chưa có bản tải công khai. Hãy đọc trạng thái phát hành trước khi tìm đường vào game.</p>
      <p>Gói tải cần có nguồn gốc, checksum và cổng duyệt rõ ràng. Hướng dẫn trên website không tự cấp quyền chơi hoặc quyền thử nghiệm.</p>
      <p>Chỉ chia sẻ mô tả vấn đề và các bước tái hiện. Giữ riêng mật khẩu, token và dữ liệu cá nhân.</p>
    </ReadingPreview>
  </section>;
}
export function PublicPerformanceMeasurement() {
  return <section id="performance-measurement" className="lgo-performance-measurement lgo-release-frame" aria-labelledby="performance-measurement-heading">
    <SectionHeading headingId="performance-measurement-heading" eyebrow="Phân biệt hướng dẫn và bằng chứng" title="Chưa có số đo production"/>
    <p>Không phải kết quả benchmark. Thao tác trong khung thử không xác nhận điểm số, thời gian tải, FPS hoặc hiệu năng trên thiết bị của bạn.</p>
    <dl className="lgo-measurement-boundary">
      <div><dt>Core Web Vitals</dt><dd><strong>Chưa công bố</strong><span>Không có dữ liệu người dùng thực để kết luận.</span></dd></div>
      <div><dt>Lighthouse</dt><dd><strong>Chưa chứng nhận</strong><span>Không đưa điểm giả hoặc suy ra từ test giao diện.</span></dd></div>
      <div><dt>Hạ tầng ảnh</dt><dd><strong>Chưa có CDN riêng</strong><span>Minh họa mẫu là tài nguyên trong repo hiện tại.</span></dd></div>
    </dl>
    <small>Hướng dẫn frontend · Không có giám sát production · NO_ACCEPTED_BACKEND_CONTRACT</small>
  </section>;
}
export function PublicPerformancePrinciples() {
  return <section id="performance-principles" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="performance-principles-heading">
    <SectionHeading headingId="performance-principles-heading" eyebrow="Đọc lợi ích trước, mở chi tiết sau" title="Nội dung nhẹ, không mất ý"/>
    <QuestionDisclosureList items={performanceCopyBudgetPrinciples.map(item=>({id:`performance-${item.id}`,question:item.title,answer:<><p>{item.playerBenefit}</p><p>{item.implementationNote}</p><small>{item.nonClaim}</small></>}))}/>
  </section>;
}
export function PublicPerformanceRoutes() {
  return <section id="performance-routes" aria-labelledby="performance-routes-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="performance-routes-heading" eyebrow="Đi đúng trang, đọc đúng phần" title="Các lối đọc liên quan"/><p>Định hướng biên soạn trong source.<br/>Không phải báo cáo tối ưu của từng trang.</p></div>
    <div className="lgo-performance-route-grid">{staticRouteCompositionRules.map(item=>{
      const label=routeLabels[item.route];
      return <article className="lgo-performance-route-tile" key={item.route}>
        <ReleaseIcon name={label?.icon ?? "document"}/><h3>{label?.title ?? item.route}</h3><p>{label?.summary ?? item.copyBudget}</p>
        <LinkButton href={item.route} tone="neutral">Đọc hướng dẫn <ReleaseIcon name="arrow"/></LinkButton>
        <details><summary>Ghi chú trong source <span aria-hidden="true">+</span></summary><div><p>{item.staticSurface}</p><p>{item.copyBudget}</p><p>{item.cssAssetRule}</p><small>{item.fallbackMessage}</small></div></details>
      </article>;
    })}</div>
  </section>;
}
export function PublicPerformanceNotes() {
  const items=[
    ...perceivedLoadSignals.map((item,index)=>({id:`performance-load-${index}`,question:item.playerFeeling,answer:<><p>{item.copyTreatment}</p><small>{item.mustAvoid}</small></>})),
    ...mobileDensityBudgets.map((item,index)=>({id:`performance-density-${index}`,question:item.surface,answer:<><p>{item.densityTarget}</p><p>{item.treatment}</p><small>{item.failureToAvoid}</small></>}))
  ];
  return <details className="lgo-release-more-evidence"><summary>Nhịp đọc mobile và tín hiệu tải nội dung <span aria-hidden="true">+</span></summary><QuestionDisclosureList items={items}/></details>;
}
