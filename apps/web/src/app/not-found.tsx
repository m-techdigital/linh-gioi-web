import { ErrorState, LinkButton, Stack } from "@lgo-web/ui";
import { WebAppShell } from "../components/WebAppShell";

export default function NotFound() {
  return (
    <WebAppShell>
      <Stack>
        <ErrorState title="Không tìm thấy trang">Route chưa tồn tại trong public vertical slice.</ErrorState>
        <LinkButton href="/">Về trang chủ</LinkButton>
      </Stack>
    </WebAppShell>
  );
}
