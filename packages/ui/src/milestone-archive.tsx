"use client";

import { useId, useRef, useState } from "react";
import { FilterChoices } from "./filter-choices";
import { SpiritButton } from "./primitives";

/** Display of authored roadmap records; these are not live work status or release evidence. */
export type MilestoneSourceState = "current" | "next" | "planned" | "blocked";
export type MilestoneSourceRecord = {
  version: string; title: string; status: MilestoneSourceState; summary: string;
};
type Filter = "all" | MilestoneSourceState;
const options: readonly { value: Filter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "current", label: "Trong nguồn: current" },
  { value: "next", label: "Trong nguồn: next" },
  { value: "planned", label: "Trong nguồn: planned" },
  { value: "blocked", label: "Trong nguồn: blocked" }
];

export function MilestoneArchive({ items, label }: { items: readonly MilestoneSourceRecord[]; label: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const prefix = useId();
  const toolbarRef = useRef<HTMLDivElement>(null);
  function restoreAll() {
    setFilter("all");
    toolbarRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }
  const visible = filter === "all" ? items : items.filter(item => item.status === filter);
  return <div className="lgo-milestone-archive">
    <div className="lgo-milestone-toolbar" ref={toolbarRef}>
      <FilterChoices options={options} value={filter} onChange={setFilter} label={label}
        controlsId={`${prefix}-entries`} className="lgo-milestone-filters"/>
      <output role="status" aria-live="polite" aria-atomic="true">Hiển thị {visible.length}/{items.length} mốc trong nguồn</output>
    </div>
    <div className="lgo-milestone-entries" id={`${prefix}-entries`}>
      {visible.map(item => <article className="lgo-milestone-entry" key={item.version}
        data-version={item.version} data-source-state={item.status}>
        <div className="lgo-milestone-entry-top"><strong>{item.version}</strong><span>Nhãn nguồn: <code>{item.status}</code></span></div>
        <h3>{item.title}</h3><p>{item.summary}</p>
      </article>)}
      {visible.length === 0 ? <div className="lgo-milestone-empty">
        <p>Không có mốc mang nhãn này trong dữ liệu nguồn. Điều đó không có nghĩa dự án đã hoàn tất.</p>
        <SpiritButton type="button" tone="neutral" onClick={restoreAll}>Xem lại tất cả</SpiritButton>
      </div> : null}
    </div>
  </div>;
}
