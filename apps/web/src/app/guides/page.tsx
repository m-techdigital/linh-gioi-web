import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/forms.css";
import "@lgo-web/ui/reading-catalog.css";
import { PublicGuidesDiscovery } from "../../components/PublicGuidesDiscovery";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Hướng dẫn" };

export default function GuidesPage() {
  return <WebAppShell><PublicGuidesDiscovery/></WebAppShell>;
}
