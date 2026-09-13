import type { HTMLAttributes, ReactNode } from "react";
import { SpiritButton, StatusBadge, type Tone } from "./primitives";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export type DataTableColumn = {
  key: string;
  label: ReactNode;
  align?: "start" | "center" | "end";
};

export type DataTableRow = {
  id: string;
  cells: Record<string, ReactNode>;
};

export function MetricGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cx("lgo-metric-grid", className)} />;
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "neutral"
}: {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  tone?: Tone;
}) {
  return (
    <article className="lgo-metric-card">
      <StatusBadge tone={tone}>{label}</StatusBadge>
      <strong className="lgo-metric-value">{value}</strong>
      {detail ? <div className="lgo-metric-detail">{detail}</div> : null}
    </article>
  );
}

export function DataToolbar({
  eyebrow,
  title,
  summary,
  actions,
  className
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("lgo-data-toolbar", className)}>
      <div className="lgo-data-toolbar-copy">
        {eyebrow ? <span className="lgo-card-kicker">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {summary ? <p>{summary}</p> : null}
      </div>
      {actions ? <div className="lgo-data-toolbar-actions">{actions}</div> : null}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  caption,
  className
}: {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  caption: string;
  className?: string;
}) {
  return (
    <div
      className={cx("lgo-data-table-wrap", className)}
      role="region"
      aria-label={`Scrollable data table: ${caption}`}
      tabIndex={0}
    >
      <table className="lgo-data-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align ?? "start"}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key} data-align={column.align ?? "start"}>{row.cells[column.key] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export function KeyValueGrid({ className, ...props }: HTMLAttributes<HTMLDListElement>) {
  return <dl {...props} className={cx("lgo-key-value-grid", className)} />;
}

export function KeyValueItem({
  label,
  value,
  detail,
  tone = "neutral"
}: {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="lgo-key-value-item">
      <dt><StatusBadge tone={tone}>{label}</StatusBadge></dt>
      <dd>
        <strong>{value}</strong>
        {detail ? <span>{detail}</span> : null}
      </dd>
    </div>
  );
}


export function ActivityTimeline({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} role="list" className={cx("lgo-activity-timeline", className)} />;
}

export function ActivityTimelineItem({
  title,
  timestamp,
  description,
  meta,
  tone = "neutral"
}: {
  title: ReactNode;
  timestamp: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  tone?: Tone;
}) {
  return (
    <article role="listitem" className="lgo-activity-timeline-item">
      <div className="lgo-activity-timeline-marker" aria-hidden="true" />
      <div className="lgo-activity-timeline-copy">
        <div className="lgo-activity-timeline-heading">
          <strong>{title}</strong>
          <StatusBadge tone={tone}>{timestamp}</StatusBadge>
        </div>
        {description ? <p>{description}</p> : null}
        {meta ? <div className="lgo-activity-timeline-meta">{meta}</div> : null}
      </div>
    </article>
  );
}



export function CaseSummary({
  title,
  state,
  summary,
  tone = "neutral",
  children,
  actions,
  className
}: {
  title: ReactNode;
  state: ReactNode;
  summary?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cx("lgo-case-summary", className)}>
      <div className="lgo-case-summary-heading">
        <div>
          <span className="lgo-card-kicker">Case summary</span>
          <h3>{title}</h3>
        </div>
        <StatusBadge tone={tone}>{state}</StatusBadge>
      </div>
      {summary ? <p className="lgo-case-summary-lead">{summary}</p> : null}
      {children ? <dl className="lgo-case-summary-grid">{children}</dl> : null}
      {actions ? <div className="lgo-case-summary-actions">{actions}</div> : null}
    </article>
  );
}

export function CaseSummaryItem({
  label,
  value,
  detail
}: {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <div className="lgo-case-summary-item">
      <dt>{label}</dt>
      <dd>
        <strong>{value}</strong>
        {detail ? <span>{detail}</span> : null}
      </dd>
    </div>
  );
}

export function PaginationBar({
  label,
  previousLabel = "Trang trước",
  nextLabel = "Trang sau",
  previousDisabled = true,
  nextDisabled = true
}: {
  label: ReactNode;
  previousLabel?: string;
  nextLabel?: string;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  const paginationUnavailableReason = "không khả dụng trong fixture hiện tại";
  return (
    <nav className="lgo-pagination-bar" aria-label="Pagination">
      <SpiritButton
        type="button"
        tone="neutral"
        aria-disabled={previousDisabled ? "true" : undefined}
        data-disabled={previousDisabled ? "true" : undefined}
        aria-label={previousDisabled ? `${previousLabel} — ${paginationUnavailableReason}` : previousLabel}
      >
        {previousLabel}
      </SpiritButton>
      <span>{label}</span>
      <SpiritButton
        type="button"
        tone="neutral"
        aria-disabled={nextDisabled ? "true" : undefined}
        data-disabled={nextDisabled ? "true" : undefined}
        aria-label={nextDisabled ? `${nextLabel} — ${paginationUnavailableReason}` : nextLabel}
      >
        {nextLabel}
      </SpiritButton>
    </nav>
  );
}
