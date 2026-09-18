#!/usr/bin/env python3
"""Source guard for WEB-OPT-15 news player discovery v1.292."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
ERRORS=[]

def read(rel):
 p=ROOT/rel
 if not p.is_file():
  ERRORS.append("missing "+rel)
  return ""
 return p.read_text(encoding="utf-8")

def need(rel,*markers):
 text=read(rel)
 for marker in markers:
  if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
 return text

def main():
 ERRORS.clear()
 page=need("apps/web/src/app/news/page.tsx","<PublicNewsDiscovery/>","@lgo-web/ui/reading-catalog.css")
 view=need("apps/web/src/components/PublicNewsDiscovery.tsx",
  "playerNewsEntries()","archiveNewsEntries()","Chưa có bản tin game mới","Không dùng nhật ký phát triển để lấp chỗ trống.",
  'id="news-library"','id="news-devlog-archive"',"NO_ACCEPTED_BACKEND_CONTRACT")
 if "lgo-library-boundary" in view:
  ERRORS.append("hero still repeats technical/news-feed boundary before the player-news state")
 reading=view.find('aria-labelledby="news-reading-heading"')
 archive=view.find('id="news-devlog-archive"')
 if reading<0 or archive<0 or reading>archive:
  ERRORS.append("useful player reading routes must precede the engineering archive")
 css=need("packages/ui/src/announcement-board.css","WEB-OPT-15 player-news empty action rail",
  ".lgo-announcement-reading-routes.lgo-news-primary-empty-actions","overflow-x:auto","scroll-snap-type:x proximity")
 policy=need("packages/content/src/public-ia.ts","currentNewsPolicy","playerNewsEntries","archiveNewsEntries")
 if policy.count(': "player"')!=0:
  ERRORS.append("v1.292 must not invent player-news policy entries")
 if policy.count(': "archive"')<1:
  ERRORS.append("archive policy unexpectedly empty")
 for marker in ("fetch(","WebSocket","<form","<textarea","localStorage","sessionStorage"):
  if marker in page+view: ERRORS.append("news discovery must remain source/local only: "+marker)
 test=need("tests/e2e/web-opt-news-player-discovery-v1292.spec.ts",
  "truthful player-news empty state is primary and archive follows useful routes",
  "hero and mobile empty-state actions prioritize players instead of repeated technical proof",
  "archive remains reachable without becoming player news or a live feed")
 state=read("tools/validate_web_current_state.py")
 if '"validate_web_opt_news_player_discovery_v1292.py"' not in state:
  ERRORS.append("v1.292 validator not registered in current state")
 if ERRORS:
  print("WEB OPT NEWS PLAYER DISCOVERY v1.292 VALIDATION FAIL")
  for error in ERRORS: print("- "+error)
  return 1
 print("WEB OPT NEWS PLAYER DISCOVERY v1.292 VALIDATION PASS")
 return 0

if __name__=="__main__":
 raise SystemExit(main())
