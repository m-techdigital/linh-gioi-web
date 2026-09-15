"use client";

import { useEffect } from "react";

/** Restore an explicitly requested article fragment after the streamed content mounts.
 * Native anchors still own clicks and Back/Forward; no scrolling monitor or saved state.
 */
export function ArticleFragmentRestoration({ targetIds }: { targetIds: readonly string[] }) {
  useEffect(() => {
    let targetId: string;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (!targetIds.includes(targetId)) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ block: "start", behavior: "instant" });
    target.focus({ preventScroll: true });
  }, [targetIds]);
  return null;
}
