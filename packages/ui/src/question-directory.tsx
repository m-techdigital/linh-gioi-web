"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LinkButton, SpiritButton } from "./primitives";
import { QuestionDisclosureList } from "./guidance";
import type { GuidanceQuestion } from "./guidance";
import { ReleaseIcon } from "./release";
import type { ReleaseIconName } from "./release";

/** A local, source-backed reading index. Not a search or support-service API. */
export type GuidanceQuestionGroup = {
  id: string;
  title: string;
  icon: ReleaseIconName;
  questions: readonly GuidanceQuestion[];
  href: string;
  action: string;
};

export function QuestionDirectory({ groups, anchorId }: {
  groups: readonly GuidanceQuestionGroup[];
  anchorId: string;
}) {
  const [selected, setSelected] = useState("all");
  const resultId = useId();
  const pendingAnchor = useRef<string | null>(null);
  const visible = selected === "all" ? groups : groups.filter(group => group.id === selected);

  useEffect(() => {
    function readHash() {
      const hash = window.location.hash.slice(1);
      const group = groups.find(item => item.id === hash);
      pendingAnchor.current = group?.id ?? (hash === anchorId ? anchorId : null);
      setSelected(group?.id ?? "all");
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, [groups, anchorId]);

  useEffect(() => {
    const target = pendingAnchor.current;
    if (!target) return;
    const element = document.getElementById(target);
    if (!element) return;
    element.scrollIntoView({ block: "start" });
    element.focus({ preventScroll: true });
    pendingAnchor.current = null;
  }, [selected]);

  function select(id: string) {
    pendingAnchor.current = null;
    const hash = id === "all" ? anchorId : id;
    // Preserve the framework history state. Category changes do not submit or fetch data.
    if (window.location.hash !== `#${hash}`) {
      window.history.pushState(window.history.state, "", `#${hash}`);
    }
    setSelected(id);
  }

  return <div className="lgo-question-directory">
    <div className="lgo-question-filterbar">
      <div className="lgo-question-filters" role="group" aria-label="Chọn chủ đề câu hỏi">
        <SpiritButton type="button" tone="neutral" aria-pressed={selected === "all"} aria-controls={resultId} onClick={() => select("all")}>Tất cả</SpiritButton>
        {groups.map(group => <SpiritButton key={group.id} type="button" tone="neutral" aria-controls={resultId}
          aria-pressed={selected === group.id} onClick={() => select(group.id)}>{group.title}</SpiritButton>)}
      </div>
      <output role="status" aria-live="polite">Đang xem {visible.length}/{groups.length} chủ đề</output>
    </div>
    <div className="lgo-question-groups" id={resultId} data-filtered={selected !== "all"}>
      {visible.map(group => <section key={group.id} id={group.id} className="lgo-question-group lgo-release-reading-panel lgo-release-frame"
        aria-labelledby={`${group.id}-heading`} tabIndex={-1}>
        <div className="lgo-question-group-heading"><ReleaseIcon name={group.icon}/><h3 id={`${group.id}-heading`}>{group.title}</h3><span>{group.questions.length} câu hỏi</span></div>
        <QuestionDisclosureList items={group.questions}/>
        <LinkButton href={group.href} tone="neutral">{group.action}<ReleaseIcon name="arrow"/></LinkButton>
      </section>)}
    </div>
  </div>;
}
