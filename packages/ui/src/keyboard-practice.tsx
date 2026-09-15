"use client";

import {useId, useRef, useState} from "react";
import {CheckboxField} from "./forms";
import {LinkButton, SpiritButton} from "./primitives";
import {ReleaseIcon} from "./release";

/** Native focus practice. No key interception, focus trap, scoring or persisted preference. */
export function KeyboardPractice({nextHref}: {nextHref: string}) {
  const prefix=useId();
  const inputId=`${prefix}-checkbox`;
  const details=useRef<HTMLDetailsElement>(null);
  const [checked,setChecked]=useState(false);
  const [expanded,setExpanded]=useState(false);
  function start() {
    setChecked(false);
    setExpanded(false);
    if(details.current)details.current.open=false;
    document.getElementById(inputId)?.focus();
  }
  return <div className="lgo-keyboard-practice lgo-release-reading-grid">
    <div className="lgo-release-reading-panel lgo-release-frame lgo-keyboard-practice-instructions">
      <span className="lgo-keyboard-practice-overline">Không cần chuột để thử</span>
      <h3>Một lượt thao tác đơn giản</h3>
      <ol><li>Bấm bắt đầu để đưa focus vào ô đánh dấu.</li><li>Nhấn <kbd>Space</kbd> để thay đổi ô; <kbd>Tab</kbd> để tới phần hướng dẫn.</li><li>Nhấn <kbd>Enter</kbd> để mở hướng dẫn; tiếp tục <kbd>Tab</kbd> để đi ra liên kết.</li></ol>
      <SpiritButton type="button" tone="gold" onClick={start} aria-controls={`${prefix}-sample`}>Bắt đầu lượt thử</SpiritButton>
      <p>Nút này cũng bắt đầu lại lượt thử. Dùng Shift + Tab để quay lại. Các phím không bị chặn hoặc thay bằng cơ chế điều khiển riêng.</p>
    </div>
    <section className="lgo-release-paper-panel lgo-release-frame lgo-keyboard-practice-sample" id={`${prefix}-sample`} aria-labelledby={`${prefix}-heading`}>
      <span className="lgo-keyboard-practice-overline">Khung thử, không gửi dữ liệu</span>
      <h3 id={`${prefix}-heading`}>Theo viền để biết đang chọn gì</h3>
      <p>Viền rõ cho biết vị trí hiện tại. Ô đánh dấu chỉ là ví dụ, không phải đồng ý điều khoản hoặc gửi thông tin.</p>
      <CheckboxField id={inputId} label="Đánh dấu thử" checked={checked} onChange={event=>setChecked(event.currentTarget.checked)}/>
      <details ref={details} onToggle={event=>setExpanded(event.currentTarget.open)}>
        <summary>Mở hướng dẫn bàn phím <span aria-hidden="true">+</span></summary>
        <div className="lgo-keyboard-practice-answer"><p>Tab đi tới điều khiển kế tiếp; Shift + Tab quay lại. Enter mở hoặc đóng phần hướng dẫn này.</p><p>Bạn có thể tiếp tục ra khỏi khung bằng Tab. Không có vùng khóa focus.</p></div>
      </details>
      <LinkButton href={nextHref} tone="neutral">Đi tới các lối đọc <ReleaseIcon name="arrow"/></LinkButton>
      <output role="status" aria-live="polite" aria-atomic="true">{checked ? "Đã đánh dấu" : "Chưa đánh dấu"} · Hướng dẫn {expanded ? "đang mở" : "đang đóng"}.</output>
      <small>Trạng thái chỉ nằm trong lượt đọc này. Tải lại trang sẽ đặt lại; không lưu vào tài khoản.</small>
    </section>
  </div>;
}
