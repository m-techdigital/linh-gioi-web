import { publicRoadmapItems, roadmapDecisionGates, stagedReleaseMessages } from "@lgo-web/content";
import { ExperienceHero, LinkButton, MilestoneArchive, PlanningGateMap, ReleaseIcon, SectionHeading } from "@lgo-web/ui";
import type { PlanningGateView } from "@lgo-web/ui";

// Route-specific display labels; the statuses and original evidence stay source-owned.
const gatePresentation: Record<string, Pick<PlanningGateView, "id" | "title" | "icon">> = {
  "Public web content confidence": {id:"roadmap-gate-content",title:"Nội dung công khai",icon:"document"},
  "Download artifact gate": {id:"roadmap-gate-download",title:"Bản tải được duyệt",icon:"download"},
  "Community intake gate": {id:"roadmap-gate-community",title:"Kênh phản hồi",icon:"users"},
  "WEB-08 backend contract sync": {id:"roadmap-gate-backend",title:"Tích hợp máy chủ",icon:"lock"}
};
const gateLabels = {ready:"Sẵn sàng về nội dung",planned:"Đang dự kiến",blocked:"Còn điều kiện chặn"} as const;
const gates = roadmapDecisionGates.map((gate,index) => {
  const view=gatePresentation[gate.gate];
  return {...gate,id:view?.id ?? `roadmap-gate-${index}`,title:view?.title ?? gate.gate,
    icon:view?.icon ?? "document",state:gate.status,stateLabel:gateLabels[gate.status]};
}) satisfies (PlanningGateView & typeof roadmapDecisionGates[number])[];
const stageTitles: Record<string,string> = {
  "Public information site": "Thông tin công khai", "Closed testing preparation": "Chuẩn bị thử nghiệm",
  "Accepted test build": "Bản thử được duyệt", "Backend-connected portal": "Portal có tích hợp"
};
const stageLabels = {public:"Nội dung công khai",internal:"Chuẩn bị nội bộ",blocked:"Chưa mở"} as const;

