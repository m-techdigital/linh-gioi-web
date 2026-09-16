"use client";

import { useId, useState } from "react";
import { FilterChoices } from "./filter-choices";
import { FormField, TextInput } from "./forms";
import { LinkButton, SpiritButton } from "./primitives";
import { ReleaseIcon } from "./release";
import type { ReleaseIconName } from "./release";

export type ReadingCatalogEntry = {
  id: string; title: string; description: string; href: string; groupId: string;
  publication?: { iso: string; label: string };
};
export type ReadingCatalogGroup = { id: string; label: string; icon: ReleaseIconName };

/** Labels belong to the calling publication; the matching state stays shared. */
export type ReadingCatalogCopy = {
  searchLabel: string; placeholder: string; groupLabel: string; itemLabel: string;
  actionLabel: string; countLabel: string; emptyTitle: string;
  emptyDescription: string; noMatchDescription: string;
};
const defaultCopy: ReadingCatalogCopy = {
  searchLabel: "Tìm trong thư viện", placeholder: "Ví dụ: Cổng Linh, checksum, an toàn…",
  groupLabel: "Chọn nhóm hướng dẫn", itemLabel: "Hướng dẫn", actionLabel: "Đọc hướng dẫn",
  countLabel: "bài hướng dẫn", emptyTitle: "Chưa có hướng dẫn công khai",
  emptyDescription: "Thư viện chưa có bài đã công bố. Không tạo bài mẫu để lấp chỗ trống.",
  noMatchDescription: "Thử từ khóa ngắn hơn, chọn nhóm khác hoặc xóa bộ lọc để xem lại toàn bộ thư viện."
};

/** Local title/description matching only; never sends or persists typed words. */
function normalizeReadingText(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/\s+/g, " ").trim();
}

export function ReadingCatalog({ entries, groups, label, copy = defaultCopy }: {
  entries: readonly ReadingCatalogEntry[];
  groups: readonly ReadingCatalogGroup[];
  label: string;
  copy?: ReadingCatalogCopy;
}) {
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState("all");
  const prefix = useId();
  const inputId = `${prefix}-search`, resultsId = `${prefix}-results`;
  const phrase = normalizeReadingText(query);
  const options = [
    { value: "all", label: `Tất cả (${entries.length})` },
    ...groups.map(group => ({ value: group.id, label: `${group.label} (${entries.filter(entry => entry.groupId === group.id).length})` }))
  ];
  const visible = entries.filter(entry => {
    const text = normalizeReadingText(`${entry.title} ${entry.description}`);
    return (groupId === "all" || entry.groupId === groupId) && text.includes(phrase);
  });
  function clearFilters() {
    setQuery(""); setGroupId("all");
    // Keep focus on a stable control rather than the reset button becoming disabled.
    document.getElementById(inputId)?.focus();
  }
  return <div className="lgo-reading-catalog">
    <div className="lgo-reading-catalog-controls lgo-release-frame">
      <div className="lgo-reading-catalog-search">
        <FormField id={inputId} label={copy.searchLabel} help="Lọc cụm từ trong tiêu đề và mô tả; có thể gõ tiếng Việt không dấu.">
          {props => <TextInput {...props} type="search" value={query} maxLength={120} autoComplete="off" spellCheck={false}
            placeholder={copy.placeholder} aria-controls={resultsId}
            onChange={event => setQuery(event.currentTarget.value)} />}
        </FormField>
        <SpiritButton type="button" tone="neutral" disabled={query === "" && groupId === "all"} onClick={clearFilters}>Xóa bộ lọc</SpiritButton>
      </div>
      {groups.length > 0 ? <FilterChoices options={options} value={groupId} onChange={setGroupId} label={copy.groupLabel} controlsId={resultsId} className="lgo-reading-catalog-filters"/> : null}
      <p className="lgo-reading-catalog-privacy">Từ khóa không được gửi hoặc lưu. Tải lại trang sẽ bỏ bộ lọc; không tìm kiếm toàn website hay dữ liệu tài khoản.</p>
    </div>
    <div className="lgo-reading-catalog-result-heading"><output role="status" aria-live="polite" aria-atomic="true">Đang hiển thị {visible.length}/{entries.length}{` ${copy.countLabel}`}</output><span>Nội dung đã công bố · Không phải trạng thái game</span></div>
    <div id={resultsId} className="lgo-reading-catalog-grid" role="region" aria-label={label}>
      {visible.map(entry => {
        const group = groups.find(item => item.id === entry.groupId);
        return <article className="lgo-reading-catalog-card" data-entry-id={entry.id} data-group={entry.groupId} key={entry.id}>
          <div className="lgo-reading-catalog-card-top"><ReleaseIcon name={group?.icon ?? "document"}/><span>{group?.label ?? copy.itemLabel}</span></div>
          {entry.publication ? <div className="lgo-catalog-publication"><span>Ngày đăng</span><time dateTime={entry.publication.iso}>{entry.publication.label}</time></div> : null}
          <h3>{entry.title}</h3>
          <details className="lgo-catalog-summary"><summary>Tóm tắt <span aria-hidden="true">+</span></summary><p>{entry.description}</p></details>
          <LinkButton href={entry.href} tone="neutral" aria-label={`${copy.actionLabel}: ${entry.title}`}>{`${copy.actionLabel} `}<ReleaseIcon name="arrow"/></LinkButton>
        </article>;
      })}
      {visible.length === 0 ? <div className="lgo-reading-catalog-empty">
        <ReleaseIcon name="document"/><h3>{entries.length ? "Chưa tìm thấy bài phù hợp" : copy.emptyTitle}</h3>
        <p>{entries.length ? copy.noMatchDescription : copy.emptyDescription}</p>
      </div> : null}
    </div>
  </div>;
}
