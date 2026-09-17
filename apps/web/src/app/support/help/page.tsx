import { metadataForRoute } from "../../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/question-directory.css";
import { Stack } from "@lgo-web/ui";
import { PublicHelpAnswers, PublicHelpBoundary, PublicHelpHero, PublicHelpReadingNotes, PublicHelpTopics } from "../../../components/PublicSupportHelpExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = metadataForRoute("/support/help");

export default function SupportHelpPage() {
  return <WebAppShell>
    <Stack className="lgo-release-layout lgo-guidance-layout lgo-help-hub">
      <PublicHelpHero/>
      <PublicHelpTopics/>
      <PublicHelpAnswers/>
      <PublicHelpBoundary/>
      <PublicHelpReadingNotes/>
    </Stack>
  </WebAppShell>;
}
