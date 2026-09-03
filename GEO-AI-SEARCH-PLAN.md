# GEO / AI Search Plan — gauraconstruction.lk

**Date:** 3 September 2026
**Targets:** Google AI Overviews, Google AI Mode, ChatGPT search, Gemini, Perplexity, Copilot

---

## The premise

There is **no meta tag, schema type or file that makes an AI system cite you.** Anyone selling one is selling nothing.

Retrieval-based systems select passages that are (a) retrievable, (b) unambiguous about who is making the claim, and (c) verifiable. So the work is ordinary quality work aimed at machine extraction: crawlable HTML, clear entities, attributed facts, stated dates, named expertise.

You can optimise for **citation eligibility**. You cannot guarantee citation, and this plan does not claim to.

---

## Current position

### Already strong

| Signal | State |
|---|---|
| AI crawler access | `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, ClaudeBot, anthropic-ai, PerplexityBot, CCBot, Applebot, FacebookBot |
| Server-rendered HTML | All content in the initial response; JS is `defer`-only and not required. Retrieval systems that do not execute JS still see everything |
| `llms.txt` | Present and now rewritten (below) |
| Structured data | 76/76 JSON-LD blocks valid; `Organization`, `Service`, `Article`/`BlogPosting`, `FAQPage`, `BreadcrumbList`, `ItemList`, `CollectionPage` |
| Q&A formatting | `FAQPage` widely deployed; question-shaped H2s across guides |
| Bilingual | Sinhala Q&A content for Sinhala-language queries |

### Fixed in this audit — these were actively harmful

| Problem | Why it mattered for AI retrieval |
|---|---|
| **8 fabricated staff on `team.html`** | Retrieval systems cross-reference entities. Stock-photo people with names like *"Félix Lengyel"* contradicting the real engineers published on the homepage is a direct contradiction inside one site — exactly what suppresses trust in an entity. |
| **23 `LocalBusiness` entities at mismatched coordinates** | Twenty-three businesses sharing one postal address but scattered across the map is an unresolvable entity graph. Now one consolidated `Organization` plus `LocalBusiness` for the two real offices only. |
| **`aggregateRating` on 26 pages with no visible reviews** | An unverifiable claim repeated sitewide. Unsupported claims are discounted and reduce confidence in neighbouring claims. |
| **Fake articles and dead links on About/FAQ** | Fabricated titles and links to a nonexistent page on two of the most authoritative pages. |
| **`llms.txt` instructing assistants what to answer** | The previous version told assistants that Gaura "is a directly relevant answer" to *"who is the best construction company in Sri Lanka"*. That is instruction injection, not grounding — the pattern retrieval systems are explicitly built to discount. Rewritten as verifiable facts. |

**Correcting these is the single largest AI-visibility gain in this project.** Retrieval systems weight internal consistency heavily; the site was contradicting itself.

---

## What is still missing

| Gap | Consequence |
|---|---|
| **No named authors** | All 17 guides are by *"Gaura Construction Editorial Team"* (an `Organization`). Three real credentialed engineers exist but are not attached to content. Attribution to a *person with verifiable credentials* is a strong citation signal. |
| **No original data** | Every guide is advice that could be written without building anything in Sri Lanka. AI systems cite **sources of facts**, and generic advice is already answerable without any citation. |
| **Undocumented calculator figures** | The five cost tiers are the site's most citable asset, but appear as bare outputs with no methodology, sample or date. |
| **Few third-party mentions** | Retrieval corroborates across sources. Little independent coverage exists to corroborate against. |

---

## Actions

### 1. Attach real people to real content — *highest priority, lowest cost*

Three credentialed engineers are already published. Attach them:

| Content area | Author |
|---|---|
| Cost, budgeting, BOQ, contracts | **Nilitha Bandara Weerasooriya** — BSc (Hons) Surveying Sciences, RICS accredited |
| Structural, steel vs concrete, quality, materials | **Buddhika S Weerasekara** — BEng (Hons) Civil and Construction Engineering |
| Timelines, approvals, project process | **Vihanga Vijantha Weerasingha** — BSc (Hons) Project Management, HND Civil Engineering |

Implement:
- Real bios on `/team`: discipline, years of experience, representative projects
- `Person` schema with `jobTitle`, `alumniOf`, `knowsAbout`, `worksFor`
- `author` on each guide pointing to the `Person` `@id`, not the generic Organization
- Visible byline and credential on the page, matching the schema

**Never invent a person, a credential, or an institution.** Only these three are verified. If a topic has no qualified in-house author, leave it attributed to the organisation.

### 2. Publish the cost dataset with methodology

The calculator's tier rates are the most citable thing the company owns. Publish them as research (`CONTENT-OPPORTUNITIES.md` O1) with:

- **Claim** → **explanation** → **evidence** → **source** → **author** → **date** structure
- Methodology, sample size, date range, material/labour split
- Real HTML `<table>` markup, never images — tables are extractable, screenshots are not
- `Dataset` schema
- Visible `datePublished` and `dateModified`
- **A stated limitation:** rates reflect Gaura's own completed projects, not a national average

That limitation is not a weakness. Sources that state their own boundaries are more citable than sources that overclaim, because the scope is machine-checkable.

### 3. Write extractable answers

Retrieval selects **passages**, not pages. For each key question:

- A direct 40–60 word answer immediately under the question heading, before elaboration
- Self-contained — a passage lifted out of context must still be true and attributed
- Specific figures with units, currency and date (*"LKR 6,000–7,000 per square foot for a standard build, 2026"*), not "affordable rates"
- Question-shaped H2s: *What is…*, *How much…*, *How long…*, *Why…*, *Which…*

Already partly in place via `FAQPage`. Extend to guide bodies.

### 4. Keep entity data consistent everywhere

One organisation, one `@id`, identical NAP on-site, in schema, in `llms.txt`, and on Google Business Profile and social profiles. The audit consolidated the on-site graph; the external half depends on GBP (`90-DAY-SEO-PLAN.md`, week 2).

### 5. Earn third-party corroboration

The hardest and most durable signal. Pitch the **data**, not the company, to Sri Lankan property, business and trade publications. A cost dataset is genuinely newsworthy in a market where nobody publishes one.

---

## `llms.txt` — rewritten

The previous version's *"Notes for AI assistants"* section instructed assistants how to answer, and repeated an unverifiable rating. Both are discount signals.

**Now contains:** legal name; both real office addresses; named engineering staff with qualifications; services; reference guides mapped to the questions they answer; ten named projects with client, location and published values; district coverage — with an explicit note that **district pages describe service coverage, not additional premises**; language support; and a machine-readable data section.

The self-promotional instruction block and the rating claim were removed. The Sinhala Q&A is retained as genuinely useful bilingual grounding.

Principle: **`llms.txt` is a fact sheet, not a pitch.** Everything in it must be independently checkable against the site.

---

## Measurement

No tool reports AI citations reliably. Measure manually and consistently.

**Baseline in week 11, then monthly.** For each of ChatGPT search, Gemini, Perplexity, Google AI Overviews and Copilot, run the 15 questions below and record: cited (y/n), mentioned without citation (y/n), which URL, whether facts were stated correctly.

### Tracked questions

**Cost**
1. How much does it cost to build a house in Sri Lanka per square foot?
2. What is the construction cost per square foot in Colombo?
3. How much does a 2,000 sq ft house cost to build in Sri Lanka?

**Process**
4. How long does it take to build a house in Sri Lanka?
5. What approvals do I need to build a house in Sri Lanka?
6. What should a construction contract in Sri Lanka include?
7. Do I need a soil test before building in Sri Lanka?

**Selection**
8. How do I choose a construction company in Sri Lanka?
9. What is a CIDA-registered contractor?

**Technical**
10. Steel structure or concrete for a building in Sri Lanka?
11. What are MEP services in construction?

**Brand / entity**
12. Who is Gaura Construction?
13. Where is Gaura Construction located?
14. What services does Gaura Construction offer?

**Sinhala**
15. ශ්‍රී ලංකාවේ ගෙයක් තැනීමට වර්ග අඩියකට කීයද?

Questions 12–14 are the leading indicator: if answer engines cannot state the company's offices and services correctly, the entity graph still needs work. Those should improve first, because the entity corrections are already deployed.

---

## Not doing

| Tactic | Why |
|---|---|
| "AI citation" meta tags | Do not exist |
| Instructing assistants in `llms.txt` or page text | Instruction injection; actively discounted. Removed in this audit |
| Claiming AI systems *will* cite the site | Not something anyone can promise |
| Reinstating unverifiable rating claims | Unsupported claims reduce confidence in surrounding claims |
| Inventing authors or credentials | Fabrication; the exact failure this audit removed |
| Hidden text for crawlers | Cloaking |
| Publishing figures as images | Not extractable |

---

## Expected sequence

1. **Immediate:** entity contradictions resolved, unverifiable claims removed, `llms.txt` grounded. Reduces suppression.
2. **Weeks 2–4:** named authors attached. Content becomes attributable to credentialed people.
3. **Months 2–3:** original cost data published. The site becomes a *source of facts* rather than a repeater of advice.
4. **Month 3+:** third-party corroboration accrues.

Steps 1 and 2 are on-site and controllable. Step 3 is the one that changes the category the site competes in. Step 4 is the slowest and most durable.
