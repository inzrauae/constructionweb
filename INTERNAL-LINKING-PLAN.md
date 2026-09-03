# Internal Linking Plan — gauraconstruction.lk

**Date:** 3 September 2026

---

## Starting state

Measured before changes (inbound internal links, excluding sitewide nav and footer):

| Page group | Inbound links | Problem |
|---|---|---|
| Blog posts (17) | 2–4 each | No related-article modules anywhere; posts were near-orphans |
| `team` | 1 | Effectively orphaned |
| `construction-job-vacancy-sri-lanka` | 1 | Effectively orphaned |
| `project-details` (stub) | 1 | Consuming equity for a placeholder page |
| Project pages | 4–6 | Under-linked given they are the site's best evidence |
| District pages | High | Well linked via `html-sitemap` |

Two structural problems compounded this:

1. **`about.html` and `faq.html` wasted their link modules on fabricated content** — three fake articles and a fake sidebar, all pointing at `blog-details` (nonexistent) or `#`. Two of the site's most authoritative pages passed equity nowhere.
2. **The site's own real engineers linked to a fabricated profile page** (`team-details.html`, "Graham Thomas").

---

## Implemented

### 1. Related-guides clusters across all 17 blog posts

Each post received four topically-related posts plus one matching service or tool page. Clusters were hand-mapped, not generated round-robin.

| Cluster | Posts |
|---|---|
| **Cost & finance** | house-construction-cost, construction-loan-guide, construction-contract-guide |
| **Planning & process** | house-construction-timeline, soil-test-land-survey, common-construction-mistakes, construction-quality-checklist, architect-vs-design-build |
| **Choosing a builder** | best-construction-company-in-sri-lanka, signs-best-construction-company, best-construction-company-kurunegala |
| **Materials & methods** | steel-vs-concrete, green-sustainable-building, mep-services-explained, civil-construction-vs-renovation |
| **Design & spaces** | interior-design-trends-2026, what-is-a-cabana |

Sample of implemented links:

| Source | Target | Anchor | Reason |
|---|---|---|---|
| `blog-house-construction-cost-sri-lanka` | `blog-construction-loan-guide-sri-lanka` | How construction loans work in Sri Lanka | Natural next question after budgeting |
| `blog-house-construction-cost-sri-lanka` | `/construction-cost-calculator` | Estimate your build with the construction cost calculator | Informational → tool conversion |
| `blog-house-construction-timeline-sri-lanka` | `blog-soil-test-land-survey-sri-lanka` | Why a soil test and land survey matter before you build | Soil testing is the first timeline stage |
| `blog-steel-vs-concrete-construction-sri-lanka` | `/steel-building-construction-sri-lanka` | Steel building construction services | Comparison → matching service |
| `blog-mep-services-explained-sri-lanka` | `/mep-services-sri-lanka` | Our MEP services in Sri Lanka | Explainer → matching service |
| `blog-what-is-a-cabana` | `/cabana-construction-sri-lanka` | Cabana construction and design services | Definition → matching service |
| `blog-signs-best-construction-company-sri-lanka` | `/about` | About Gaura Construction and our team | Trust query → trust page |

**Result: inbound links per blog post 2–4 → 3–17.** `blog-house-construction-cost-sri-lanka` correctly became the most-linked post — it is the commercial centre of gravity for cost queries.

### 2. FAQ sidebar rebuilt — 18 real links replacing fake modules

Replaced a dead search box, fake categories with fake counts, three fake articles and eight `#` tags with:
- 7 service page links
- 6 popular guide links
- Cost calculator CTA
- Real contact routes (phone, email, contact page, projects)

### 3. About page blog module — 3 fabricated cards → 3 real guides

Now links `blog-house-construction-cost-sri-lanka`, `blog-house-construction-timeline-sri-lanka`, `blog-common-construction-mistakes-sri-lanka` with real dates and images.

### 4. Equity redirected away from placeholder pages

`project-details` and `team-details` set to `noindex, follow` and removed from both sitemaps. Real engineers' names on the homepage, About and Kurunegala pages are now plain text rather than links to a fabricated profile.

