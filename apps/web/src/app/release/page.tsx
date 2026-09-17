import "@lgo-web/ui/release-landing-layout.css";
import { PublicReleaseLanding } from "../../components/PublicReleaseLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hành trình phát hành" };

export default function ReleaseNarrativePage() {
  return <WebAppShell variant="immersive"><PublicReleaseLanding /></WebAppShell>;
}
