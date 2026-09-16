import type { ReactNode } from "react";
import { ReleaseIcon } from "./release";

/** Lightweight editorial principles, never a measured score or progress indicator. */
export function ReadingPriorityPanel({ headingId, overline, title, items, note }: {
  headingId: string;
  overline: string;
  title: ReactNode;
  items: readonly { label: string; value: string; href?: string }[];
  note: string;
}) {
  return <section className="lgo-performance-priority-console" aria-labelledby={headingId}>
    <div className="lgo-performance-crest" aria-hidden="true"><ReleaseIcon name="document"/></div>
    <span className="lgo-performance-console-overline">{overline}</span>
    <h2 id={headingId}>{title}</h2>
    <ol>{items.map(item => <li key={item.label}>{item.href
      ? <a href={item.href}><span>{item.label}</span><strong>{item.value}</strong><ReleaseIcon name="arrow"/></a>
      : <><span>{item.label}</span><strong>{item.value}</strong></>}</li>)}</ol>
    <small>{note}</small>
  </section>;
}
