import "@lgo-web/ui/release-readiness-landing-layout.css";
import { OwnerReleaseGateBoard } from "../../../components/PublicReleaseReadinessHubSections";
import { ReleaseReadinessHero, ReleaseReadinessPlayerNextSteps } from "../../../components/PublicReleaseReadinessExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Sẵn sàng phát hành" };

export default function ReleaseReadinessPage() {
  return <WebAppShell variant="immersive">
    <div className="lgo-release-readiness-landing lgo-release-layout">
      <ReleaseReadinessHero />
      <OwnerReleaseGateBoard presentation="release" />
      <ReleaseReadinessPlayerNextSteps />
    </div>
  </WebAppShell>;
}
