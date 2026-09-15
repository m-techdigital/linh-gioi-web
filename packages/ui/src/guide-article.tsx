import type { ReactNode } from "react";
import { LinkButton } from "./primitives";
import { ReleaseIcon } from "./release";
import { ArticleFragmentRestoration } from "./article-fragment-restoration";

export type GuideArticleSection = {
  id: string;
  marker: string;
  title: string;
  body: ReactNode;
};

/** Source-backed article navigation. Native fragments never imply saved reading progress. */
export function GuideArticle({ sections, contentsId, contentsLabel, intro }: {
  sections: readonly GuideArticleSection[];
  contentsId: string;
  contentsLabel: string;
  intro: ReactNode;
}) {
  return <div className="lgo-guide-article-layout">
    <aside className="lgo-article-contents lgo-release-frame" id={contentsId} tabIndex={-1}>
      <details open>
        <summary>Mục lục bài viết <span>{sections.length} phần</span></summary>
        <nav aria-label={contentsLabel}>
          <ol>{sections.map(section => <li key={section.id}>
            <a href={`#${section.id}`}><span aria-hidden="true">{section.marker}</span><strong>{section.title}</strong></a>
          </li>)}</ol>
        </nav>
      </details>
      <p>Chọn phần cần đọc. Có thể mở trực tiếp hoặc chia sẻ đường dẫn của từng phần; không lưu tiến trình tài khoản.</p>
    </aside>
    <div className="lgo-guide-article-body">
      <div className="lgo-guide-article-intro">{intro}</div>
      {sections.map((section, index) => {
        const previous = sections[index - 1], next = sections[index + 1];
        return <section className="lgo-guide-article-section lgo-release-frame" key={section.id}
          id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-heading`}>
          <header><span className="lgo-article-section-marker" aria-hidden="true">{section.marker}</span>
            <div><span className="lgo-article-section-eyebrow">Một điểm trên đường đọc</span>
              <h2 id={`${section.id}-heading`}>{section.title}</h2></div>
          </header>
          <div className="lgo-article-section-copy">{section.body}</div>
          <nav className="lgo-article-section-navigation" aria-label={`Điều hướng phần ${section.marker}`}>
            {previous ? <a href={`#${previous.id}`}>← Phần trước<span>{previous.title}</span></a> : <span/>}
            <a href={`#${contentsId}`} className="lgo-article-return">Về mục lục</a>
            {next ? <a href={`#${next.id}`}>Phần tiếp →<span>{next.title}</span></a> : <span/>}
          </nav>
        </section>;
      })}
    </div>
    <ArticleFragmentRestoration targetIds={[contentsId, ...sections.map(section => section.id)]}/>
  </div>;
}

/** Reusable authored instruction/result/boundary content; it never changes the source wording. */
export function GuideChapterBody({ instruction, outcome, boundary, action, actionGroup }: {
  instruction: string;
  outcome: string;
  boundary: string;
  action?: { href: string; label: string; className?: string };
  actionGroup?: { label: string; links: readonly { href: string; label: string; className?: string }[] };
}) {
  return <>
    <p className="lgo-article-instruction">{instruction}</p>
    <div className="lgo-article-outcome"><h3><ReleaseIcon name="document"/>Điều cần hiểu</h3><p>{outcome}</p></div>
    <div className="lgo-article-boundary"><h3><ReleaseIcon name="lock"/>Giới hạn hiện tại</h3><p>{boundary}</p></div>
    {action ? <LinkButton className={action.className} href={action.href} tone="neutral">{action.label}<ReleaseIcon name="arrow"/></LinkButton> : null}
    {actionGroup?.links.length ? <nav className="lgo-guide-chapter-actions" aria-label={actionGroup.label}>
      {actionGroup.links.map(link => <LinkButton key={link.href} href={link.href} className={link.className} tone="neutral">{link.label}<ReleaseIcon name="arrow"/></LinkButton>)}
    </nav> : null}
  </>;
}
