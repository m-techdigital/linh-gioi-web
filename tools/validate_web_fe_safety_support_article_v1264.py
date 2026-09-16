#!/usr/bin/env python3
"""Exact safety/support article composed from the established publication owner."""
from pathlib import Path
import runpy
ROOT=Path(__file__).resolve().parents[1]

def main()->int:
    prior=runpy.run_path(str(ROOT/'tools/validate_web_fe_control_tower_article_v1254.py'))
    result=prior['main']()
    require=prior['require'];errors=prior['ERRORS']
    route=require('apps/web/src/app/news/[slug]/page.tsx',('if (entry.slug === "player-safety-support-faq-polish-started")','<PublicSafetySupportArticle entry={entry} related={related}/>'))
    if route.find('notFound();')>route.find('<PublicSafetySupportArticle'):errors.append('category guard must precede selected article')
    view=require('apps/web/src/components/PublicSafetySupportArticle.tsx',('contentDetailSections.filter(section => section.slug === entry.slug)','<PublishedArticle entry={entry} related={related}','chapterLinks={chapterLinks}','Mục lục bài viết an toàn và hỗ trợ','Bối cảnh của bản cập nhật web v1.14','href: "/support/safety"','href: "/support/help"','href: "/guides/player-safety-support-guide"','href: "/community"','href: "/support"','href: "/status"','href: "/download/trust"','href: "/release/tester-pack"'))
    for marker in ('<GuideArticle','<ExperienceHero','<Stack','<section','<form','useState(','fetch(','localStorage','sessionStorage','dangerouslySetInnerHTML'):
        if marker in view:errors.append('page must remain a thin source/label composition: '+marker)
    require('packages/ui/src/index.ts',('PublishedArticle','PublishedArticleCopy'))
    require('apps/web/src/components/PublicDesignTargetReference.tsx',('pathname === "/news/player-safety-support-faq-polish-started"','Bố cục bài viết an toàn và hỗ trợ'))
    require('tests/e2e/fe-news-safety-support-article-v1264.spec.ts',('contentDetailSections.filter','s.playerImpact','s.nonClaim','entry.publishedAt','toHaveCount(8)','page.goBack()','page.goForward()','about:blank','%E0%A4%A','width:320','toBeGreaterThanOrEqual(14)','toBeGreaterThanOrEqual(44)','requests).toEqual([])','storage()).toEqual(before)','violations).toEqual([])','reduced motion uses','resizing the same article','expanded text spacing','width:844,height:390','screenshot','safety destination checklist','FAQ destination filters','supportFaqs','privacy-safe issue reporting','playerSafetyPrinciples','privacy-first-reports','aria-pressed','page.reload()','không tự che ảnh/log'))
    require('tests/component/published-article.test.tsx',('renderToStaticMarkup','shared frame preserves every source field','caller editorial labels','no related entries','escaped'))
    print('WEB FE SAFETY SUPPORT ARTICLE v1.264 SOURCE '+('FAIL' if result or errors else 'PASS'))
    for error in errors:print('- '+error)
    return int(bool(result or errors))
if __name__=='__main__':raise SystemExit(main())
