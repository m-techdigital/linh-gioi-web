import { metadataForRoute } from "../../lib/public-metadata";
import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/planning-layout.css";
import { Stack } from "@lgo-web/ui";
import { PublicRoadmapBoundaries, PublicRoadmapGates, PublicRoadmapHero, PublicRoadmapStages } from "../../components/PublicRoadmapExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = metadataForRoute("/roadmap");

export default function RoadmapPage() {
  return <WebAppShell><Stack className="lgo-release-layout lgo-roadmap-experience">
    <PublicRoadmapHero/>
    <PublicRoadmapStages/>
    <PublicRoadmapBoundaries/>
    <PublicRoadmapGates/>
  </Stack></WebAppShell>;
}
