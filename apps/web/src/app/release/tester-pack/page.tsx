import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/reading-tools.css";
import { Stack } from "@lgo-web/ui";
import { TesterPackHero, TesterPackShortcuts, TesterPackFeedback, TesterPackPreparation, TesterPackLimitations } from "../../../components/PublicTesterPackExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Gói tester cộng đồng" };

export default function ClosedTesterInformationPackPage() {
  return <WebAppShell>
    <Stack className="lgo-testerpackpage-stack lgo-release-layout lgo-tester-experience">
      <TesterPackHero />
      <TesterPackShortcuts />
      <TesterPackFeedback />
      <TesterPackPreparation />
      <TesterPackLimitations />
    </Stack>
  </WebAppShell>;
}
