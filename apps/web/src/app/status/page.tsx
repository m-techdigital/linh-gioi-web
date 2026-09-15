import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/visibility-layout.css";
import { Stack } from "@lgo-web/ui";
import { PublicStatusHero, PublicStatusSurfaces, PublicStatusTrustAndMaintenance, PublicStatusNextSteps } from "../../components/PublicStatusExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Trạng thái công khai" };

export default function Page() {
  return <WebAppShell>
    <Stack className="lgo-statuspage-stack lgo-release-layout lgo-status-experience">
      <PublicStatusHero/>
      <PublicStatusSurfaces/>
      <PublicStatusTrustAndMaintenance/>
      <PublicStatusNextSteps/>
    </Stack>
  </WebAppShell>;
}
