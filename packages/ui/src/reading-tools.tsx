"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { CheckboxField } from "./forms";
import { SpiritButton } from "./primitives";

export type LocalChecklistItem = { id: string; label: string; description: string };
export function LocalChecklist({ items, label, layout = "list" }: { items: readonly LocalChecklistItem[]; label: string; layout?: "list" | "cards" }) {
  const prefix = useId();
  const [checked, setChecked] = useState<ReadonlySet<string>>(() => new Set());
  const count = items.filter(item => checked.has(item.id)).length;
  return <div className="lgo-local-checklist" data-layout={layout} role="group" aria-label={label}>
    <div className="lgo-local-checklist-toolbar">
      <output className="lgo-local-checklist-count" role="status" aria-live="polite">Đã đánh dấu {count}/{items.length} mục</output>
      <SpiritButton type="button" tone="neutral" disabled={count === 0} onClick={() => setChecked(new Set())}>Bỏ các đánh dấu</SpiritButton>
    </div>
    <div className="lgo-local-checklist-items">{items.map(item => <CheckboxField key={item.id}
      id={`${prefix}-${item.id}`} label={item.label} description={item.description} checked={checked.has(item.id)}
      onChange={event => {
        const selected = event.currentTarget.checked;
        setChecked(previous => { const next = new Set(previous); if (selected) next.add(item.id); else next.delete(item.id); return next; });
      }} />)}</div>
    <p className="lgo-reading-tools-note">Chỉ tự kiểm tra trên trang này. Tải lại trang sẽ xóa đánh dấu; không gửi hoặc lưu dữ liệu tài khoản.</p>
  </div>;
}

export type ReadingTemplate = { id: string; label: string; text: string };
export function TemplateTabs({ templates, label }: { templates: readonly ReadingTemplate[]; label: string }) {
  const prefix = useId();
  const [selected, setSelected] = useState(templates[0]?.id ?? "");
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const operation = useRef(0);
  useEffect(() => () => { operation.current += 1; }, []);
  const active = templates.find(template => template.id === selected) ?? templates[0];
  if (!active) return null;
  const panelId = `${prefix}-template-panel`;
  function activate(index: number) {
    const next = templates[index];
    if (!next) return;
    operation.current += 1;
    setSelected(next.id); setCopyState("idle");
    document.getElementById(`${prefix}-tab-${next.id}`)?.focus();
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const destinations: Record<string, number> = { ArrowRight: (index + 1) % templates.length, ArrowLeft: (index - 1 + templates.length) % templates.length, Home: 0, End: templates.length - 1 };
    const destination = destinations[event.key];
    if (destination === undefined) return;
    event.preventDefault(); activate(destination);
  }
  async function copyTemplate() {
    if (!active) return;
    const request = ++operation.current;
    setCopyState("copying");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(active.text);
      if (request === operation.current) setCopyState("copied");
    } catch {
      if (request === operation.current) setCopyState("error");
    }
  }
  return <div className="lgo-template-tools">
    <div className="lgo-template-tabs" role="tablist" aria-label={label}>
      {templates.map((template, index) => <SpiritButton key={template.id} type="button" tone="neutral" role="tab"
        id={`${prefix}-tab-${template.id}`} aria-controls={panelId} aria-selected={active.id === template.id}
        tabIndex={active.id === template.id ? 0 : -1} onClick={() => activate(index)} onKeyDown={event => onKey(event,index)}>{template.label}</SpiritButton>)}
    </div>
    <div className="lgo-template-panel" id={panelId} role="tabpanel" aria-labelledby={`${prefix}-tab-${active.id}`}>
      <pre tabIndex={0}>{active.text}</pre>
    </div>
    <div className="lgo-template-copy-row"><SpiritButton type="button" tone="gold" disabled={copyState === "copying"} onClick={copyTemplate}>Sao chép mẫu</SpiritButton>
      <span className="lgo-template-feedback" role="status" aria-live="polite" data-state={copyState}>
        {copyState === "copied" ? "Đã sao chép mẫu — chưa gửi đi." : copyState === "error" ? "Chưa sao chép được. Hãy chọn văn bản và sao chép thủ công." : copyState === "copying" ? "Đang sao chép…" : "Chỉ sao chép văn bản; không gửi phản hồi."}
      </span></div>
  </div>;
}
