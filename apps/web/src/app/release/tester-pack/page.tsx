import "@lgo-web/ui/tester-pack-landing-layout.css";
import "@lgo-web/ui/reading-tools.css";
import { TesterPackHero, TesterPackShortcuts, TesterPackFeedback, TesterPackPreparation, TesterPackLimitations } from "../../../components/PublicTesterPackExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Gói tester cộng đồng" };

export default function ClosedTesterInformationPackPage() {
  return <WebAppShell variant="immersive">
    <div className="lgo-tester-pack-landing lgo-release-layout lgo-tester-experience">
      <TesterPackHero />
      <TesterPackShortcuts />
      <TesterPackFeedback />
      <details id="tester-preparation" className="lgo-tester-pack-secondary">
        <summary>
          <span><strong>Chuẩn bị chi tiết</strong><small>Checklist · thiết bị · giới hạn đã biết</small></span>
          <span aria-hidden="true">+</span>
        </summary>
        <div className="lgo-tester-pack-secondary-body">
          <TesterPackPreparation />
          <TesterPackLimitations />
        </div>
      </details>
    </div>
  </WebAppShell>;
}
