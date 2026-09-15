"use client";

import { useId, useState } from "react";
import { LinkButton, SpiritButton } from "./primitives";
import { ProgressStep, ProgressSteps } from "./progress";

/** A local reading position, never enrollment, completion approval or persistent progress. */
export type ReadingJourneyStep = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  note?: string;
  href: string;
  action: string;
};

export function ReadingJourney({ steps, label, boundary, columns }: {
  steps: readonly ReadingJourneyStep[];
  label: string;
  boundary: string;
  columns?: 4;
}) {
  const [position, setPosition] = useState(0);
  const prefix = useId();
  const index = Math.min(position, Math.max(steps.length - 1, 0));
  const active = steps[index];
  const panelId = `${prefix}-panel`;
  const headingId = `${prefix}-heading`;
  if (!active) return <p className="lgo-reading-journey-empty">Chưa có bước đọc được cấu hình.</p>;

  return <div className="lgo-reading-journey" data-columns={columns}>
    <ProgressSteps label={label}>
      {steps.map((step, stepIndex) => <ProgressStep key={step.id}
        title={step.title} description={step.summary} marker={String(stepIndex + 1).padStart(2, "0")}
        state={stepIndex === index ? "current" : "upcoming"}
        statusLabel={stepIndex === index ? "Bước đang xem" : "Có thể xem"}>
        <SpiritButton type="button" tone="neutral" aria-controls={panelId}
          aria-pressed={stepIndex === index} onClick={() => setPosition(stepIndex)}
          aria-label={`Xem bước ${stepIndex + 1}: ${step.title}`}>Xem bước này</SpiritButton>
      </ProgressStep>)}
    </ProgressSteps>
    <section className="lgo-reading-journey-panel" id={panelId} aria-labelledby={headingId}>
      <div>
        <span className="lgo-reading-journey-overline">Bước {index + 1} · Hướng dẫn đọc</span>
        <h3 id={headingId}>{active.title}</h3>
        <p>{active.detail}</p>
        {active.note ? <p className="lgo-reading-journey-note">{active.note}</p> : null}
      </div>
      <LinkButton href={active.href} tone="gold">{active.action}</LinkButton>
    </section>
    <div className="lgo-reading-journey-controls">
      <SpiritButton type="button" tone="neutral" disabled={index === 0}
        aria-controls={panelId} onClick={() => setPosition(index - 1)}>Bước trước</SpiritButton>
      <output role="status" aria-live="polite" aria-atomic="true">Đang xem bước {index + 1}/{steps.length}</output>
      <SpiritButton type="button" tone="neutral" disabled={index === steps.length - 1}
        aria-controls={panelId} onClick={() => setPosition(index + 1)}>Bước tiếp</SpiritButton>
    </div>
    <p className="lgo-reading-journey-boundary">{boundary}</p>
  </div>;
}
