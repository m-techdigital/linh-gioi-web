#!/usr/bin/env python3
"""Exact tester preparation specialization plus the already active shared article contract."""
from pathlib import Path
import runpy
ROOT=Path(__file__).resolve().parents[1]

def main()->int:
    prior=runpy.run_path(str(ROOT/'tools/validate_web_fe_control_tower_article_v1254.py'))
    result=prior['main']()
    require=prior['require'];errors=prior['ERRORS']
    route=require('apps/web/src/app/news/[slug]/page.tsx',('if (entry.slug === "closed-tester-information-pack-started")','<PublicTesterPreparationArticle entry={entry} related={related}/>'))
    if route.find('notFound();')>route.find('<PublicTesterPreparationArticle'):errors.append('category guard must precede tester preparation specialization')
    view=require('apps/web/src/components/PublicTesterPreparationArticle.tsx',('contentDetailSections.filter(section => section.slug === entry.slug)','<PublishedArticle entry={entry} related={related}','chapterLinks={chapterLinks}','Mục lục bài viết chuẩn bị kiểm thử','Bối cảnh của bản cập nhật web v1.20','href: "/release/tester-pack#tester-checklist"','href: "/release/tester-pack#tester-device"','href: "/release/tester-pack#tester-limits"','href: "/release/tester-pack#tester-feedback"','href: "/guides/closed-tester-information-pack-guide"','href: "/support/safety"','href: "/support/help"'))
    for marker in ('<GuideArticle','<ExperienceHero','<Stack','<section','<form','useState(','fetch(','localStorage','sessionStorage','dangerouslySetInnerHTML'):
        if marker in view:errors.append('page must remain a thin source/label composition: '+marker)
    require('packages/ui/src/index.ts',('PublishedArticle','PublishedArticleCopy'))
    require('apps/web/src/components/PublicDesignTargetReference.tsx',('pathname === "/news/closed-tester-information-pack-started"','Bố cục bài viết chuẩn bị kiểm thử'))
    require('tests/e2e/fe-news-tester-pack-article-v1260.spec.ts',('contentDetailSections.filter','s.playerImpact','s.nonClaim','entry.publishedAt','toHaveCount(7)','page.goBack()','page.goForward()','about:blank','%E0%A4%A','width:320','toBeGreaterThanOrEqual(14)','toBeGreaterThanOrEqual(44)','requests).toEqual([])','storage()).toEqual(before)','violations).toEqual([])','reduced motion uses','resizing the same article','expanded text spacing','width:844,height:390','screenshot','article link reaches','tester-checklist','tester-device','tester-limits','tester-feedback','toBeChecked()','page.reload('))
    require('tests/component/published-article.test.tsx',('renderToStaticMarkup','shared frame preserves every source field','caller editorial labels','no related entries','escaped'))
    print('WEB FE TESTER PREPARATION ARTICLE v1.260 SOURCE '+('FAIL' if result or errors else 'PASS'))
    for error in errors:print('- '+error)
    return int(bool(result or errors))
if __name__=='__main__':raise SystemExit(main())
