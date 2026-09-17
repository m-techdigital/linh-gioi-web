import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guide-article.css";
import { PublicBeginnerGuide } from "../../../components/PublicBeginnerGuide";
import { WebAppShell } from "../../../components/WebAppShell";

export const metadata = { title: "Hướng dẫn người mới" };

export default function BeginnerGuidePage() {
  return <WebAppShell><PublicBeginnerGuide/></WebAppShell>;
}
