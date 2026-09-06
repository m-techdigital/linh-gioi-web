# WEB-HANDOFF-CONTRACT

Every Web Program task handoff must include:

- Task ID.
- Phase.
- Status.
- Input artifact and SHA256.
- Source baseline.
- Changed files.
- Deleted files.
- Contracts consumed.
- Contract changes requested.
- Commands executed.
- Source verification.
- Runtime verification.
- Visual evidence.
- Accessibility/security/performance gates where applicable.
- Known limitations.
- Output artifacts.
- SHA256.
- Next allowed task.
- Forbidden next task.
- Explicit non-claims.

## Handoff status tokens

```text
WEB_HANDOFF_DONE
WEB_FIX_REQUIRED
WEB_BLOCKED_EXTERNAL_CONTRACT
```

## Packaging rule

ZIP outputs must be repo-relative, no parent wrapper, and free of build/cache/generated/toolchain/local secret artifacts unless explicitly owned by the task.
