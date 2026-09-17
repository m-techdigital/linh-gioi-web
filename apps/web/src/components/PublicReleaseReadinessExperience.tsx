import { ownerReleaseGates } from "@lgo-web/content";
import { ExperienceHero, ReleaseIcon, ReleaseSeal, SectionHeading, LinkButton } from "@lgo-web/ui";
import type { ReleaseIconName, ReleaseGateState } from "@lgo-web/ui";

export const readinessGatePresentation: ReadonlyArray<{ icon: ReleaseIconName; label: string }> = [
  { icon: "document", label: "Gói phát hành" },
  { icon: "shield", label: "Giới hạn đã biết" },
  { icon: "users", label: "Tiếp nhận tester" },
  { icon: "lock", label: "Phê duyệt phát hành" }
];
export function readinessState(state: string): { state: ReleaseGateState; label: string } {
  if (state === "ready-copy") return { state: "review", label: "Đang duyệt" };
  if (state === "planned") return { state: "planned", label: "Đang chuẩn bị" };
  return { state: "blocked", label: "Chưa thông qua" };
}
export function ReleaseReadinessHero() {
  return <ExperienceHero className="lgo-release-hero lgo-release-frame" copyClassName="lgo-release-hero-copy"
    badge="Linh Giới Online · Phát hành" badgeTone="gold" kicker="Bằng chứng trước lời hứa"
    title="Sẵn sàng phát hành"
    lead="Một cánh cổng chỉ mở khi mọi điều kiện đã được kiểm chứng. Linh Giới Online chưa có bản tải công khai."
    actions={[{href:"#owner-release-gates",label:"Xem các cổng duyệt",tone:"gold"},{href:"/release",label:"Hành trình phát hành",tone:"neutral"}]}
    detail={<>
      <ul className="lgo-release-promises">
        <li><ReleaseIcon name="lock" /><div><strong>Chưa mở tải game</strong><span>Chưa có gói build công khai được duyệt.</span></div></li>
        <li><ReleaseIcon name="users" /><div><strong>Chưa cấp quyền tài khoản</strong><span>Không đăng ký test hoặc hứa quyền truy cập.</span></div></li>
        <li><ReleaseIcon name="shield" /><div><strong>Một trạng thái, mọi kênh</strong><span>Tải game, Trạng thái và Hỗ trợ phải đồng bộ.</span></div></li>
      </ul>
      <p className="lgo-release-art-note">Minh họa thế giới · không phải ảnh gameplay</p>
    </>}
    visual={<>
      <img className="lgo-release-hero-art" src="/game-art/marketing/discovery-world.png" alt="" width="500" height="240" fetchPriority="high" />
      <img className="lgo-release-readiness-traveler" src="/game-art/marketing/hero-traveler.png" alt="" width="344" height="348" fetchPriority="high" />
      <section className="lgo-release-gate-console lgo-release-frame" aria-labelledby="release-console-heading">
        <div className="lgo-release-console-heading"><span className="lgo-release-overline">Kiểm chứng · Đồng bộ · Phát hành</span><h2 id="release-console-heading">Cổng phát hành</h2></div>
        <div className="lgo-release-console-body">
          <ol className="lgo-release-gate-signals">
            {ownerReleaseGates.map((gate,index)=>{
              const presentation=readinessGatePresentation[index];
              const status=readinessState(gate.currentState);
              return <li key={gate.gate} data-state={status.state}><a href={`#release-gate-${index+1}`}><ReleaseIcon name={presentation?.icon ?? "shield"}/><span><strong>{presentation?.label ?? gate.gate}</strong><small>{status.label}</small></span><span className="lgo-release-signal-dot" aria-hidden="true" /></a></li>;
            })}
          </ol>
          <ReleaseSeal caption="NO_ACCEPTED_BACKEND_CONTRACT">Chưa sẵn sàng<br/>phát hành</ReleaseSeal>
        </div>
        <p className="lgo-release-console-note">Không dùng kết quả build/test để hứa ngày mở cửa.</p>
      </section>
    </>} />;
}
export function ReleaseReadinessPlayerNextSteps() {
  return <div className="lgo-release-player-next">
    <section className="lgo-release-tester-panel lgo-release-frame" aria-labelledby="readiness-tester-title">
      <SectionHeading headingId="readiness-tester-title" eyebrow="Trước một lời mời" title="Kỳ vọng tester" />
      <p>Thử nghiệm có giới hạn, có điều kiện và có phạm vi rõ ràng.</p>
      <ul className="lgo-release-checklist">
        <li><ReleaseIcon name="document"/>Chuẩn bị thiết bị, hệ điều hành và bước tái hiện lỗi.</li>
        <li><ReleaseIcon name="shield"/>Không gửi mật khẩu, token hoặc dữ liệu riêng tư.</li>
        <li><ReleaseIcon name="users"/>Chỉ tham gia khi có thông báo chính thức.</li>
      </ul>
      <LinkButton href="/release/tester-pack" tone="neutral">Đọc gói hướng dẫn tester <ReleaseIcon name="arrow"/></LinkButton>
    </section>
    <section className="lgo-release-route-panel lgo-release-frame" aria-labelledby="readiness-routes-title">
      <SectionHeading headingId="readiness-routes-title" eyebrow="Cùng một sự thật" title="Theo dõi đúng nơi" />
      <p>Kiểm tra điều kiện phát hành và cách chuẩn bị an toàn.</p>
      <nav className="lgo-release-next-routes" aria-label="Kiểm tra phát hành an toàn">
        <a href="/download/trust"><ReleaseIcon name="download"/><strong>Tải game</strong><span>Chưa mở tải công khai</span><small>Kiểm tra bằng chứng →</small></a>
        <a href="/status"><ReleaseIcon name="signal"/><strong>Trạng thái</strong><span>Phạm vi công khai hiện tại</span><small>Xem trạng thái →</small></a>
        <a href="/support/safety"><ReleaseIcon name="help"/><strong>Hỗ trợ</strong><span>Hướng dẫn báo lỗi an toàn</span><small>Đọc hướng dẫn →</small></a>
      </nav>
      <p className="lgo-release-route-boundary"><ReleaseIcon name="lock"/>Không mở đăng ký test, không thu thập tài khoản trên trang này.</p>
    </section>
  </div>;
}
