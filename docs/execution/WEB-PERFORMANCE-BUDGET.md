# WEB-PERFORMANCE-BUDGET

Targets:

- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1
- Measure p75 on mobile and desktop.

Budgets:

- initial route JS budget: keep page-level JavaScript minimal and avoid unnecessary client components.
- image budget: no heavy hero image by default; optimize any future image with explicit dimensions and lazy loading where appropriate.
- font loading rules: prefer system font fallback; custom fonts must be subset and non-blocking.
- no heavy animation by default: motion should be token-driven and respectful of performance/accessibility.
- bundle analysis gate: required before production release claim.

Current status: SOURCE_READY_METRICS_UNVERIFIED. No Core Web Vitals PASS is claimed in ChatGPT sandbox.
