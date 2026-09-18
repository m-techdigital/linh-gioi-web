import {mobileDensityBudgets, perceivedLoadSignals, performanceCopyBudgetPrinciples, staticRouteCompositionRules} from "@lgo-web/content";
import {ExperienceHero, LinkButton, QuestionDisclosureList, ReadingPreview, ReadingPriorityPanel, ReleaseIcon, SectionHeading} from "@lgo-web/ui";
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
    title="Đọc nhẹ và rõ trên thiết bị của bạn" lead="Ưu tiên nội dung cần biết, khoảng cách dễ đọc và minh họa chỉ khi bạn chọn. Khung thử bên dưới giúp bạn xem cách trình bày thay đổi mà không đo hay thay đổi thiết bị."
    actions={[{href:"#performance-preview",label:"Thử cách đọc",tone:"gold"},{href:"/accessibility",label:"Hướng dẫn dễ đọc",tone:"neutral"}]}
    visual={<ReadingPriorityPanel headingId="performance-priority-heading" overline="Ngân sách cho sự chú ý"
      title={<>Rõ trước.<br/><em>Đẹp vừa đủ.</em></>}
      items={[{label:"Nội dung",value:"Điều cần biết nằm trước"},{label:"Minh họa",value:"Tải thêm khi bạn chọn"},{label:"Chi tiết",value:"Mở rộng, không cắt bỏ"}]}
      note="Không gắn điểm số cho điều chưa đo."/>}/>;
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
    <SectionHeading headingId="performance-measurement-heading" eyebrow="Ranh giới của khung thử" title="Điều khung thử không đo"/>
    <p>Không phải kết quả benchmark. Các nút chỉ đổi cách trình bày mẫu trên trang này; chúng không đánh giá mạng, máy, FPS hay tốc độ tải của bạn.</p>
    <dl className="lgo-measurement-boundary lgo-performance-guidance-boundary">
      <div><dt>Dữ liệu thực tế</dt><dd><strong>Không có dữ liệu production</strong><span>Core Web Vitals: Chưa công bố. Lighthouse: Chưa chứng nhận. Chưa có CDN riêng. Không suy ra chất lượng thiết bị từ test giao diện.</span></dd></div>
    </dl>
    <small>Chưa có số đo production · Không có giám sát production · NO_ACCEPTED_BACKEND_CONTRACT</small>
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
      </article>;
    })}</div>
  </section>;
}
export function PublicPerformanceNotes() {
  const items=[
    ...perceivedLoadSignals.map((item,index)=>({id:`performance-load-${index}`,question:item.playerFeeling,answer:<><p>{item.copyTreatment}</p><small>{item.mustAvoid}</small></>})),
    ...mobileDensityBudgets.map((item,index)=>({id:`performance-density-${index}`,question:item.surface,answer:<><p>{item.densityTarget}</p><p>{item.treatment}</p><small>{item.failureToAvoid}</small></>}))
  ];
  return <details className="lgo-release-more-evidence"><summary>Mẹo giữ trải nghiệm đọc gọn trên mobile <span aria-hidden="true">+</span></summary><QuestionDisclosureList items={items}/></details>;
}
