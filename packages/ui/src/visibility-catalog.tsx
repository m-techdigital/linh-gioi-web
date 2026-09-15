"use client";

import { useId, useState } from "react";
import { SpiritButton } from "./primitives";

/** Presentation-only labels; not a health API or accepted backend contract. */
export type PresentationVisibility = "public" | "internal" | "blocked";
export type VisibilityCatalogItem = {
  id: string; title: string; visibility: PresentationVisibility;
  summary: string; evidence: string; boundary: string;
};
export const visibilityLabels: Record<PresentationVisibility, string> = { public: "Công khai", internal: "Nội bộ", blocked: "Tạm khóa" };
const filters: ReadonlyArray<{ value: "all" | PresentationVisibility; label: string }> = [
  { value: "all", label: "Tất cả" }, { value: "public", label: "Công khai" },
  { value: "internal", label: "Nội bộ" }, { value: "blocked", label: "Tạm khóa" }
];

export function VisibilityCatalog({ items, label }: { items: readonly VisibilityCatalogItem[]; label: string }) {
  const [filter, setFilter] = useState<"all" | PresentationVisibility>("all");
  const prefix = useId();
  const visible = filter === "all" ? items : items.filter(item => item.visibility === filter);
  return <div className="lgo-visibility-catalog">
    <div className="lgo-visibility-filterbar">
      <div className="lgo-visibility-filters" role="group" aria-label={label}>
        {filters.map(option => <SpiritButton key={option.value} type="button" tone="neutral"
          aria-controls={`${prefix}-results`} aria-pressed={filter === option.value} onClick={() => setFilter(option.value)}>{option.label}</SpiritButton>)}
      </div>
      <output role="status" aria-live="polite">Hiển thị {visible.length}/{items.length} hạng mục</output>
    </div>
    <div className="lgo-visibility-results" id={`${prefix}-results`}>
      {visible.map(item => <article key={item.id} className="lgo-visibility-card" data-visibility={item.visibility}>
        <div className="lgo-visibility-card-heading"><h3>{item.title}</h3><span className="lgo-visibility-state"><span aria-hidden="true" />{visibilityLabels[item.visibility]}</span></div>
        <p>{item.summary}</p>
        <details><summary>Nguồn &amp; giới hạn <span aria-hidden="true">+</span></summary>
          <div><p><strong>Nguồn đối chiếu:</strong> {item.evidence}</p><p className="lgo-visibility-boundary">{item.boundary}</p></div>
        </details>
      </article>)}
      {visible.length === 0 ? <p className="lgo-visibility-empty">Không có hạng mục phù hợp bộ lọc. Đây không phải kết luận về sức khỏe hệ thống.</p> : null}
    </div>
  </div>;
}
