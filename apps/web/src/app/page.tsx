import "@lgo-web/ui/marketing-layout.css";
import { PublicHomeLanding } from "../components/PublicHomeLanding";
import { WebAppShell } from "../components/WebAppShell";

export default function HomePage() {
  return <WebAppShell variant="immersive"><PublicHomeLanding/></WebAppShell>;
}
