import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/planning-layout.css";
import { Stack } from "@lgo-web/ui";
import { PublicRoadmapBoundaries, PublicRoadmapGates, PublicRoadmapHero, PublicRoadmapSourceArchive, PublicRoadmapStages } from "../../components/PublicRoadmapExperience";
import { WebAppShell } from "../../components/WebAppShell";

export const metadata = { title: "Roadmap" };

export default function RoadmapPage() {
  return <WebAppShell><Stack className="lgo-release-layout lgo-roadmap-experience">
    <PublicRoadmapHero/>
    <PublicRoadmapGates/>
    <PublicRoadmapBoundaries/>
    <PublicRoadmapStages/>
    <PublicRoadmapSourceArchive/>
  </Stack></WebAppShell>;
}
