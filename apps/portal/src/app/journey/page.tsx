import {
  ActivityTimeline,
  ActivityTimelineItem,
  DataList,
  DataListItem,
  LinkButton,
  ProgressStep,
  ProgressSteps,
  StatusBadge,
  VisualProofCard,
  VisualProofGrid,
  WorkspacePage
} from "@lgo-web/ui";
import Image from "next/image";
import {
  NO_ACCEPTED_BACKEND_CONTRACT,
  NOT_CANONICAL_BACKEND_CONTRACT,
  PROVISIONAL_WEB_FIXTURE,
  portalJourneyFixture
} from "../../lib/portal-fixtures";

const boundary = "Demo data chỉ phục vụ review FE/UX. Không có production auth, không có DB persistence và không có real Portal integration.";

export default function JourneyPage() {
  return (
    <WorkspacePage
      mainClassName="lgo-portal-shell"
      badge={`${PROVISIONAL_WEB_FIXTURE} · ${NOT_CANONICAL_BACKEND_CONTRACT} · ${NO_ACCEPTED_BACKEND_CONTRACT}`}
      eyebrow="Demo data"
      title={portalJourneyFixture.title}
      description={portalJourneyFixture.summary}
      boundaryBadge="Fixture boundary"
      boundary={boundary}
      actions={[
        { href: "/account", label: "Tài khoản mẫu", tone: "spirit" },
        { href: "/characters", label: "Nhân vật mẫu", tone: "gold" },
        { href: "/support", label: "Hỗ trợ mẫu", tone: "jade" }
      ]}
    >
      <VisualProofGrid aria-label="Hình ảnh demo hành trình">
        {portalJourneyFixture.artPanels.map((panel) => (
          <VisualProofCard
            key={panel.id}
            eyebrow={panel.claim}
            title={panel.title}
            description={panel.description}
            media={(
              <Image
                src={panel.src}
                alt={panel.alt}
                width={panel.width}
                height={panel.height}
                sizes="(max-width: 720px) 100vw, 50vw"
                loading="eager"
              />
            )}
            meta={<StatusBadge tone={panel.claim === "WORLD_CONCEPT" ? "jade" : "gold"}>{panel.claim}</StatusBadge>}
          />
        ))}
      </VisualProofGrid>

      <ProgressSteps label="Các bước hành trình demo">
        {portalJourneyFixture.journeySteps.map((step) => (
          <ProgressStep
            key={step.title}
            title={step.title}
            description={step.description}
            state={step.state}
            statusLabel={step.statusLabel}
          />
        ))}
      </ProgressSteps>

      <ActivityTimeline aria-label="Hoạt động demo gần đây">
        {portalJourneyFixture.recentActivity.map((item) => (
          <ActivityTimelineItem
            key={item.title}
            title={item.title}
            timestamp={item.timestamp}
            description={item.description}
            meta={<StatusBadge tone="neutral">{item.meta}</StatusBadge>}
          />
        ))}
      </ActivityTimeline>

      <DataList aria-label="Việc có thể thử tiếp">
        {portalJourneyFixture.nextActions.map((action) => (
          <DataListItem
            key={action.href}
            title={action.title}
            description={action.description}
            trailing={<LinkButton href={action.href}>{action.title}</LinkButton>}
          />
        ))}
      </DataList>
    </WorkspacePage>
  );
}
