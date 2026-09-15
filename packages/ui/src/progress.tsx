import type { ReactNode } from "react";

export type ProgressStepState = "current" | "upcoming" | "complete" | "blocked";

/** Ordered presentation only; the caller supplies state and localized copy. */
export function ProgressSteps({ label, children }: { label: string; children: ReactNode }) {
  return <ol className="lgo-progress-steps" aria-label={label}>{children}</ol>;
}

export function ProgressStep({ title, description, state, statusLabel, marker, children }: {
  title: string;
  description: string;
  state: ProgressStepState;
  statusLabel: string;
  marker?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li className="lgo-progress-step" data-state={state} aria-current={state === "current" ? "step" : undefined}>
      <span className="lgo-progress-step-marker" aria-hidden="true">{marker ?? (state === "complete" ? "✓" : "•")}</span>
      <div><strong>{title}</strong><small>{statusLabel}</small><p>{description}</p>{children}</div>
    </li>
  );
}
