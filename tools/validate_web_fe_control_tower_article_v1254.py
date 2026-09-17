#!/usr/bin/env python3
"""Guard original news fields and shared article owners; browser evidence proves usability."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
ERRORS:list[str]=[]
def require(rel:str,markers:tuple[str,...]=())->str:
 p=ROOT/rel
 if not p.is_file():ERRORS.append('missing '+rel);return ''
 text=p.read_text(encoding='utf-8')
 for marker in markers:
  if marker not in text:ERRORS.append(f'{rel}: missing {marker}')
 return text

def main()->int:
 ERRORS.clear()
 route=require('apps/web/src/app/news/[slug]/page.tsx',('localContentRepository.list("news")','if (!entry || entry.category !== "news") notFound();','renderNewsArticle(entry, related)','.filter((candidate) => candidate.slug !== entry.slug)','.slice(0, 3)'))
 registry=require('apps/web/src/components/PublicEditorialRendererRegistry.tsx',('"web-program-control-tower": PublicControlTowerArticle','PublicGenericNewsArticle','<ArticleDetailDepth slug={entry.slug} />'))
 if route.find('if (!entry || entry.category !== "news") notFound();')>route.find('renderNewsArticle(entry, related)'):ERRORS.append('category guard must precede registry delegation')
 view=require('apps/web/src/components/PublicControlTowerArticle.tsx', ('contentDetailSections.filter(section => section.slug === entry.slug)', '<PublishedArticle entry={entry} related={related}', 'chapterLinks={chapterLinks}', 'Mục lục bài viết Control tower', 'Nền tảng web độc lập', '/status', '/release', '/guides', '/news'))
 frame=require('packages/ui/src/published-article.tsx',('title={entry.title}','lead={entry.summary}','{entry.body}','dateTime={entry.publishedAt}','timeZone: "UTC"','publicationDate.format(new Date(entry.publishedAt))','Ngày đăng nội dung','không phải thông cáo phát hành game','GuideArticle','contentsId={contentsId}','title: section.heading','instruction={section.body}','outcome={section.playerImpact}','boundary={section.nonClaim}','outcomeLabel="Ý nghĩa cho người chơi"','boundaryLabel="Phạm vi bài viết"','chapterLinks[index]','lgo-editorial-article','GuidanceTopicGrid variant="articles"','title: item.title','description: item.summary','href: `/news/${item.slug}`','related.length > 0','/status','/news','/roadmap','NO_ACCEPTED_BACKEND_CONTRACT'))
 require('packages/ui/src/published-article.tsx', ('{copy.breadcrumb}', 'kicker={copy.kicker}', 'alt={copy.coverAlt}', '{copy.coverEyebrow}', '{copy.coverTitle}', '{copy.coverNote}', 'contentsLabel={copy.contentsLabel}', '{copy.introLabel}'))
 chapter=require('packages/ui/src/guide-article.tsx',('outcomeLabel = "Điều cần hiểu"','boundaryLabel = "Giới hạn hiện tại"','{outcomeLabel}','{boundaryLabel}','{instruction}','{outcome}','{boundary}','id={contentsId} tabIndex={-1}','id={section.id} tabIndex={-1}','<ArticleFragmentRestoration','href={link.href}'))
 guidance=require('packages/ui/src/guidance.tsx',('variant = "topics"','variant?: "topics" | "articles"','variant === "articles" ? " lgo-guidance-article-grid" : ""','{topic.title}','{topic.description}','href={topic.href}'))
 for owner,text in [('view',view),('frame',frame),('chapter',chapter)]:
  for marker in ('"use client"','useState(','fetch(','localStorage','sessionStorage','WebSocket','Date.now(','<form','<input','<textarea','<iframe','<canvas','<video','dangerouslySetInnerHTML','preventDefault(','download=','role="progressbar"'):
   if marker in text:ERRORS.append(f'{owner}: unexpected intake/operation {marker}')
 require('packages/ui/src/article-fragment-restoration.tsx',('targetIds.includes(targetId)','target.focus({ preventScroll: true })','behavior: "instant"'))
 css=require('packages/ui/src/guide-article.css',('.lgo-editorial-article .lgo-article-boundary p { font-size:max(.83rem,14px); }','html:has(.lgo-editorial-article) { scroll-behavior:auto; }','prefers-reduced-motion:reduce'))
 guidance_css=require('packages/ui/src/guidance-layout.css',('.lgo-guidance-article-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }',))
 mobile_stack='@media(max-width:900px) { .lgo-guidance-article-grid { grid-template-columns:1fr; } }'
 mobile_rail=('WEB-OPT-07 related-reading rail','grid-auto-flow:column','overflow-x:auto','scroll-snap-type:x proximity')
 if mobile_stack not in guidance_css and not all(marker in guidance_css for marker in mobile_rail):ERRORS.append('guidance layout missing supported mobile article reading pattern')
 css+=guidance_css
 tokens=set(re.findall(r'(--lgo-[\w-]+)\s*:',require('packages/design-tokens/src/tokens.css')))
 for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)',css))-tokens):ERRORS.append('undefined token '+token)
 require('apps/web/src/components/PublicDesignTargetReference.tsx',('pathname === "/news/web-program-control-tower"','Bố cục bài viết nền tảng web'))
 require('tests/e2e/fe-news-control-tower-article-v1254.spec.ts',('contentDetailSections.filter','s.playerImpact','s.nonClaim','entry.publishedAt','related.length','toBeFocused()','page.goBack()','page.goForward()','about:blank','%E0%A4%A','width:320','toBeGreaterThanOrEqual(14)','toBeGreaterThanOrEqual(44)','requests).toEqual([])','storage()).toEqual(before)','violations).toEqual([])','reduced motion uses','getComputedStyle(document.documentElement).scrollBehavior','screenshot'))
 require('tests/component/article-chapter.test.tsx',('renderToStaticMarkup','existing guide labels','escaped text','article related variant','topics:[]'))
 require('docs/execution/WEB-NON-CLAIMS.md',('No production auth','No DB persistence','No production deployment'))
 print('WEB FE CONTROL TOWER ARTICLE v1.254 SOURCE '+('FAIL' if ERRORS else 'PASS'))
 for error in ERRORS:print('- '+error)
 return int(bool(ERRORS))
if __name__=='__main__':raise SystemExit(main())
