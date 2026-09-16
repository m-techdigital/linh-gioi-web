#!/usr/bin/env python3
"""Source selection/ownership guard; browser evidence is required separately."""
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
 require('apps/web/src/app/news/page.tsx',('<PublicNewsDiscovery/>','title: "Tin tức Linh Giới"','@lgo-web/ui/reading-catalog.css','@lgo-web/ui/forms.css'))
 view=require('apps/web/src/components/PublicNewsDiscovery.tsx',('localContentRepository.list("news")','featured = entries.find(entry => entry.featured) ?? entries[0]','title="Tin tức Linh Giới"','<ExperienceHero','<FeaturedReading','title={featured.title}','description={featured.summary}','href={`/news/${featured.slug}`}','actionLabel="Mở bài viết"','<ReadingCatalog','id: entry.slug','title: entry.title','description: entry.summary','href: `/news/${entry.slug}`','iso: entry.publishedAt','publicationDate.format(new Date(entry.publishedAt))','timeZone: "UTC"','groups={[]}','copy={catalogCopy}','id="news-library"','tabIndex={-1}','<ArticleFragmentRestoration targetIds={["news-library"]}/>','Không phải bản tin trực tiếp','NO_ACCEPTED_BACKEND_CONTRACT','/status','/roadmap','/guides','/support/help'))
 if '.slice(' in view or '.sort(' in view:ERRORS.append('do not truncate source selection or invent a recency ranking')
 if view.find('<ExperienceHero')>=view.find('<ReadingCatalog'):ERRORS.append('hero must precede discovery')
 catalog=require('packages/ui/src/reading-catalog.tsx',('export type ReadingCatalogCopy','copy = defaultCopy','searchLabel: "Tìm trong thư viện"','actionLabel: "Đọc hướng dẫn"','countLabel: "bài hướng dẫn"','publication?:','dateTime={entry.publication.iso}','{entry.publication.label}','Ngày đăng','groups.length > 0','label={copy.searchLabel}','aria-label={`${copy.actionLabel}: ${entry.title}`}','normalize("NFD")','text.includes(phrase)','entry.groupId === groupId','maxLength={120}','document.getElementById(inputId)?.focus()','role="status"','aria-live="polite"','<details','{entry.description}','copy.emptyTitle','copy.emptyDescription'))
 feature=require('packages/ui/src/featured-reading.tsx',('actionLabel = "Mở bài hướng dẫn"','{`${actionLabel} `}','href={href}','{description}','<details','Không phải gameplay live'))
 for owner,text in [('view',view),('catalog',catalog),('feature',feature)]:
  for marker in ('fetch(','XMLHttpRequest','localStorage','sessionStorage','WebSocket','Date.now(','setInterval(','<form','<textarea','<iframe','<canvas','dangerouslySetInnerHTML','role="timer"','role="progressbar"','download='):
   if marker in text:ERRORS.append(f'{owner}: unrequested data/operation {marker}')
 css=require('packages/ui/src/reading-catalog.css',('lgo-catalog-discovery','.lgo-catalog-publication','font-size:max(.86rem,14px)','min-height:44px','forced-colors:active','prefers-reduced-motion','.lgo-catalog-summary[open]'))
 tokens=set(re.findall(r'(--lgo-[\w-]+)\s*:',require('packages/design-tokens/src/tokens.css')))
 for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)',css))-tokens):ERRORS.append('undefined token '+token)
 if 'line-clamp' in css:ERRORS.append('catalog may not truncate summaries')
 if 'News page composes shared service proof/card layout' in require('packages/ui/src/service-layout.css'):ERRORS.append('obsolete news-only CSS retained')
 require('packages/ui/src/index.ts',('ReadingCatalogCopy','FeaturedReading'))
 require('apps/web/src/components/PublicDesignTargetReference.tsx',('pathname === "/news"','Bố cục khám phá bản tin'))
 require('tests/e2e/fe-news-discovery-v1253.spec.ts',('contentEntries.filter','entry.summary','entry.publishedAt','entries.length','toBeGreaterThan(3)','accent-insensitive','page.goBack()','page.reload()','toBeFocused()','requests).toEqual([])','storage()).toEqual(before)','width:320','toBeGreaterThanOrEqual(14)','toBeGreaterThanOrEqual(44)','violations).toEqual([])','every article','screenshot'))
 require('tests/component/reading-discovery.test.tsx',('renderToStaticMarkup','empty news data','existing guide defaults','escaped text','featured cover','draft','scheduled'))
 require('docs/execution/WEB-NON-CLAIMS.md',('No production auth','No DB persistence','No live search backend'))
 print('WEB FE NEWS DISCOVERY v1.253 SOURCE '+('FAIL' if ERRORS else 'PASS'))
 for e in ERRORS:print('- '+e)
 return int(bool(ERRORS))
if __name__=='__main__':raise SystemExit(main())
