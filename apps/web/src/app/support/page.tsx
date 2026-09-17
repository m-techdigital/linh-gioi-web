import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import { Stack } from "@lgo-web/ui";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import { PublicSupportHero, PublicSupportAnswers, PublicSupportScope } from "../../components/PublicSupportExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/support");

export default function SupportPage() {
  return <WebAppShell>
    <Stack className="lgo-release-layout lgo-guidance-layout lgo-support-hub lgo-supportpage-stack">
      <PublicSupportHero/>
      <PublicSupportAnswers/>
      <PublicSupportScope/>
    </Stack>
  </WebAppShell>;
}
