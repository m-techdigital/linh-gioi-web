import "@lgo-web/ui/classes-landing-layout.css";
import { PublicClassesLanding } from "../../components/PublicClassesLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Năm Lộ" };

export default function ClassesPage() {
  return <WebAppShell variant="immersive"><PublicClassesLanding/></WebAppShell>;
}
