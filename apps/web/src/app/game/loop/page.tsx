import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/progress.css";
import "@lgo-web/ui/reading-journey.css";
import "@lgo-web/ui/world-loop-layout.css";
import { Stack } from "@lgo-web/ui";
import { PublicWorldLoopHero, PublicWorldLoopQuestionsAndScope, PublicWorldLoopReading, PublicWorldLoopRoutes, PublicWorldLoopSourceNotes } from "../../../components/PublicWorldLoopExperience";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Vòng lặp gameplay thế giới" };

export default function WorldGameplayLoopPage() {
  return <WebAppShell><Stack className="lgo-release-layout lgo-guidance-layout lgo-world-loop-experience">
    <PublicWorldLoopHero/>
    <PublicWorldLoopReading/>
    <PublicWorldLoopQuestionsAndScope/>
    <PublicWorldLoopRoutes/>
    <PublicWorldLoopSourceNotes/>
  </Stack></WebAppShell>;
}
