# Flat Creek Common Stack

> Canonical stack standard for every Flat Creek project. The identical document lives in each repo; only the **This repo** section below differs. To change the standard, change it in every repo in the same pass.

## This repo: meteor-base (starter template)

**Archetype A starter — stale.** Frozen since ~2021 (Meteor 2.14 / Node 14 / Bootstrap / styled-components) and no longer represents how we build; ContactDrive core has evolved two generations past it. Disposition (follow-up project, not this pass): **refresh into a Meteor 3 + Node 22 + Tailwind + service-layer starter** extracted from core's patterns, or archive this repo in favor of patriotlibrary as the default new-project reference.

---

## Why this exists

Seven semi-active projects, each with a slightly different stack, made maintenance and context switching expensive. A July 2026 survey of the fleet found the real cost was not framework choice but tooling drift: ESLint 7→10 across four config styles, Prettier 2.8→3.3 (or missing entirely), Node 14 (EOL) alongside Node 22, three CI regimes (GitHub Actions / CircleCI / none), five deploy targets, and a starter template (meteor-base) frozen in 2021 while the flagship (ContactDrive core) evolved two generations past it. This standard fixes the drift and blesses two application archetypes so a new project never starts from a blank stack decision.

## The two archetypes

Every new project is Archetype A or Archetype B. Deviations require a written justification in that repo's STACK.md.

### Archetype A — Data-rich SaaS & B2B admin panels

TypeScript strict (ESM) · Fastify API · PostgreSQL (+ pgvector when AI/search is involved) · Prisma · BullMQ workers on Redis · Next.js + Tailwind admin · Railway.

Reference implementation: **patriotlibrary**. Its monorepo layout (`apps/api` + `apps/admin` + `packages/{db,shared,queue}`), idempotent BullMQ job pipeline, API-as-sole-database-gateway rule, and per-product MCP server are the starting point for new data-rich builds.

**Realtime variant:** when the defining need is realtime collaboration / live pub-sub with logged-in users, use Meteor 3 + React + Tailwind + MongoDB with a service-layer architecture. Reference: **ContactDrive core** (the `imports/api/<domain>/service.js` gate discipline, the SDK boundary for modular apps, the worker fleet). ContactDrive stays on this stack permanently — it is the mature realtime variant of Archetype A, not migration debt.

### Archetype B — Frontend-focused projects (websites)

Static-first, deployed to Cloudflare Pages.

- **Content/marketing sites: use SiteCenter** (Payload 3 + Astro, one Cloudflare Pages project per tenant). Building or hosting a client/marketing site is never a per-site stack decision again — it is a SiteCenter tenant.
- **App-like interactive sites:** Vite + React + Tailwind static frontend + a thin Archetype-A-style API behind a Pages Function proxy. Reference: **patriotvotes**.

### Decided questions (do not relitigate per project)

- **Node, not Python/Go.** The whole fleet is Node and the maintainer reads JavaScript. Other runtimes only for workloads Node is genuinely bad at, with written justification.
- **React everywhere** on the client. No Svelte/Vue experiments in production repos.
- **Tailwind for all new UI.** Bootstrap remains only in the legacy Meteor trio until their upgrade windows.
- **Mongo vs Postgres is decided per-archetype, not per-taste:** MongoDB with Meteor, PostgreSQL everywhere else.
- **SiteCenter keeps Payload + Astro.** Payload is load-bearing — it provides the admin panel, multi-tenancy, role/field-level access control, drafts/versioning/scheduled publish, and the deploy hooks. The product's core value is static sites on a CDN that stay up when the CMS is down, which a long-running Meteor server cannot produce. Supabase there is plain Postgres hosting, nothing more, and is not an architectural commitment.

## Shared tooling layer (every repo, both archetypes)

| Concern | Standard |
| --- | --- |
| Node | 22 LTS. `engines` in package.json + `.nvmrc` in every repo. (Meteor repos: the Meteor release pins Node; Meteor 3.x = Node 22.) |
| Package manager | npm. pnpm allowed for monorepos (sitecenter stays on pnpm). |
| Language | TypeScript strict, ESM, for new projects. Existing JS repos stay JS — no churn migrations. |
| Lint | ESLint 9+, flat config (`eslint.config.*`). |
| Format | Prettier 3, `npx prettier --write` on touched files before every PR. |
| CI | GitHub Actions: typecheck + lint + test on every PR. CircleCI is retired. |
| Hosting | Railway (APIs/workers), Cloudflare Pages (static sites + media via R2/Images), Meteor Galaxy (Meteor apps). |
| Errors | Sentry. |
| AI | Anthropic Claude via official SDKs; every product exposes an MCP server for agent access. |
| Agent instructions | AGENTS.md as the canonical instruction file + a CLAUDE.md pointer, following the core/sitecenter pattern. |
| Branches | `develop` (default) + `main`, protected by the two rulesets below. See "Default branches & protection rules". |
| Stack doc | This STACK.md, replicated to every repo; only the "This repo" section differs. Change the standard everywhere at once. |

