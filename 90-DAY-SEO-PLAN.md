# 90-Day SEO Plan — gauraconstruction.lk

**Start:** 3 September 2026 · **Review points:** day 30, day 60, day 90

Technical remediation from the audit is already implemented and verified. This plan covers **deployment, validation, and the content and authority work that on-site fixes cannot deliver**.

Owner labels: **DEV** (developer) · **ENG** (Gaura engineering staff) · **MKT** (marketing/ops) · **MGT** (management, for consent and sign-off)

---

## Weeks 1–2 — Deploy, verify, instrument

The audit changes are only worth what production confirms.

### Week 1

| # | Task | Owner |
|---|---|---|
| 1 | Deploy all changes. Confirm in production: Brotli active (`Content-Encoding: br`), WebP negotiation serving (`Content-Type: image/webp` + `Vary: Accept`), HTML returns `Cache-Control: public, max-age=0, must-revalidate` | DEV |
| 2 | Verify `/service-details` returns a **single** 301 to `/services` (was a 301 into a 404) | DEV |
| 3 | Confirm the 5 repaired service pages load with **0 console errors and 0 failed requests** — sliders, counters and lightboxes working | DEV |
| 4 | Resubmit `sitemap.xml` (74 URLs) in Search Console | MKT |
| 5 | Request reindexing for the pages with substantive changes: `team`, `about`, `faq`, `projects`, `blog`, `testimonials`, `contact`, `services`, and the 4 project pages that gained schema | MKT |
| 6 | Rich Results Test on: one district page (expect `Organization`, **no** `geo`, **no** rating), one project page (`Article` + `BreadcrumbList`), `blog.html` (`Blog` + `ItemList`), `projects.html` (`CollectionPage` + `ItemList`) | DEV |
| 7 | PageSpeed Insights baseline — mobile and desktop — on homepage, one service page, one district page, one blog post. **Record the numbers**; this is the before/after evidence | DEV |
| 8 | Run the `COMPETITOR-GAP-ANALYSIS.md` week-1 validation checklist and replace the **[VERIFY]** hypotheses with measured data | MKT |

### Week 2

| # | Task | Owner |
|---|---|---|
| 9 | Confirm `project-details` and `team-details` have dropped out of the index | MKT |
| 10 | **Claim/complete Google Business Profile for both real offices** (Narammala HQ, Colombo). NAP must match the site exactly. This is the only legitimate route back to star ratings after removing self-serving markup | MGT |
| 11 | Begin requesting Google reviews from named clients already on the testimonials page (Mr. Jayathilaka, Mr. Lahiru Lakmal, AMR Traders) — **never incentivised, never templated** | MGT |
| 12 | Write real bios for the three named engineers: discipline, years of experience, representative projects (`CONTENT-OPPORTUNITIES.md` O6) | ENG |
| 13 | Add `Person` schema for the three engineers on `/team`; reassign guide authorship from *"Editorial Team"* to the appropriate named engineer | DEV |
| 14 | Obtain written client consent for publishing project values, areas and durations (needed for O2) | MGT |

**Task 12 gates a lot.** Original research signed by an unexplained "Editorial Team" is worth far less than the same research signed by a named RICS-accredited quantity surveyor.

---

## Weeks 3–4 — Architecture and thin pages

| # | Task | Owner |
|---|---|---|
| 15 | **Bundle and purge CSS** — 14 render-blocking stylesheets, ~630 KB uncompressed. Consolidate and strip unused Bootstrap/Line Awesome/Animate rules. Regression-test every page template | DEV |
| 16 | Rebuild `/projects` (currently 253 words): per-project type, district, area, scope, duration, value where consented; filters by type and district (O4) | DEV + ENG |
| 17 | Rebuild `/testimonials` (444 words): link each testimonial to its project page; add type, district, date. **Do not add `Review` schema** — first-party reviews are outside Google's snippet policy | DEV |
| 18 | Implement internal linking set **(B)**: project → service + district pages (`INTERNAL-LINKING-PLAN.md`) | DEV |
| 19 | Implement set **(C)**: service → supporting guides | DEV |
| 20 | Link `/construction-job-vacancy-sri-lanka` from `/about` and `/team` (currently 1 inbound link) | DEV |
| 21 | Fix heading hierarchy skips (`h1→h3`, `h2→h4`) sitewide | DEV |

### Strongly recommended: introduce templating

Header, nav and footer are duplicated across 78 files. Every sitewide change in this audit was a scripted find-and-replace, and the fabricated content that shipped to production survived precisely because there was no single place to fix it.

A minimal Eleventy setup (or server-side includes) preserves every URL and removes an entire class of future drift. Best done now, before more pages exist. **Owner: DEV. Estimated 2–3 days.**

---

## Month 2 — Original research and commercial depth

### Weeks 5–6 — The flagship asset

| # | Task | Owner |
|---|---|---|
| 22 | **Publish the Sri Lanka Construction Cost Report 2026** (O1) at `/construction-cost-report-sri-lanka-2026` | ENG + MKT |

