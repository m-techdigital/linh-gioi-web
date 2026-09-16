import "@lgo-web/ui/public-entry-layout.css";
import { PublicWorldLanding } from "../../components/PublicWorldLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Thế giới" };

export default function GamePage() {
  return <WebAppShell variant="immersive"><PublicWorldLanding/></WebAppShell>;
}
