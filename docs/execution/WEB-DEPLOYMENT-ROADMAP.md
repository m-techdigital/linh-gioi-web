# WEB-DEPLOYMENT-ROADMAP

## Domain mapping

```text
linhgioi.vn -> apps/web
account.linhgioi.vn -> apps/portal
ops.linhgioi.vn -> apps/ops
api.linhgioi.vn -> Java backend in game repo
```

## Environments

```text
local
dev
staging
production
```

## Release sequencing

Public web can release earlier.
Portal waits for Auth/DB contract.
Ops production waits for RBAC/audit/security.

## Deployment non-claims

WEB-00 does not deploy anything. WEB-01 does not deploy anything unless a later owner-approved task explicitly adds deployment work.

## Environment responsibilities

- `local`: development only.
- `dev`: shared integration validation.
- `staging`: release candidate, security/performance/rollback rehearsal.
- `production`: only after owner-approved readiness checklist passes.
