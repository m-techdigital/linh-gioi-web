import {accessibilityReadabilityPrinciples, focusOrderCheckpoints, mobileScannabilityRules, routeReadabilityChecks} from "@lgo-web/content";
import {ExperienceHero, KeyboardPractice, LinkButton, QuestionDisclosureList, ReleaseIcon, SectionHeading} from "@lgo-web/ui";
import type {ReleaseIconName} from "@lgo-web/ui";

const routeLabels: Record<string,{title:string;icon:ReleaseIconName;hint:string}>={
 "/accessibility":{title:"Cách đọc và thao tác",icon:"document",hint:"Nhận biết tiêu đề, viền focus và thứ tự thao tác."},
 "/start":{title:"Bắt đầu từ đâu",icon:"arrow",hint:"Chọn đường đọc theo câu hỏi của người mới."},
 "/download/trust":{title:"Tin cậy bản tải",icon:"download",hint:"Đọc điều kiện tải và nguồn gốc artifact."},
 "/support/safety":{title:"Góp ý an toàn",icon:"shield",hint:"Chuẩn bị phản hồi, giữ riêng dữ liệu."},
 "/game/loop":{title:"Hiểu vòng chơi",icon:"signal",hint:"Phân biệt bản giới thiệu với gameplay đã mở."}
};

export function PublicAccessibilityHero() {
 return <ExperienceHero className="lgo-release-hero lgo-release-frame lgo-accessibility-hero" copyClassName="lgo-release-hero-copy"
  badge="Linh Giới Online · Cùng đọc, cùng khám phá" badgeTone="gold" kicker="Rõ đường đọc · Dễ tìm thao tác"
  title="Dễ đọc và dễ thao tác" lead="Bắt đầu từ tiêu đề, nhận biết điều đang được chọn và đi tiếp theo nhịp của bạn. Thử một lượt thao tác bàn phím ngay trong trang này."
  actions={[{href:"#accessibility-practice",label:"Thử bằng bàn phím",tone:"gold"},{href:"/performance",label:"Thử khoảng cách đọc",tone:"neutral"}]}
  visual={<section className="lgo-keyboard-guide" aria-labelledby="accessibility-keys-heading">
   <span className="lgo-keyboard-practice-overline">Ba thao tác để đi tiếp</span><h2 id="accessibility-keys-heading">Theo phím,<br/><em>không lạc hướng.</em></h2>
   <dl><div><dt><kbd>Tab</kbd></dt><dd>Đi tới điều khiển tiếp theo.</dd></div><div><dt><kbd>Space / Enter</kbd></dt><dd>Thay đổi ô hoặc mở phần hướng dẫn.</dd></div><div><dt><kbd>Shift + Tab</kbd></dt><dd>Quay lại điều khiển trước.</dd></div></dl>
  </section>}/>;
}
export function PublicAccessibilityPractice() {
 return <section id="accessibility-practice" aria-labelledby="accessibility-practice-heading">
  <div className="lgo-release-section-heading"><SectionHeading headingId="accessibility-practice-heading" eyebrow="Thao tác thật, không phải sơ đồ" title="Thử đi một lượt bằng bàn phím"/><p>Không chấm điểm, không thu dữ liệu.<br/>Chuột và cảm ứng vẫn dùng được.</p></div>
  <KeyboardPractice nextHref="#accessibility-routes"/>
 </section>;
}
export function PublicAccessibilityRoutes() {
 return <section id="accessibility-routes" aria-labelledby="accessibility-routes-heading">
  <div className="lgo-release-section-heading"><SectionHeading headingId="accessibility-routes-heading" eyebrow="Chọn đúng điều cần đọc" title="Các lối đọc rõ ràng"/><p>Mỗi liên kết mở một hướng dẫn đang có.</p></div>
  <nav className="lgo-release-shortcuts" aria-label="Chọn lối đọc phù hợp">{routeReadabilityChecks.map(item=>{
   const label=routeLabels[item.route];return <a key={item.route} href={item.route}><ReleaseIcon name={label?.icon ?? "document"}/><strong>{label?.title ?? item.route}</strong><span>{label?.hint ?? item.headingPromise}</span><small>Đọc hướng dẫn →</small></a>;
  })}</nav>
 </section>;
}
export function PublicAccessibilityPrinciples() {
 return <div className="lgo-release-reading-grid lgo-release-reading-grid-even">
  <section id="accessibility-principles" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="accessibility-principles-heading">
   <SectionHeading headingId="accessibility-principles-heading" eyebrow="Đọc rõ trước, hiệu ứng sau" title="Những nguyên tắc đang theo"/>
   <QuestionDisclosureList items={accessibilityReadabilityPrinciples.map(item=>({id:`readability-${item.id}`,question:item.title,answer:<p>{item.playerBenefit}</p>}))}/>
  </section>
  <aside id="accessibility-boundaries" className="lgo-release-reading-panel lgo-release-frame" aria-labelledby="accessibility-boundaries-heading">
   <SectionHeading headingId="accessibility-boundaries-heading" eyebrow="Hiểu đúng phạm vi hỗ trợ" title="Điều hướng dẫn chưa thay thế"/>
   <ul className="lgo-accessibility-boundary-list"><li><strong>Chưa có audit WCAG chính thức</strong><span>Kiểm thử tự động và khung thực hành không thay thế đánh giá truy cập đầy đủ.</span></li><li><strong>Không lưu thiết lập cá nhân</strong><span>Không có tùy chọn đồng bộ tài khoản hoặc hồ sơ truy cập.</span></li><li><strong>Không tuyên bố chứng nhận pháp lý</strong><span>Chưa có xác nhận từ phòng kiểm thử công nghệ hỗ trợ.</span></li></ul>
   <p className="lgo-accessibility-runtime-note">Khung thực hành cần JavaScript. Truy cập toàn bộ website khi tắt JavaScript vẫn còn giới hạn và chưa được tuyên bố hỗ trợ đầy đủ.</p>
   <LinkButton href="/support/safety" tone="neutral">Chuẩn bị góp ý an toàn</LinkButton>
   <small className="lgo-accessibility-contract-note">NO_ACCEPTED_BACKEND_CONTRACT</small>
  </aside>
 </div>;
}
export function PublicAccessibilityNotes() {
 const items=[
  ...accessibilityReadabilityPrinciples.map(item=>({id:`principle-source-${item.id}`,question:`Tìm hiểu thêm · ${item.title}`,answer:<><p>{item.implementationNote}</p><small>{item.nonClaim}</small></>})),
  ...focusOrderCheckpoints.map(item=>({id:`focus-${item.sequence}`,question:`${item.sequence} · ${item.label}`,answer:<><p>{item.keyboardExpectation}</p><small>{item.nonClaim}</small></>})),
  ...mobileScannabilityRules.map((item,index)=>({id:`scan-${index}`,question:item.surface,answer:<><p>{item.mobileNeed}</p><p>{item.contentTreatment}</p><small>{item.failureToAvoid}</small></>})),
  ...routeReadabilityChecks.map((item,index)=>({id:`reading-route-${index}`,question:item.headingPromise,answer:<><p>{item.firstAction}</p><p>{item.scanAid}</p><small>{item.boundary}</small></>}))
 ];
 return <details className="lgo-release-more-evidence"><summary>Tìm hiểu sâu hơn về focus và cách đọc <span aria-hidden="true">+</span></summary><QuestionDisclosureList items={items}/></details>;
}
