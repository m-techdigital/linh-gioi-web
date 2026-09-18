#!/usr/bin/env python3
"""Source/ownership guard. Browser and visual results are separate evidence."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f'missing {rel}')
        return ''
    text = path.read_text(encoding='utf-8')
    for marker in markers:
        if marker not in text: ERRORS.append(f'{rel}: missing {marker}')
    return text

def main() -> int:
    ERRORS.clear()
    page = require('apps/web/src/app/patch-notes/page.tsx', ('localContentRepository.list("patch-notes")', 'lgo-patch-notes-experience', '@lgo-web/ui/announcement-board.css'))
    order = ('<PublicPatchNotesHero/>', '<PublicPatchNoteRecords entries={entries}/>', '<PublicPatchNotesReadingRoutes/>', '<PublicPatchNotesArchive entries={entries}/>')
    offsets = [page.find(marker) for marker in order]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append('journal composition order changed')
    view = require('apps/web/src/components/PublicPatchNotesExperience.tsx', (
        'title="Ghi chú cập nhật Linh Giới"', 'AnnouncementBoard', 'entries.map(entry =>',
        'id: entry.slug', 'title: entry.title', 'summary: entry.summary', 'body: entry.body',
        'iso: entry.publishedAt', 'publicationDate.format(new Date(entry.publishedAt))', 'timeZone: "UTC"',
        'copy={{ eyebrow: "Nhật ký phát triển", publicationNote: "Không phải ngày phát hành game", disclosureLabel: "Đọc toàn bộ bản ghi" }}',
        'Bản ghi không mở tải build mới hoặc xác nhận phát hành game.', 'Chưa có ghi chú phát hành game',
        '0 bản cập nhật game được xác nhận', 'id="patch-notes-web-archive"', 'Nhật ký kỹ thuật Web',
        'Không phải ảnh bản cập nhật đã phát hành', 'NO_ACCEPTED_BACKEND_CONTRACT',
        '<ArticleFragmentRestoration targetIds={["patch-notes-announcements"]}/>',
        'id="patch-notes-announcements"', 'tabIndex={-1}', 'href: "#patch-notes-announcements"',
        'href="/status"', 'href="/roadmap"', 'href="/download"', 'href="/download/trust"',
        'emptyTitle="Chưa có bản ghi kỹ thuật Web"', 'không cài bản vá'))
    board = require('packages/ui/src/announcement-board.tsx', (
        'export type AnnouncementBoardCopy', 'copy?: AnnouncementBoardCopy', 'copy = defaultCopy',
        'eyebrow: "Thông báo định hướng"', 'publicationNote: "Không phải ngày tổ chức"', 'disclosureLabel: "Đọc toàn bộ thông báo"',
        'data-announcement-id={item.id}', '{item.title}', '{item.summary}', '{item.body}',
        'dateTime={item.publication.iso}', '{item.publication.label}', '{copy.publicationNote}', '{copy.eyebrow}',
        '{`${copy.disclosureLabel} `}', '<details', 'items.length === 0', '{emptyTitle}', '{emptyDescription}'))
    for name, text in (('page', page), ('view', view), ('board', board)):
        for marker in ('lgo-service-compact-proof-page', '"use client"', 'useState(', 'Date.now(', 'localStorage', 'sessionStorage', 'fetch(', 'WebSocket', 'setInterval(', '<form', '<input', '<textarea', '<iframe', '<canvas', 'download=', 'dangerouslySetInnerHTML', 'role="timer"', 'role="progressbar"'):
            if marker in text: ERRORS.append(f'{name}: unrequested update/service behavior {marker}')
    require('packages/ui/src/index.ts', ('AnnouncementBoardCopy', 'AnnouncementBoard'))
    css = require('packages/ui/src/announcement-board.css', ('.lgo-announcement-card', '.lgo-announcement-details > summary:focus-visible', 'min-height:48px', 'forced-colors:active', 'grid-template-columns:1fr'))
    if '-webkit-line-clamp' in css: ERRORS.append('source record truncation')
    tokens = set(re.findall(r'(--lgo-[\w-]+)\s*:', require('packages/design-tokens/src/tokens.css')))
    for token in sorted(set(re.findall(r'var\((--lgo-[\w-]+)', css)) - tokens): ERRORS.append(f'undefined token {token}')
    if 'Patch notes page composes shared service proof/card layout' in require('packages/ui/src/service-layout.css'): ERRORS.append('obsolete patch-only CSS retained')
    require('apps/web/src/components/PublicDesignTargetReference.tsx', ('pathname === "/patch-notes"', 'Bố cục nhật ký phát triển'))
    require('tests/e2e/fe-patch-notes-journal-v1252.spec.ts', (
        'entry.summary', 'entry.body', 'entry.publishedAt', 'patch-notes-web-archive', 'STATIC_BUILD', 'card.width', 'metrics.loaded', 'width:320',
        'toBeGreaterThanOrEqual(14)', 'toBeGreaterThanOrEqual(44)', 'toBeFocused()', 'requests).toEqual([])',
        "keyboard.press('Shift+Tab')", 'forcedColors', 'violations).toEqual([])', 'page.goBack()', 'page.reload()',
        'screenshot', 'two native records expand independently', 'Không phải ngày phát hành game'))
    require('tests/component/announcement-board.test.tsx', ('publication copy is supplied', 'custom editorial copy is escaped', 'patch-note selection uses published/category ownership', 'renderToStaticMarkup', 'empty published selection'))
    require('docs/execution/WEB-NON-CLAIMS.md', ('No production auth', 'No DB persistence', 'No production deployment'))
    print('WEB FE PATCH NOTES JOURNAL v1.252 SOURCE ' + ('FAIL' if ERRORS else 'PASS'))
    for error in ERRORS: print('- ' + error)
    return int(bool(ERRORS))

if __name__ == '__main__': raise SystemExit(main())
