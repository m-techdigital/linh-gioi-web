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

export function GuidanceStation({ headingId, title, description, topics, note }: {
  headingId: string; title: string; description: string;
  topics: readonly GuidanceTopic[]; note: string;
}) {
  return <nav className="lgo-guidance-station" aria-labelledby={headingId}>
    <div className="lgo-guidance-station-crest"><ReleaseIcon name="help" /></div>
    <h2 id={headingId}>{title}</h2><p>{description}</p>
    <div className="lgo-guidance-station-links">
      {topics.map(topic => <a href={topic.href} key={topic.id}>
        <ReleaseIcon name={topic.icon}/><strong>{topic.title}</strong><span>{topic.hint}</span>
      </a>)}
    </div>
    <small>{note}</small>
  </nav>;
}

export function GuidanceTopicGrid({ topics }: { topics: readonly GuidanceTopic[] }) {
  return <div className="lgo-guidance-topic-grid">
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
