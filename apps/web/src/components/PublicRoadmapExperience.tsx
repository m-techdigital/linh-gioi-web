import { roadmapDecisionGates, stagedReleaseMessages } from "@lgo-web/content";
import { ExperienceHero, LinkButton, PlanningGateMap, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { PlanningGateView } from "@lgo-web/ui";

const gatePresentation: Record<string, Pick<PlanningGateView, "id" | "title" | "icon">> = {
  "Public web content confidence": {id:"roadmap-gate-content",title:"Thông tin đủ để khám phá",icon:"document"},
  "Download artifact gate": {id:"roadmap-gate-download",title:"Bản thử được duyệt",icon:"download"},
  "Community intake gate": {id:"roadmap-gate-community",title:"Kênh góp ý",icon:"users"},
  "WEB-08 backend contract sync": {id:"roadmap-gate-backend",title:"Tài khoản & máy chủ",icon:"lock"}
};
const gateLabels = {ready:"Đủ điều kiện công khai",planned:"Đang chuẩn bị",blocked:"Còn điều kiện chặn"} as const;
const gates = roadmapDecisionGates.map((gate,index) => {
  const view=gatePresentation[gate.gate];
  return {...gate,id:view?.id ?? "roadmap-gate-"+index,title:view?.title ?? gate.gate,
    icon:view?.icon ?? "document",state:gate.status,stateLabel:gateLabels[gate.status]};
}) satisfies (PlanningGateView & typeof roadmapDecisionGates[number])[];

const stageTitles: Record<string,string> = {
  "Public information site":"Khám phá Linh Giới trên web",
  "Closed testing preparation":"Chuẩn bị bản thử giới hạn",
  "Accepted test build":"Bản thử được duyệt",
  "Backend-connected portal":"Kết nối tài khoản và máy chủ"
};
const stageLabels = {public:"Đang có thể theo dõi",internal:"Đang chuẩn bị",blocked:"Chưa mở"} as const;

export function PublicRoadmapHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Lộ trình sản phẩm" badgeTone="gold" kicker="Theo dõi từng chặng · Không đoán ngày mở"
    title="Lộ trình Linh Giới Online"
    lead="Xem người chơi đang có thể tìm hiểu gì, chặng nào còn chuẩn bị và điều kiện nào phải được xác minh trước khi mở thêm trải nghiệm."
    actions={[{href:"#roadmap-release-stages",label:"Xem các chặng",tone:"gold"},{href:"/status",label:"Xem trạng thái hiện tại",tone:"neutral"}]}
    detail={<><p className="lgo-planning-hero-boundary"><ReleaseIcon name="shield"/><span>Lộ trình sản phẩm, không phải ngày mở game.<br/>Không có phần trăm hoàn thành, đếm ngược hoặc quyền chơi được cấp từ trang này.</span></p><p className="lgo-release-art-note">Minh họa thế giới · Không phải ảnh gameplay</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <PlanningGateMap items={gates} headingId="roadmap-map-heading" title="Điều kiện để chuyển sang chặng kế tiếp"/>
    </>}/>;
}

export function PublicRoadmapStages() {
  return <section id="roadmap-release-stages" aria-labelledby="roadmap-stages-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="roadmap-stages-heading" eyebrow="Từ thông tin tới bản thử" title="Các chặng người chơi có thể theo dõi"/><p>Mỗi chặng mô tả điều người chơi có thể kỳ vọng khi đủ bằng chứng.<br/>Không phải phần trăm hoàn thành hoặc lịch phát hành.</p></div>
    <ol className="lgo-planning-stages">{stagedReleaseMessages.map((stage,index) => <li key={stage.stage} className="lgo-planning-stage" data-visibility={stage.visibility}>
      <div className="lgo-planning-stage-marker" aria-hidden="true">{String(index + 1).padStart(2,"0")}</div>
      <span className="lgo-planning-stage-label">{stageLabels[stage.visibility]}</span>
      <h3>{stageTitles[stage.stage] ?? stage.stage}</h3><p>{stage.playerCopy}</p>
      <details className="lgo-release-gate-proof"><summary>Điều kiện để sang chặng này <span aria-hidden="true">+</span></summary><div><p>{stage.ownerChecklist}</p><p>{stage.nonClaim}</p></div></details>
    </li>)}</ol>
  </section>;
}

export function PublicRoadmapBoundaries() {
  return <aside className="lgo-release-paper-panel lgo-release-frame lgo-planning-boundaries" aria-labelledby="roadmap-boundary-heading">
    <div><SectionHeading headingId="roadmap-boundary-heading" eyebrow="Theo dõi kế hoạch, không đoán tiến độ" title="Không phải lịch phát hành"/>
      <p>Không có ngày mở, đếm ngược hoặc tỷ lệ hoàn thành được công bố ở đây. Bản tải chỉ được xem là sẵn sàng khi artifact, SHA256 và phê duyệt tương ứng tồn tại; tài khoản và máy chủ cần hợp đồng backend được chấp nhận.</p>
      <small>NO_ACCEPTED_BACKEND_CONTRACT · Lịch sử triển khai kỹ thuật được giữ trong governance nội bộ, không dùng làm roadmap cho người chơi.</small>
    </div><div className="lgo-planning-boundary-actions"><LinkButton href="/status" tone="neutral">Xem trạng thái hiện tại</LinkButton><LinkButton href="/download/trust" tone="neutral">Đối chiếu bản tải</LinkButton></div>
  </aside>;
}

export function PublicRoadmapGates() {
  return <section id="roadmap-gates" aria-labelledby="roadmap-gates-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="roadmap-gates-heading" eyebrow="Mỗi bước cần bằng chứng thật" title="Điều kiện trước khi mở thêm"/><p>Các điều kiện dưới đây giải thích vì sao một chặng có thể còn chờ.<br/>Bấm xem chỉ mở thông tin, không tự thay đổi trạng thái.</p></div>
    <div className="lgo-planning-gates">{gates.map(gate => <article id={gate.id} key={gate.id} className="lgo-planning-gate lgo-release-frame" data-state={gate.state}>
      <div className="lgo-planning-gate-top"><ReleaseIcon name={gate.icon}/><span>{gate.stateLabel}</span></div>
      <h3>{gate.title}</h3><p>{gate.releaseImpact}</p>
      <details className="lgo-release-gate-proof"><summary>Điều kiện &amp; người quyết định <span aria-hidden="true">+</span></summary>
        <div className="lgo-planning-gate-proof"><p><strong>Người quyết định:</strong> {gate.decisionOwner}</p><p>{gate.publicMessage}</p><p>{gate.mustNotClaim}</p></div>
      </details>
    </article>)}</div>
  </section>;
}
