import { ReleaseIcon } from "./release";
import type { ReleaseIconName } from "./release";

export type PrivacyNoticeItem = { title: string; description: string; icon: ReleaseIconName };
export function PrivacyNotice({ headingId, title, items, note }: {
  headingId: string; title: string; items: readonly PrivacyNoticeItem[]; note: string;
}) {
  return <section className="lgo-privacy-notice" aria-labelledby={headingId}>
    <div className="lgo-privacy-notice-heading"><ReleaseIcon name="shield"/><h2 id={headingId}>{title}</h2></div>
    <p>Bảo vệ thông tin của bạn trước khi chuẩn bị phản hồi.</p>
    <div className="lgo-privacy-notice-items">{items.map(item=><div className="lgo-privacy-notice-item" key={item.title}>
      <div className="lgo-privacy-notice-icon"><ReleaseIcon name={item.icon}/></div><h3>{item.title}</h3><p>{item.description}</p>
    </div>)}</div>
    <small>{note}</small>
  </section>;
}

export function DataBoundaryColumns({ allowed, withheld }: { allowed: readonly string[]; withheld: readonly string[] }) {
  return <div className="lgo-data-boundary-columns">
    <section className="lgo-data-boundary-allowed" aria-label="Thông tin có thể chuẩn bị">
      <h3><ReleaseIcon name="document"/>Có thể chuẩn bị</h3>
      <ul>{allowed.map(text=><li key={text}>{text}</li>)}</ul>
    </section>
    <section className="lgo-data-boundary-withheld" aria-label="Thông tin không nên gửi">
      <h3><ReleaseIcon name="lock"/>Không nên gửi</h3>
      <ul>{withheld.map(text=><li key={text}>{text}</li>)}</ul>
    </section>
  </div>;
}
