import "@lgo-web/ui/service-layout.css";
import "@lgo-web/ui/release-layout.css";
import "@lgo-web/ui/guidance-layout.css";
import "@lgo-web/ui/performance-layout.css";
import {Stack} from "@lgo-web/ui";
import {PublicPerformanceHero, PublicPerformanceMeasurement, PublicPerformanceNotes, PublicPerformancePrinciples, PublicPerformanceRoutes, PublicPerformanceWorkshop} from "../../components/PublicPerformanceExperience";
import {WebAppShell} from "../../components/WebAppShell";

export const metadata = {title: "Hiệu năng và ngân sách nội dung"};

export default function PerformanceBudgetPage() {
  return <WebAppShell><Stack className="lgo-release-layout lgo-guidance-layout lgo-performance-experience">
    <PublicPerformanceHero/>
    <PublicPerformanceWorkshop/>
    <PublicPerformanceMeasurement/>
    <PublicPerformancePrinciples/>
    <PublicPerformanceRoutes/>
    <PublicPerformanceNotes/>
  </Stack></WebAppShell>;
}
