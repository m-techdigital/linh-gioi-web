import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/status-landing-layout.css";
import { PublicStatusHero, PublicStatusSurfaces, PublicStatusTrustAndMaintenance, PublicStatusNextSteps } from "../../components/PublicStatusExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/status");

export default function Page() {
  return <WebAppShell variant="immersive">
    <div className="lgo-status-landing lgo-release-layout lgo-status-experience">
      <PublicStatusHero />
      <PublicStatusSurfaces />
      <PublicStatusTrustAndMaintenance />
      <PublicStatusNextSteps />
    </div>
  </WebAppShell>;
}
