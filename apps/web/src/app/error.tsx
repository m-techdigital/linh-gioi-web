"use client";

import { ErrorState, LinkButton, Stack } from "@lgo-web/ui";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="lgo-main">
      <div className="lgo-container">
        <Stack>
          <ErrorState title="Lỗi giao diện">This is a client-side error boundary; no backend claim is made.</ErrorState>
          <button className="lgo-button lgo-tone-spirit" onClick={reset}>Thử lại</button>
          <LinkButton href="/">Về trang chủ</LinkButton>
        </Stack>
      </div>
    </main>
  );
}
