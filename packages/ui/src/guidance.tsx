import type { ReactNode } from "react";
import { LinkButton } from "./primitives";
import { ReleaseIcon } from "./release";
import type { ReleaseIconName } from "./release";

/** Static navigation/presentation content, never an accepted support API contract. */
export type GuidanceTopic = {
  id: string; title: string; hint: string; description: string;
  href: string; action: string; icon: ReleaseIconName;
};
export type GuidanceQuestion = { id: string; question: string; answer: ReactNode };

export function GuidanceStation({ headingId, title, description, topics, note, variant = "station" }: {
  headingId: string; title: string; description: string;
  topics: readonly GuidanceTopic[]; note: string; variant?: "station" | "map";
}) {
  return <nav className={`lgo-guidance-station${variant === "map" ? " lgo-guidance-map" : ""}`} aria-labelledby={headingId}>
    <div className="lgo-guidance-station-crest"><ReleaseIcon name="help" /></div>
    <h2 id={headingId}>{title}</h2><p>{description}</p>
    {variant === "map" ? <svg className="lgo-guidance-map-path" viewBox="0 0 500 340" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false"><path d="M110 90C300 20 480 140 320 155S30 210 140 245s250 15 265 55" stroke="currentColor" strokeWidth="3" strokeDasharray="7 8"/><path d="m40 220 60-85 45 60 50-45 65 100M260 100l75-50 80 100" stroke="currentColor" strokeWidth="2"/></svg> : null}
    <div className="lgo-guidance-station-links">
      {topics.map(topic => <a href={topic.href} key={topic.id}>
        <ReleaseIcon name={topic.icon}/><strong>{topic.title}</strong><span>{topic.hint}</span>
      </a>)}
    </div>
    <small>{note}</small>
  </nav>;
}

export function GuidanceTopicGrid({ topics }: { topics: readonly GuidanceTopic[] }) {
  return <div className="lgo-guidance-topic-grid" data-count={topics.length}>
    {topics.map(topic => <article className="lgo-guidance-topic-card" key={topic.id}>
      <div className="lgo-guidance-topic-art" aria-hidden="true"><ReleaseIcon name={topic.icon}/></div>
      <div className="lgo-guidance-topic-copy"><h3>{topic.title}</h3><p>{topic.description}</p>
        <LinkButton href={topic.href} tone="gold">{topic.action}<ReleaseIcon name="arrow"/></LinkButton>
      </div>
    </article>)}
  </div>;
}

/** Native disclosure keeps FAQ readable and keyboard operable without hydration. */
export function QuestionDisclosureList({ items }: { items: readonly GuidanceQuestion[] }) {
  return <div className="lgo-question-list">
    {items.map(item => <details key={item.id} id={item.id}>
      <summary><span>{item.question}</span><span className="lgo-question-toggle" aria-hidden="true">+</span></summary>
      <div className="lgo-question-answer">{item.answer}</div>
    </details>)}
  </div>;
}
