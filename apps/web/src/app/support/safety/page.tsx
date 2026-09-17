import { metadataForRoute } from "../../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/reading-tools.css";
import "@lgo-web/ui/safety-layout.css";
import { Stack } from "@lgo-web/ui";
import { PublicSafetyChecklist, PublicSafetyCommunityNotes, PublicSafetyDataBoundary, PublicSafetyHero, PublicSafetyIssuePaths } from "../../../components/PublicSupportSafetyExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = metadataForRoute("/support/safety");

export default function SafetySupportPage() {
  return <WebAppShell>
    <Stack className="lgo-release-layout lgo-guidance-layout lgo-safety-hub">
      <PublicSafetyHero/>
      <PublicSafetyChecklist/>
      <PublicSafetyIssuePaths/>
      <PublicSafetyDataBoundary/>
      <PublicSafetyCommunityNotes/>
    </Stack>
  </WebAppShell>;
}
