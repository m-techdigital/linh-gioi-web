#!/usr/bin/env python3
"""Source ownership/semantic guard. Actual browser/visual proof is separate."""
from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parents[1]
ERRORS:list[str]=[]
def require(rel:str,markers:tuple[str,...]=())->str:
 p=ROOT/rel
 if not p.is_file():ERRORS.append(f'missing {rel}');return ''
 s=p.read_text(encoding='utf-8')
 for marker in markers:
  if marker not in s:ERRORS.append(f'{rel}: missing {marker}')
 return s

def main()->int:
 ERRORS.clear()
 page=require('apps/web/src/app/events/page.tsx',('localContentRepository.list("events")','lgo-events-experience','@lgo-web/ui/announcement-board.css'))
 order=('<PublicEventsHero/>','<PublicEventAnnouncements entries={entries}/>','<PublicEventsReadingRoutes/>');offsets=[page.find(p) for p in order]
 if -1 in offsets or offsets!=sorted(offsets):ERRORS.append('hero, published announcements and reading routes must remain ordered')
 for token in ('lgo-service-compact-proof-page','<form','Date.now('):
  if token in page:ERRORS.append(f'obsolete/unsafe route {token}')
 view=require('apps/web/src/components/PublicEventsExperience.tsx',('title="Sự kiện Linh Giới"','AnnouncementBoard','entries.map(entry =>','id: entry.slug','title: entry.title','summary: entry.summary','body: entry.body','iso: entry.publishedAt','publicationDate.format(new Date(entry.publishedAt))','timeZone: "UTC"','Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.','Chưa có sự kiện live đang mở','0 sự kiện live được xác nhận','id="events-fixture-archive"','Kho chủ đề minh họa','Ngày đăng nội dung không phải ngày tổ chức sự kiện.','Không phải hình sự kiện đang diễn ra','NO_ACCEPTED_BACKEND_CONTRACT','<ArticleFragmentRestoration targetIds={["events-announcements"]}/>','id="events-announcements"','tabIndex={-1}','/status','/roadmap','/community','/support/help','emptyTitle="Chưa có fixture sự kiện"'))
 board=require('packages/ui/src/announcement-board.tsx',('export function AnnouncementBoard','data-announcement-id={item.id}','{item.title}','{item.summary}','{item.body}','dateTime={item.publication.iso}','{item.publication.label}','Ngày đăng nội dung','Không phải ngày tổ chức','<details','Đọc toàn bộ thông báo','items.length === 0','{emptyTitle}','{emptyDescription}'))
 for name,text in [('experience',view),('board',board)]:
  for token in ('"use client"','useState(','localStorage','sessionStorage','fetch(','WebSocket','Date.now(','setInterval(','<form','<input','<textarea','<iframe','<canvas','download=','dangerouslySetInnerHTML','role="timer"','role="progressbar"'):
   if token in text:ERRORS.append(f'{name}: forbidden event-service surrogate {token}')
 require('packages/ui/src/index.ts',('AnnouncementBoard','AnnouncementBoardItem'))
 exports=json.loads(require('packages/ui/package.json')).get('exports',{})
 if exports.get('./announcement-board.css')!='./src/announcement-board.css':ERRORS.append('missing shared stylesheet export')
 css=require('packages/ui/src/announcement-board.css',('.lgo-announcement-card','.lgo-announcement-details > summary:focus-visible','min-height:48px','forced-colors:active','prefers-reduced-motion','grid-template-columns:1fr'))
 tokens=set(re.findall(r'(--lgo-[\w-]+)\s*:',require('packages/design-tokens/src/tokens.css')))
 for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)',css))-tokens):ERRORS.append(f'undefined canonical token {token}')
 if '-webkit-line-clamp' in css:ERRORS.append('announcement content may not be truncated')
 if 'Events page composes shared service proof/card layout' in require('packages/ui/src/service-layout.css'):ERRORS.append('obsolete events CSS retained')
 require('apps/web/src/components/PublicDesignTargetReference.tsx',('pathname === "/events"','Bố cục bảng tin sự kiện'))
 require('tests/e2e/fe-events-announcement-board-v1251.spec.ts',('entry.summary','entry.body','entry.publishedAt','events-fixture-archive','card.width','metrics.loaded','width:320','toBeGreaterThanOrEqual(14)','toBeGreaterThanOrEqual(44)','toBeFocused()','requests).toEqual([])','keyboard.press(\'Shift+Tab\')','forcedColors','violations).toEqual([])','page.goBack()','page.reload()','screenshot'))
 require('tests/component/announcement-board.test.tsx',('renderToStaticMarkup','empty published selection','multiple independent native disclosures','authored strings are text','repository excludes drafts scheduled items','scheduled','draft'))
 require('docs/execution/WEB-NON-CLAIMS.md',('No production auth','No DB persistence','No production deployment'))
 print('WEB FE EVENTS ANNOUNCEMENT BOARD v1.251 SOURCE '+('FAIL' if ERRORS else 'PASS'))
 for error in ERRORS:print('- '+error)
 return int(bool(ERRORS))
if __name__=='__main__':raise SystemExit(main())
