import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/story-landing-layout.css";
import { PublicStoryLanding } from "../../components/PublicStoryLanding";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/story");

export default function StoryPage() {
  return <WebAppShell variant="immersive"><PublicStoryLanding/></WebAppShell>;
}