Requirements — this is the piece the whole strategy rests on:
- Methodology: how the five tiers were derived
- Sample size and date range
- Material vs labour split
- Per-district variance for districts with delivered work
- **Stated limitation:** rates reflect Gaura's own completed projects, not a national average. Saying so plainly *increases* citability
- Author: Nilitha Bandara Weerasooriya (BSc Hons Surveying Sciences, RICS accredited), with `Person` schema
- `Dataset` schema; tables as real HTML `<table>`, not images
- Visible published and updated dates

| 23 | Link the report from the calculator, every cost-related guide, all 25 district pages and `/services` — it should become the most-linked page on the site | DEV |
| 24 | Add `Dataset` schema and verify in Rich Results Test | DEV |

### Weeks 7–8 — Supporting evidence

| # | Task | Owner |
|---|---|---|
| 25 | Publish *What 10 completed projects actually cost and how long they took* (O2) — consent-gated comparison table | ENG |
| 26 | Publish *Building approvals in Sri Lanka* (O3) with observed authority timelines — genuine operational knowledge, impossible to fake | ENG |
| 27 | Differentiate **Tier 1 districts only** (Colombo, Gampaha, Kurunegala, Rathnapura, Hambantota): real project delivered there, local authority process, district cost variance, site conditions. Implements linking set **(A)** | ENG + DEV |
| 28 | **Leave the other 20 district pages as coverage pages.** Do not manufacture local detail — that is the doorway-page trap | — |

---

## Month 3 — Authority and answer-engine visibility

### Weeks 9–10

| # | Task | Owner |
|---|---|---|
| 29 | Outreach on the cost report to Sri Lankan property, business and construction-trade publications. Pitch the **data**, not the company | MKT |
| 30 | Submit to legitimate Sri Lankan business directories and the CIDA registry. Consistent NAP. **No paid link packages, no PBNs** | MKT |
| 31 | Approach industry associations and the engineers' professional bodies for member listings | MGT |
| 32 | Publish service-line depth pages: steel building cost/span guide (O7), cabana cost for hospitality (O8) | ENG |
| 33 | Continue the review programme; target a credible Google Business Profile review base for both offices | MGT |

### Weeks 11–12

| # | Task | Owner |
|---|---|---|
| 34 | Extend MEP content for Sri Lankan conditions (O9) | ENG |
| 35 | Run the AI-visibility baseline from `GEO-AI-SEARCH-PLAN.md` — query ChatGPT, Gemini, Perplexity and Google AI Overviews with the 15 tracked questions; record whether the site is cited | MKT |
| 36 | Refresh `llms.txt` with the report and any new reference pages | DEV |
| 37 | Update `dateModified` on materially revised pages (**only where genuinely revised** — never as a freshness trick) | DEV |
| 38 | Day-90 review against the metrics below | MKT + MGT |

---

## Continuous (weekly, from week 1)

| Cadence | Activity |
|---|---|
| Weekly | Search Console: coverage errors, new 404s, manual actions |
| Weekly | Core Web Vitals field data as it accumulates |
| Weekly | Position tracking on the 15 target queries |
| Fortnightly | Broken-link and missing-asset scan (regression check on the audit fixes) |
| Fortnightly | Structured-data validation after any template change |
| Monthly | AI-visibility check across the four answer engines |
| Monthly | Referring-domain growth |
| Monthly | Conversion tracking: calculator completions, form submissions, calls, WhatsApp |

---

## Success metrics

Baselines must be captured in **week 1** — several are not currently instrumented.

| Metric | Baseline | Day 30 | Day 60 | Day 90 |
|---|---|---|---|---|
| Indexed pages | 74 submitted | 74 valid | 74 | 75+ |
| Coverage errors | capture wk 1 | 0 | 0 | 0 |
| Mobile PSI (homepage) | capture wk 1 | +10–15 | +20–30 | +25–35 |
| CLS | capture wk 1 | improving | good | good |
| Organic clicks | capture wk 1 | flat/+ | +10–20% | +25–40% |
| Cost-query impressions | capture wk 1 | + | +30% | +60% |
| Referring domains | capture wk 1 | flat | +3–5 | +8–15 |
| GBP reviews (both offices) | 0 | 5+ | 15+ | 25+ |
| AI citations (15 queries) | capture wk 11 | — | — | measurable |
| Calculator completions | capture wk 1 | +10% | +20% | +35% |

**Expectation setting.** The technical and trust fixes remove suppression; they do not by themselves create rankings. Removing fabricated staff, correcting 23 misleading `LocalBusiness` entities and dropping self-serving ratings protects the site from downside more than it drives immediate upside. **Ranking gains should be expected from the month-2 research and the month-3 authority work.** Days 1–30 are about deployment integrity and baselines, not traffic.

---

## Explicitly excluded

| Excluded | Reason |
|---|---|
| Reinstating `aggregateRating` or adding `Review` for on-site testimonials | Against Google's review-snippet policy for first-party reviews |
| Sub-district / suburb pages | Doorway pages; 25 district pages is already the defensible limit |
| Paid link building, PBNs, directory packages | Real risk, no benefit |
| High-volume AI-generated posting | The market is saturated with generic advice; the gap is evidence |
| Publishing project values without client consent | Several projects are commercial and confidential |
| `dateModified` bumps without real revision | Freshness manipulation |
| Manufacturing local content for the 20 districts without projects | The exact trap this plan is designed to avoid |
