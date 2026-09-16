import { ReleaseIcon } from "./release";

export type AnnouncementBoardItem = {
  id: string;
  title: string;
  summary: string;
  body: string;
  publication: { iso: string; label: string };
};

export type AnnouncementBoardCopy = {
  eyebrow: string;
  publicationNote: string;
  disclosureLabel: string;
};
const defaultCopy: AnnouncementBoardCopy = {
  eyebrow: "Thông báo định hướng",
  publicationNote: "Không phải ngày tổ chức",
  disclosureLabel: "Đọc toàn bộ thông báo"
};

/** Read-only editorial records. Publication dates never imply an event or release schedule. */
export function AnnouncementBoard({ items, label, boundary, emptyTitle, emptyDescription, copy = defaultCopy }: {
  items: readonly AnnouncementBoardItem[];
  label: string;
  boundary: string;
  emptyTitle: string;
  emptyDescription: string;
  copy?: AnnouncementBoardCopy;
}) {
  return <div className="lgo-announcement-board" role="region" aria-label={label}>
    {items.map(item => <article className="lgo-announcement-card lgo-release-paper-panel" key={item.id} data-announcement-id={item.id}
      aria-labelledby={`announcement-${item.id}-heading`}>
      <div className="lgo-announcement-publication"><ReleaseIcon name="document"/>
        <span>Ngày đăng nội dung</span><time dateTime={item.publication.iso}>{item.publication.label}</time>
        <small>{copy.publicationNote}</small>
      </div>
      <div className="lgo-announcement-copy">
        <span className="lgo-announcement-eyebrow">{copy.eyebrow}</span>
        <h3 id={`announcement-${item.id}-heading`}>{item.title}</h3>
        <p className="lgo-announcement-description">{item.summary}</p>
        <p className="lgo-announcement-boundary"><ReleaseIcon name="lock"/><span>{boundary}</span></p>
        <details className="lgo-announcement-details"><summary>{`${copy.disclosureLabel} `}<span aria-hidden="true">+</span></summary>
          <p className="lgo-announcement-body">{item.body}</p>
        </details>
      </div>
    </article>)}
    {items.length === 0 ? <div className="lgo-announcement-empty lgo-release-reading-panel"><ReleaseIcon name="document"/>
      <h3>{emptyTitle}</h3><p>{emptyDescription}</p>
    </div> : null}
  </div>;
}
