import "@lgo-web/ui/journey-landing-layout.css";
import { PublicJourneyLanding } from "../../components/PublicJourneyLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hành trình người chơi" };

export default function JourneyPage() {
  return <WebAppShell variant="immersive"><PublicJourneyLanding/></WebAppShell>;
}