export function PublicRoadmapHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Lộ trình website" badgeTone="gold" kicker="Hiểu điều kiện · Không đoán ngày mở"
    title="Roadmap phát triển web" lead="Nhìn rõ việc có thể đọc, điều đang chuẩn bị và những cổng còn chặn. Mỗi bước đi cần bằng chứng, không chỉ một lời hứa."
    actions={[{href:"#roadmap-gates",label:"Xem các điều kiện",tone:"gold"},{href:"/release/readiness",label:"Đọc sẵn sàng phát hành",tone:"neutral"}]}
    detail={<><p className="lgo-planning-hero-boundary"><ReleaseIcon name="shield"/><span>Lộ trình của website, không phải ngày mở game.<br/>Chưa mở đăng nhập, dữ liệu tài khoản hoặc tích hợp máy chủ thật.</span></p><p className="lgo-release-art-note">Minh họa thế giới · Không phải ảnh gameplay</p></>}
    visual={<><img className="lgo-release-hero-art" src="/game-art/world/dong-mon-skyline.webp" width="1360" height="765" alt="" fetchPriority="high"/>
      <PlanningGateMap items={gates} headingId="roadmap-map-heading" title="Bốn cổng cần đối chiếu"/>
    </>}/>;
}
export function PublicRoadmapGates() {
  return <section id="roadmap-gates" aria-labelledby="roadmap-gates-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="roadmap-gates-heading" eyebrow="Từ dữ liệu biên soạn" title="Mỗi cổng, một điều kiện rõ"/><p>Nhãn sẵn sàng chỉ nói về phạm vi ghi bên dưới.<br/>Không có cổng tự động được duyệt khi bạn bấm.</p></div>
    <div className="lgo-planning-gates">{gates.map(gate => <article id={gate.id} key={gate.id} className="lgo-planning-gate lgo-release-frame" data-state={gate.state}>
      <div className="lgo-planning-gate-top"><ReleaseIcon name={gate.icon}/><span>{gate.stateLabel}</span></div>
      <h3>{gate.title}</h3><p>{gate.releaseImpact}</p>
      <details className="lgo-release-gate-proof"><summary>Điều kiện &amp; người quyết định <span aria-hidden="true">+</span></summary>
        <div className="lgo-planning-gate-proof"><p><strong>Người quyết định:</strong> {gate.decisionOwner}</p><p>{gate.publicMessage}</p><p>{gate.mustNotClaim}</p><small>Tên trong nguồn: {gate.gate}</small></div>
      </details>
    </article>)}</div>
  </section>;
}
export function PublicRoadmapStages() {
  return <section id="roadmap-release-stages" aria-labelledby="roadmap-stages-heading">
    <div className="lgo-release-section-heading"><SectionHeading headingId="roadmap-stages-heading" eyebrow="Không nhảy từ thông tin sang phát hành" title="Đọc đúng từng giai đoạn"/><p>Thông điệp thay đổi khi bằng chứng và quyền mở thay đổi.</p></div>
    <ol className="lgo-planning-stages">{stagedReleaseMessages.map((stage,index) => <li key={stage.stage} className="lgo-planning-stage" data-visibility={stage.visibility}>
      <div className="lgo-planning-stage-marker" aria-hidden="true">{String(index + 1).padStart(2,"0")}</div>
      <span className="lgo-planning-stage-label">{stageLabels[stage.visibility]}</span>
      <h3>{stageTitles[stage.stage] ?? stage.stage}</h3><p>{stage.playerCopy}</p>
      <details className="lgo-release-gate-proof"><summary>Trước khi đổi thông điệp <span aria-hidden="true">+</span></summary><div><p>{stage.ownerChecklist}</p><p>{stage.nonClaim}</p><small>Tên trong nguồn: {stage.stage}</small></div></details>
    </li>)}</ol>
  </section>;
}
export function PublicRoadmapBoundaries() {
  return <aside className="lgo-release-paper-panel lgo-release-frame lgo-planning-boundaries" aria-labelledby="roadmap-boundary-heading">
    <div><SectionHeading headingId="roadmap-boundary-heading" eyebrow="Kế hoạch không phải quyền truy cập" title="Không phải lịch phát hành"/>
      <p>Không có ngày mở, đếm ngược hoặc tỷ lệ hoàn thành được công bố ở đây. Bản tải cần artifact, SHA256 và phê duyệt; Portal/Account/Ops cần hợp đồng Auth/API/DB/RBAC/audit từ máy chủ game.</p>
      <small>NO_ACCEPTED_BACKEND_CONTRACT · Không cấp quyền chơi hoặc mở đăng ký thử nghiệm.</small>
    </div><div className="lgo-planning-boundary-actions"><LinkButton href="/download/trust" tone="neutral">Đối chiếu bản tải</LinkButton><LinkButton href="/community/onboarding" tone="neutral">Lộ trình cho người mới</LinkButton></div>
  </aside>;
}
export function PublicRoadmapSourceArchive() {
  return <details id="roadmap-source-archive" className="lgo-release-more-evidence">
    <summary>Tra cứu các mốc trong dữ liệu biên soạn <span aria-hidden="true">+</span></summary>
    <div className="lgo-planning-archive-body">
      <p className="lgo-planning-source-warning"><strong>Đây là nhãn trong dữ liệu biên soạn cũ, không phải tiến độ hiện tại.</strong> Các mốc v1.6–v1.21, WEB-08 và Future được giữ nguyên tiêu đề, nội dung và nhãn nguồn. <code>current</code> không chứng minh công việc đang được làm hôm nay; <code>planned</code> không phải cam kết phát hành.</p>
      <MilestoneArchive items={publicRoadmapItems} label="Lọc nhãn trong dữ liệu roadmap"/>
    </div>
  </details>;
}