## Default branches & protection rules

Every repo has exactly two long-lived branches:

- **`develop`** — the default branch. All feature/agent branches come off it and all day-to-day PRs target it.
- **`main`** — the release branch. It only receives release PRs from `develop`; nothing merges to `main` directly.

Both are protected by a GitHub ruleset with identical rules:

**Ruleset "Restrict develop branch"** (targets `develop`) and **ruleset "Restrict main branch"** (targets `main`):

- Restrict deletions
- Require a pull request before merging (0 required approvals)
- Require status checks to pass
- Block force pushes

Zero required approvals is deliberate: the PR is the human review gate for agent-driven work, but a solo maintainer must be able to merge without a second reviewer. The status-check rule is what actually blocks a broken merge.

Recommended additions (not yet mandated):

- **Require conversation resolution before merging** — review threads, including automated review comments, must be resolved or explicitly accepted before merge.
- **Keep the ruleset bypass list empty** (no admin bypass). For a genuine emergency, temporarily disable the ruleset instead — that makes the bypass deliberate and visible in the audit log.
- Note: "Require status checks to pass" only takes effect once a named GitHub Actions check exists and is added to the ruleset. Repos without CI yet (patriotlibrary, patriotvotes) should add their check names to the rulesets when their CI lands — already a migration item in the conformance table.

## New-project checklist

1. Pick Archetype A or B; record the choice (and any deviation, with why) in the new repo's STACK.md.
2. Clone the reference repo's layout — patriotlibrary for A, SiteCenter tenant or the patriotvotes pattern for B.
3. Day one: create `develop` + `main`, set `develop` as the default branch, and apply the "Restrict develop branch" / "Restrict main branch" rulesets.
4. Day one: Node 22 `engines` + `.nvmrc`, ESLint 9 flat config, Prettier 3, GitHub Actions CI.
5. Day one: AGENTS.md + CLAUDE.md pointer.
6. Compose with the fleet before building anew: email/SMS → ContactDrive; web publishing → SiteCenter API/MCP; canonical content, voice, and search → Patriot Library MCP.

## Fleet conformance (July 2026 survey)

| Repo | Archetype | Status / migration items |
| --- | --- | --- |
| core (ContactDrive) | A — realtime Meteor variant | Conformant; the reference for Meteor service-layer patterns. No changes planned. |
| patriotlibrary | A — reference implementation | Add GitHub Actions CI (typecheck/lint/test); currently no CI. |
| sitecenter | B — the content-site product itself | Conformant. Keep Payload + Astro. |
| patriotvotes | B — interactive-site pattern | Tooling gaps: plain JS, no tests, no CI, no Prettier. Add Prettier + `engines`/`.nvmrc` + GitHub Actions. TypeScript/Fastify is the eventual direction for its API — not a rewrite now. |
| lpr-retreat | A — legacy Meteor | Meteor 2.14 / Node 14 (EOL). Upgrade to Meteor 3 + Node 22 at the next annual maintenance window. |
| lpr-plugin | A — legacy Meteor | Same upgrade window. During it: simplify the GraphQL/Apollo layer toward Meteor methods or REST, and retire the k8s/mup deploy in favor of Galaxy. |
| meteor-base | A starter (stale) | Frozen since ~2021; no longer represents how we build. Follow-up project: refresh into a Meteor 3 + Node 22 + Tailwind + service-layer starter extracted from core, or archive it in favor of the Archetype A reference. |

## Worked example — the Content Engine

The next build searches/aggregates news trends, generates content, and publishes across web, social media, and email. Under this standard it is a composition, not a fourth bespoke system:

- **Core:** a new Archetype A service — Fastify + Postgres/pgvector + BullMQ pipeline (ingest trends → classify/embed → generate → schedule/publish). Structurally this is patriotlibrary's ingest/classify/embed pipeline pointed at external sources plus a generation stage; Patriot Library also serves as the canon/voice source via its existing MCP.
- **Web publishing:** through SiteCenter's existing API/MCP layer (prompt-to-page/post tools, drafts-only AI guardrail, deploy automation). No second web publisher gets built.
- **Email/SMS:** through ContactDrive, which owns all email/SMS — the delegation pattern patriotvotes already established with its crm-sync worker and retry queue.
- **Social:** new connectors inside the Content Engine — the only genuinely new integration surface.

Three existing systems become infrastructure for the fourth. That is the payoff this standard exists to protect.
