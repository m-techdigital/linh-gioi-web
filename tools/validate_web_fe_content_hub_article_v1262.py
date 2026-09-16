#!/usr/bin/env python3
"""Exact historical content-hub article with the established shared publication contract."""
from pathlib import Path
import runpy
ROOT=Path(__file__).resolve().parents[1]

def main()->int:
    prior=runpy.run_path(str(ROOT/'tools/validate_web_fe_control_tower_article_v1254.py'))
    result=prior['main']()
    require=prior['require'];errors=prior['ERRORS']
    route=require('apps/web/src/app/news/[slug]/page.tsx',('if (entry.slug === "content-ia-hub-polish-started")','<PublicContentHubArticle entry={entry} related={related}/>'))
    if route.find('notFound();')>route.find('<PublicContentHubArticle'):errors.append('category guard must precede selected article')
    view=require('apps/web/src/components/PublicContentHubArticle.tsx',('contentDetailSections.filter(section => section.slug === entry.slug)','<PublishedArticle entry={entry} related={related}','chapterLinks={chapterLinks}','Mục lục bài viết tìm đường đọc','Bối cảnh của bản cập nhật web v1.12','href: "/start"','href: "/guides/start-here-content-hub-guide"','href: "/guides"','href: "/news"','href: "/game"','href: "/download"','href: "/status"','href: "/community"'))
    for marker in ('<GuideArticle','<ExperienceHero','<Stack','<section','<form','useState(','fetch(','localStorage','sessionStorage','dangerouslySetInnerHTML'):
        if marker in view:errors.append('page must remain a thin source/label composition: '+marker)
    require('packages/ui/src/index.ts',('PublishedArticle','PublishedArticleCopy'))
    require('apps/web/src/components/PublicDesignTargetReference.tsx',('pathname === "/news/content-ia-hub-polish-started"','Bố cục bài viết tìm đường đọc'))
    require('tests/e2e/fe-news-content-hub-article-v1262.spec.ts',('contentDetailSections.filter','s.playerImpact','s.nonClaim','entry.publishedAt','toHaveCount(8)','page.goBack()','page.goForward()','about:blank','%E0%A4%A','width:320','toBeGreaterThanOrEqual(14)','toBeGreaterThanOrEqual(44)','requests).toEqual([])','storage()).toEqual(before)','violations).toEqual([])','reduced motion uses','resizing the same article','expanded text spacing','width:844,height:390','screenshot','guide-library destination','news-library destination','Start destination','start-here-content-hub-guide','guide.summary','entry.title','aria-pressed','page.reload()'))
    require('tests/component/published-article.test.tsx',('renderToStaticMarkup','shared frame preserves every source field','caller editorial labels','no related entries','escaped'))
    print('WEB FE CONTENT HUB ARTICLE v1.262 SOURCE '+('FAIL' if result or errors else 'PASS'))
    for error in errors:print('- '+error)
    return int(bool(result or errors))
if __name__=='__main__':raise SystemExit(main())
