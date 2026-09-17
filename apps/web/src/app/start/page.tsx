import "@lgo-web/ui/start-landing-layout.css";
import { PublicStartLanding } from "../../components/PublicStartLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Bắt đầu" };

export default function StartPage() {
  return <WebAppShell variant="immersive"><PublicStartLanding /></WebAppShell>;
}
