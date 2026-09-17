#!/usr/bin/env python3
from pathlib import Path
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []
def fail(message): ERRORS.append(message)
def read(rel):
    path = ROOT / rel
    if not path.is_file(): fail('missing ' + rel); return ''
    return path.read_text(encoding='utf-8')
def require(rel, *needles):
    text = read(rel)
    for needle in needles:
        if needle not in text: fail(f'{rel} missing {needle}')
    return text
def forbid(rel, *needles):
    text = read(rel)
    for needle in needles:
        if needle in text: fail(f'{rel} contains historical marker {needle}')

def main():
    require('apps/web/src/app/journey/page.tsx','@lgo-web/ui/journey-landing-layout.css','PublicJourneyLanding','variant="immersive"')
    require('apps/web/src/components/PublicJourneyLanding.tsx','sampleSessionBeats','worldRouteStops','20 phút không chỉ để đánh quái','lgo-journey-live-cycle','lgo-journey-beat-grid','lgo-journey-route-grid','/game-art/journey-target/hero-city.png')
    forbid('apps/web/src/app/journey/page.tsx','PublicPlayerHero','SessionLoopRail','WorldRouteJourney','lgo-journey-design-board')
    require('packages/ui/src/journey-landing-layout.css','immersive-shell.css','grid-template-columns:repeat(6','grid-template-columns:repeat(5','@media (max-width:700px)','grid-template-columns:1fr','forced-colors','prefers-reduced-motion')
    require('tests/e2e/fe-journey-visual-realignment-v1269.spec.ts','four live journey phases','every canonical session beat','five canonical world-route stops','320px accessibility')
    design = ROOT / 'apps/web/public/design-reference/journey-detailed-design-target-v1123.png'
    manifest = ROOT / 'apps/web/public/game-art/journey-target/provenance.json'
    if not design.is_file() or not manifest.is_file():
        fail('missing journey design/provenance')
    else:
        data = json.loads(manifest.read_text(encoding='utf-8'))
        if data.get('sourceSha256') != hashlib.sha256(design.read_bytes()).hexdigest(): fail('journey target source hash drift')
        hero = data.get('hero', {})
        hero_path = ROOT / 'apps/web/public' / str(hero.get('path','')).lstrip('/')
        if not hero_path.is_file() or hero.get('sha256') != hashlib.sha256(hero_path.read_bytes()).hexdigest(): fail('journey hero art drift')
        if hero.get('bakedUiControls') is not False: fail('journey hero must remain decorative without baked UI controls')
        reused = data.get('reusedWorldArt', [])
        if len(reused) != 5: fail('expected five reused world art records')
        for item in reused:
            art_path = ROOT / 'apps/web/public' / str(item.get('path','')).lstrip('/')
            if not art_path.is_file() or item.get('sha256') != hashlib.sha256(art_path.read_bytes()).hexdigest(): fail('journey reused art drift ' + str(item.get('id')))
    require('docs/superpowers/specs/2026-09-17-public-site-visual-realignment-design.md','/journey','Source-derived artwork crops are allowed only as decorative art with provenance')
    require('docs/superpowers/plans/2026-09-17-public-site-visual-realignment.md','Task 4: `/journey`','20-minute journey timeline/route target')
    require('docs/execution/WEB-PROJECT-STATE.md','WEB-FE-JOURNEY-VISUAL-REALIGNMENT-v1.269 WEB_CLOSED','WEB-FE-START-VISUAL-REALIGNMENT-v1.270')
    require('docs/execution/WEB-NEXT-ACTION.md','Journey v1.269 checkpoint')
    require('docs/execution/WEB-TASK-LEDGER.md','| WEB-FE-JOURNEY-VISUAL-REALIGNMENT-v1.269 | WEB-FE | WEB_CLOSED |')
    require('docs/execution/LGO-WEB-FE-JOURNEY-VISUAL-REALIGNMENT-REPORT-v1.269.md','Focused `/journey`: 12/12 PASS','Fresh production selected regression on port 3236: 86/86 PASS','1b3e9c98fcd43981867f764b89272783a262c013')
    require('docs/execution/HANDOFF-LGO-WEB-FE-JOURNEY-VISUAL-REALIGNMENT-v1.269.md','Next: `/start` visual realignment v1.270')
    if ERRORS:
        print('WEB FE JOURNEY VISUAL REALIGNMENT v1.269 VALIDATION FAIL')
        for error in ERRORS: print('- ' + error)
        return 1
    print('WEB FE JOURNEY VISUAL REALIGNMENT v1.269 VALIDATION PASS')
    return 0

if __name__ == '__main__': raise SystemExit(main())
