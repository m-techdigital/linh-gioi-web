import "@lgo-web/ui/release-layout.css";
import { Stack } from "@lgo-web/ui";
import { OwnerReleaseGateBoard, ReleaseReadinessHubBoard } from "../../../components/PublicReleaseReadinessHubSections";
import { ReleaseReadinessHero, ReleaseReadinessPlayerNextSteps } from "../../../components/PublicReleaseReadinessExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Sẵn sàng phát hành" };

export default function ReleaseReadinessPage() {
  return <WebAppShell>
    <Stack className="lgo-releasereadinesspage-stack lgo-release-layout">
      <ReleaseReadinessHero />
      <OwnerReleaseGateBoard presentation="release" />
      <ReleaseReadinessPlayerNextSteps />
      <details className="lgo-release-more-evidence">
        <summary>Câu hỏi về điều kiện phát hành <span aria-hidden="true">+</span></summary>
        <div className="lgo-release-more-body"><ReleaseReadinessHubBoard /></div>
      </details>
    </Stack>
  </WebAppShell>;
}