### 5. HTML sitemap labels made descriptive

*"Project Almas"* → *"Luxury Apartment Interior Renovation, Colombo 15"*, and similarly for Kadawatha, Rathnapura and Waththala. The anchor now describes the destination.

---

## Next priority links (not yet implemented)

These need content changes rather than link insertion alone.

### A. District pages → matching project pages
The strongest available differentiator. Five districts have real delivered work:

| District page | Should link to | Suggested anchor |
|---|---|---|
| `best-construction-company-colombo` | `project-almas`, `project-bambalapitiya` | Luxury apartment interior renovation we completed in Colombo 15 |
| `best-construction-company-gampaha` | `project-kadawatha`, `project-waththala` | Two-storey luxury residence we built in Kadawatha |
| `best-construction-company-ratnapura` | `project-rathnapura` | Interior renovation and modern pantry we completed in Rathnapura |
| `best-construction-company-kurunegala` | `project-mahawa` | Trade centre we built for Nipuna Stores in Mahawa |
| `best-construction-company-hambantota` | `project-tangalla` | Two-storey residence we built in Tangalla |

**Reason:** converts templated coverage pages into pages with local proof, and pushes equity into the best evidence on the site.

### B. Project pages → service and district pages
Each project page should link to its service line and its district page. Currently they link mostly to `/projects` and `/contact`.

| Project | Service link | District link |
|---|---|---|
| `project-ambatale` | `/steel-building-construction-sri-lanka` | `/best-construction-company-colombo` |
| `project-trinity`, `project-almas` | `/interior-design-sri-lanka` | Colombo |
| `project-kadawatha`, `project-bambalapitiya`, `project-tangalla` | `/house-construction-sri-lanka` | Gampaha / Colombo / Hambantota |
| `project-waththala`, `project-rathnapura` | `/renovations-sri-lanka` | Gampaha / Ratnapura |
| `project-embilipitiya`, `project-mahawa` | `/civil-constructions-sri-lanka` | Ratnapura / Kurunegala |

### C. Service pages → supporting guides
Each service page should link to the two or three guides that answer its pre-purchase questions — e.g. `/house-construction-sri-lanka` → cost, timeline and quality-checklist guides. Currently sparse.

### D. Rescue `construction-job-vacancy-sri-lanka` (1 inbound link)
Link from `/about` and `/team` with anchor *"Current construction job vacancies"*. Careers pages attract branded and recruitment search; one inbound link is not enough for reliable discovery.

### E. Cost report hub (once `CONTENT-OPPORTUNITIES.md` O1 ships)
The Sri Lanka Construction Cost Report should become the most-linked page on the site: from the calculator, every cost-related guide, all 25 district pages and `/services`. It is the intended citation target for answer engines.

---

## Anchor text policy

**Do:**
- Describe the destination in natural language — *"How construction loans work in Sri Lanka"*
- Vary phrasing between sources
- Use partial-match where it reads naturally

**Do not:**
- *"Click here"*, *"Read more"* as the only anchor
- Repeat exact-match commercial anchors (*"best construction company Sri Lanka"*) at scale — the pattern that most reliably looks manipulative
- Link the same phrase to different destinations across the site
- Exceed roughly 100 links per page

The implemented related-guides blocks follow this: every anchor is a descriptive sentence fragment, and no commercial exact-match anchor is repeated across posts.

---

## Current link graph shape

```
                        Homepage
                           |
        +------------------+------------------+
        |                  |                  |
    /services          /projects            /blog
        |                  |                  |
   7 service pages    10 project pages    17 guides
        |                  |                  |
        +---- (C) ---------+---- (B) ---------+
                           |
                    25 district pages
                           |
                     (A) -- needs project links
```

Implemented: guide ↔ guide, guide → service/tool, FAQ → services + guides, About → guides.
Outstanding: **(A)** district → project, **(B)** project → service/district, **(C)** service → guide.

(A) is the highest-value remaining work: it is the only change that gives the 25 district pages something no competitor can copy.
