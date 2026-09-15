"use client";

import {useId, useState, type ReactNode} from "react";
import {CheckboxField} from "./forms";
import {SpiritButton} from "./primitives";
import {ReleaseIcon} from "./release";

export type ReadingPreviewImage = {src: string; alt: string; width: number; height: number};

/** Mount only after an explicit choice. Load state is discarded when hidden. */
function PreviewIllustration({image}: {image: ReadingPreviewImage}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  return <figure className="lgo-reading-preview-illustration" data-state={state}>
    <div className="lgo-reading-preview-image-slot">
      <img src={image.src} alt={image.alt} width={image.width} height={image.height}
        hidden={state === "error"} onLoad={() => setState("loaded")} onError={() => setState("error")}/>
      {state === "error" ? <p><ReleaseIcon name="document"/>Nội dung vẫn ở đây, kể cả khi ảnh không tải được.</p> : null}
    </div>
    <figcaption role="status" aria-live="polite" aria-atomic="true">
      {state === "loaded" ? "Đã tải minh họa — không phải số đo tốc độ." : state === "error" ? "Không tải được minh họa. Tắt rồi bật lại để thử lại." : "Đang tải minh họa… Nội dung vẫn đọc được."}
    </figcaption>
  </figure>;
}

/** A disposable reading example; never changes account/site settings or measures performance. */
export function ReadingPreview({title, children, image}: {title: string; children: ReactNode; image: ReadingPreviewImage}) {
  const [density, setDensity] = useState<"compact" | "comfortable">("compact");
  const [illustration, setIllustration] = useState(false);
  const prefix = useId();
  const sampleId = `${prefix}-sample`;
  const boundaryId = `${prefix}-boundary`;
  return <div className="lgo-reading-preview">
    <div className="lgo-reading-preview-controls">
      <span className="lgo-reading-preview-overline">Thử ngay trên một đoạn đọc</span>
      <fieldset className="lgo-reading-preview-density"><legend>Khoảng cách nội dung</legend>
        <div>{([{id: "compact", label: "Gọn"}, {id: "comfortable", label: "Thoáng hơn"}] as const).map(option =>
          <SpiritButton key={option.id} type="button" tone="neutral" aria-pressed={density === option.id}
            aria-controls={sampleId} onClick={() => setDensity(option.id)}>{option.label}</SpiritButton>)}</div>
      </fieldset>
      <CheckboxField id={`${prefix}-illustration`} label="Hiện minh họa trong khung thử"
        checked={illustration} aria-controls={sampleId} aria-describedby={boundaryId}
        onChange={event => setIllustration(event.currentTarget.checked)}/>
      <p id={boundaryId} className="lgo-reading-preview-boundary">Ảnh chỉ được yêu cầu khi bạn bật. Ẩn ảnh không hoàn lại dữ liệu đã tải. Không thay đổi những trang khác.</p>
      <SpiritButton type="button" tone="neutral" disabled={density === "compact" && !illustration}
        onClick={() => {setDensity("compact"); setIllustration(false);}}>Đặt lại khung thử</SpiritButton>
      <p className="lgo-reading-preview-note">Chỉ thử tại đây. Không lưu tùy chọn; tải lại trang sẽ trở về mặc định. Đây không phải công cụ đo hoặc chế độ tăng tốc.</p>
    </div>
    <section className="lgo-reading-preview-sample" id={sampleId} data-density={density} aria-labelledby={`${prefix}-title`}>
      <span className="lgo-reading-preview-bookmark"><ReleaseIcon name="document"/>Một trang cẩm nang</span>
      <h3 id={`${prefix}-title`}>{title}</h3>
      <div className="lgo-reading-preview-text">{children}</div>
      {illustration ? <PreviewIllustration image={image}/> : <p className="lgo-reading-preview-image-off" role="status">Minh họa đang tắt · Chỉ hiển thị nội dung cần đọc.</p>}
    </section>
  </div>;
}
