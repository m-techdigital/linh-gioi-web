import {
  classPaths,
  homeDiscoveryMoments,
  narrativeChapters,
  worldRouteStops,
  type HomeDiscoveryMoment
} from "@lgo-web/content";
import { MediaFrame, SectionHeading } from "@lgo-web/ui";

function ClassMedia({ sourceRef }: { sourceRef: string }) {
  const path = classPaths.find((item) => item.id === sourceRef);
  if (!path) return null;
  return (
    <div className={`lgo-discovery-media lgo-discovery-media-class lgo-class-${path.id}`} aria-hidden="true">
      <span className="lgo-discovery-class-mark">{path.name}</span>
      <div className="lgo-discovery-class-verbs">
        {path.signatureVerbs.slice(0, 3).map((verb) => <i key={verb}>{verb}</i>)}
      </div>
    </div>
  );
}

function WorldMedia({ sourceRef }: { sourceRef: string }) {
  const stop = worldRouteStops.find((item) => item.name === sourceRef);
  if (!stop) return null;
  return (
    <div className={`lgo-discovery-media lgo-discovery-media-world lgo-world-${stop.kind}`} aria-hidden="true">
      <span>{stop.order}</span>
      <i /><i /><b />
      <strong>{stop.name}</strong>
    </div>
  );
}

function StoryMedia({ sourceRef }: { sourceRef: string }) {
  const chapter = narrativeChapters.find((item) => item.chapter === sourceRef);
  if (!chapter) return null;
  return (
    <div className="lgo-discovery-media lgo-discovery-media-story" aria-hidden="true">
      <span>{chapter.chapter.replace("Chapter ", "0")}</span>
      <div className="lgo-discovery-rift"><i /><i /><i /></div>
      <strong>{chapter.title}</strong>
    </div>
  );
}

function resolveMoment(moment: HomeDiscoveryMoment) {
  if (moment.kind === "class") {
    const source = classPaths.find((item) => item.id === moment.sourceRef);
    return source ? {
      title: source.name,
      description: source.fantasy,
      meta: source.role,
      media: <ClassMedia sourceRef={moment.sourceRef} />
    } : null;
  }
  if (moment.kind === "world") {
    const source = worldRouteStops.find((item) => item.name === moment.sourceRef);
    return source ? {
      title: source.name,
      description: source.playerPromise,
      meta: source.mood,
      media: <WorldMedia sourceRef={moment.sourceRef} />
    } : null;
  }
  const source = narrativeChapters.find((item) => item.chapter === moment.sourceRef);
  return source ? {
    title: source.title,
    description: source.hook,
    meta: source.stakes,
    media: <StoryMedia sourceRef={moment.sourceRef} />
  } : null;
}

export function HomeDiscoveryShowcase() {
  return (
    <section className="lgo-experience-section lgo-home-discovery" aria-labelledby="home-discovery-heading">
      <SectionHeading eyebrow="Bước vào Linh Giới" title="Ba cánh cửa — chọn điều khiến bạn muốn ở lại">
        Homepage chỉ mở ba lát cắt đủ mạnh để bạn muốn khám phá tiếp. Chi tiết đầy đủ về class, thế giới và cốt truyện nằm ở các deep route riêng.
      </SectionHeading>
      <div className="lgo-home-discovery-grid" id="home-discovery-heading">
        {homeDiscoveryMoments.map((moment) => {
          const resolved = resolveMoment(moment);
          if (!resolved) return null;
          return (
            <MediaFrame
              key={moment.id}
              className={`lgo-home-discovery-card lgo-home-discovery-${moment.kind}`}
              eyebrow={moment.eyebrow}
              title={resolved.title}
              description={resolved.description}
              meta={<span>{resolved.meta}</span>}
              action={{ href: moment.href, label: moment.actionLabel, tone: moment.tone }}
              media={resolved.media}
            />
          );
        })}
      </div>
    </section>
  );
}
