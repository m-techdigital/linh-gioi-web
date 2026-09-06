# Local Setup — WEB-00

WEB-00 intentionally does not require npm install.

Use these commands on your machine after downloading the full-source ZIP:

```bash
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip /path/to/LGO-WEB-00-program-constitution-v1.0-full-source.zip
git init
git add .
git commit -m "docs: establish LGO web program control tower"
```

Run the constitution validator:

```bash
python3 -m py_compile tools/validate_web_program_constitution.py
python3 tools/validate_web_program_constitution.py
```

## Future note

WEB-01 will scaffold pnpm/Turborepo/Next.js.
WEB-00 intentionally does not require npm install.


## WEB-01 local setup

After downloading WEB-01 full source ZIP:

```bash
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip /path/to/LGO-WEB-01-monorepo-foundation-v1.0-full-source.zip
python3 tools/validate_web_program_constitution.py
python3 tools/validate_web_monorepo_foundation.py
corepack enable
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm validate
git init
git add .
git diff --check --cached
git status --short --untracked-files=all
git commit -m "chore: scaffold LGO web monorepo foundation"
```

Use Node.js 24 LTS target with pnpm. WEB-01 does not require backend integration and does not create production auth, DB persistence, CMS or deployment.
