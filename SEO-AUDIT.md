# SEO Audit — gauraconstruction.lk

**Audited:** 3 September 2026
**Scope:** 78 HTML pages, `.htaccess`, `web.config`, `robots.txt`, `sitemap.xml`, `llms.txt`, CSS/JS assets, 619 images
**Stack:** Static HTML site (no framework, no build step, no database). Apache (cPanel, `.htaccess`) with an IIS `web.config` mirror. Deployed by rsync to `public_html` via `.cpanel.yml`.

---

## Architecture summary

| Aspect | Finding |
|---|---|
| Framework | None — hand-maintained static HTML |
| Routing | Apache rewrites: extensionless URLs, `.html` → extensionless 301 |
| Templating | None — every page carries a duplicated copy of header, nav and footer |
| Existing SEO | Strong baseline: canonicals on 78/78, unique titles/descriptions, JSON-LD on most pages, AI-crawler-friendly `robots.txt`, `llms.txt`, HTML sitemap |
| Rendering | Fully server-rendered HTML; JS is `defer`-only and not required for content |

The site was **already well maintained**. Most findings below are defects introduced by an unmodified purchased template (placeholder people, fake articles, wrong-industry copy) plus performance and structured-data accuracy problems, rather than absent SEO work.

**The single biggest structural liability is the absence of templating.** Header, nav and footer are copy-pasted into 78 files, so every sitewide change is a scripted find-and-replace. See *Remaining issues* for the recommended fix.

---

## Severity key

| | Meaning |
|---|---|
| **CRITICAL** | Actively breaking crawling, rendering or trust. Fix immediately. |
| **HIGH** | Materially suppressing rankings, Core Web Vitals or eligibility. |
| **MEDIUM** | Real but bounded impact. |
| **LOW** | Polish; do when convenient. |

---

## CRITICAL

### C1. Nine JavaScript files 404 on five pages — ✅ FIXED
**Where:** `civil-constructions-sri-lanka.html`, `renovations-sri-lanka.html`, `interior-design-sri-lanka.html`, `mep-services-sri-lanka.html`, `construction-job-vacancy-sri-lanka.html`
**Issue:** These pages referenced `assets/js/jquery-3.6.0.min.js`, `bootstrap.min.js`, `waypoints.min.js`, `odometer.min.js`, `swiper.min.js`, `venobox.min.js`, `nice-select.min.js`, `wow.min.js` and `countdown.js`. None exist at those paths — the real files live in `assets/js/vendor/`.
**Why it matters:** 45 failed requests across five commercial service pages. Sliders, counters, lightboxes, animations and the mobile nave were all dead — a broken page is a ranking and conversion problem, and failed subresources waste crawl budget.
**Fix applied:** Repointed all eight surviving libraries to `assets/js/vendor/` (including the real filename `jquary-3.6.0.min.js`, which is misspelled on disk). Dropped `countdown.js`, which has no vendor equivalent and is unused elsewhere.

### C2. `service-details` 301-redirected to a page that does not exist — ✅ FIXED
**Where:** `.htaccess:33`, `web.config` rule *Redirect service-details to services-details*
**Issue:** Both configs redirected `/service-details` → `/services-details`. There is no `services-details.html`. The redirect terminated in a 404.
**Why it matters:** A permanent redirect into a 404 destroys any equity on the legacy URL and reports as a soft-404 crawl error.
**Fix applied:** Both configs now redirect to `/services`.

### C3. All 619 images lacked `width`/`height` — ✅ FIXED
**Issue:** Not one `<img>` on the site declared intrinsic dimensions.
**Why it matters:** Without them the browser cannot reserve space before the image loads, so every image pushes content down as it arrives. This is the primary driver of **Cumulative Layout Shift**, a Core Web Vitals ranking factor.
**Fix applied:** Read true pixel dimensions from every file on disk and injected `width`/`height` into all 619 tags. Also added `loading="lazy"` to 344 below-the-fold images and `decoding="async"` throughout, while leaving the logo and hero images eager.

### C4. No compression configured — ✅ FIXED
**Issue:** `.htaccess` set cache headers but never enabled `mod_deflate` or `mod_brotli`. HTML, CSS and JS were served uncompressed — roughly **630 KB of render-blocking CSS alone**, per page.
**Fix applied:** Added Brotli (preferred) and gzip output filters for HTML, CSS, JS, JSON, XML, JSON-LD and SVG, with `Vary: Accept-Encoding`.

### C5. `Cache-Control: no-store` on every HTML page — ✅ FIXED
**Where:** `.htaccess`
**Issue:** HTML was served `no-cache, no-store, must-revalidate` plus `Pragma: no-cache` and `Expires: 0`. `no-store` forbids storing the response *at all* — no conditional requests, no 304s, no CDN or proxy caching.
**Why it matters:** Every navigation and every crawler hit re-downloaded the full page. Directly inflates TTFB and repeat-view load time.
**Fix applied:** Changed to `public, max-age=0, must-revalidate` and unset the legacy `Pragma`/`Expires` headers. Content stays as fresh as before, but revalidation can now return a 304.

---

## HIGH

### H1. 23 district pages declared a `LocalBusiness` at the wrong coordinates — ✅ FIXED
**Where:** all `best-construction-company-*.html` except Colombo and Kurunegala
**Issue:** Each district page emitted `"@type": ["LocalBusiness","GeneralContractor"]` with `@id` `#business-<district>`, the **Narammala head-office postal address**, and `geo` coordinates pointing at **that district's city centre**. So the Jaffna page claimed a business at the Narammala address located at Jaffna's lat/long.
**Why it matters:** `LocalBusiness` asserts a physical place customers can visit. Twenty-three entities sharing one address but scattered across the map is inaccurate structured data and reads as location spam. There is genuine manual-action risk.
**Fix applied:** Those 23 pages now emit `Organization` consolidated on a single `@id` (`#organization`), with the mismatched `geo` removed and the real HQ address and `areaServed` retained. `LocalBusiness` is kept only on the Colombo and Kurunegala pages, which correspond to the two real offices (101 Horton Pl, Colombo and 02 UB Wijekoon St, Narammala).

### H2. Self-serving `aggregateRating` on 26 pages — ✅ FIXED
**Issue:** `"ratingValue": "5", "reviewCount": "145"` appeared on the homepage and all 25 district pages. None of those pages display any review.
**Why it matters:** Google's review-snippet policy explicitly disallows review markup that a business writes about itself on its own site (*"self-serving reviews"*) for `LocalBusiness` and `Organization`. It never earns stars and it is a documented spam signal.
**Fix applied:** Removed `aggregateRating` sitewide. **No `Review` markup was added to `testimonials.html` either** — the four testimonials there are real and attributed, but first-party reviews of your own organization fall under the same policy. Star ratings have to be earned on third-party platforms; see the 90-day plan.

### H3. Fabricated team members on the team page — ✅ FIXED
**Where:** `team.html`
**Issue:** The page presented eight staff — *Joseph Crawford, Anthony Notson, Allison Herman, James Williams, Kristin Castillo, Stephen Miller, Timothy Paradis, "F-lix Lengyel"* — with stock photos and generic titles. These are the purchased template's placeholder people. The last is mojibake for *Félix Lengyel*, a well-known streamer.
**Why it matters:** Fabricated staff on a contractor's site is the most damaging possible E-E-A-T signal, and it directly contradicted the site's own real engineers published on the homepage.
**Fix applied:** Replaced with the three real, credentialed engineers already published elsewhere on the site — Vihanga Vijantha Weerasingha (BSc Hons Project Management; HND Civil Engineering), Nilitha Bandara Weerasooriya (BSc Hons Surveying Sciences, RICS accredited), Buddhika S Weerasekara (BEng Hons Civil and Construction Engineering) — plus an accurate paragraph on the wider 235-person workforce. No new people were invented.

### H4. Fake articles and a broken link on About and FAQ — ✅ FIXED
**Where:** `about.html`, `faq.html`
**Issue:** `about.html` carried three invented blog cards (*"Top Trends in Modern Home Construction"*, *"Why Quality Materials Make or Break Your Dream Home"*, *"From Foundation to Finish"*) with invented dates, all linking to `blog-details` — a page that does not exist. `faq.html` carried an entire template sidebar: a non-functional search box, fake categories with fake counts (*Business Strategy 23, Digital Marketing 18*), three fake articles dated *Jan 01 2022*, and eight tag links pointing at `#`.
**Why it matters:** Fabricated content and dead links on two of the site's most-linked pages, wasting the internal link equity those modules should carry.
**Fix applied:** The About cards now point to three genuinely published guides with their real publication dates. The FAQ sidebar was rebuilt as four useful modules — seven service links, six popular guides, a cost-calculator CTA and real contact routes — converting dead weight into 18 relevant internal links.

### H5. Zero next-generation image formats; 20 MB of referenced imagery — ✅ FIXED
**Issue:** 196 raster images, all JPEG/PNG, no WebP or AVIF. Referenced images totalled **20.3 MB**, with single PNGs up to 1.8 MB.
**Fix applied:** Generated WebP derivatives for all 83 referenced images (68 kept — 15 discarded where WebP was not smaller) and added transparent content negotiation in `.htaccess`: if the browser sends `Accept: image/webp` and `<file>.webp` exists, it is served in place of the original with `Vary: Accept`. **No HTML or image URL changed**, and non-WebP clients still get the original.
**Result: 20.3 MB → 7.3 MB, a 64% reduction, with zero markup churn.**

### H6. Two CSS background images 404 on every page that used them — ✅ FIXED
**Issue:** `common-style.css` referenced `../img/slider.png` for the default `.page-header-bg`, and `main.css` referenced `../img/gradiant-bg-2.jpg` for `.contact-section`. Neither file exists.
**Why it matters:** The default page-header hero silently failed across the site, and each affected page fired a 404. Found only by loading pages in a real browser — it is invisible to HTML-only inspection.
**Fix applied:** Repointed to the correct existing assets (`slider-background.jpg` 1920×1000, `cta-background-2.jpg` 1920×1080). Verified in-browser: **0 failed requests, 0 console errors**.

### H7. Fourteen render-blocking stylesheets on every page — ⚠️ PARTIALLY ADDRESSED
**Issue:** Every page loads 14 separate blocking `<link rel="stylesheet">` tags totalling ~630 KB uncompressed, including `bootstrap.min.css` (231 KB), `line-awesome.min.css` (90 KB), `keyframe-animation.css` (68 KB), `animate.min.css` (59 KB).
**Addressed:** Brotli/gzip now cuts transfer size by roughly 75–85%, and hero images are preloaded on 43 pages.
**Remaining:** The 14-request serial chain and the unused-CSS problem persist. See *Remaining issues*.

---

## MEDIUM

### M1. UTF-8 mojibake in the HTML sitemap — ✅ FIXED
`html-sitemap.html` rendered `HTML Sitemap â€" Gaura Construction` in its `<title>`, `<meta description>`, `og:title` and JSON-LD `name` — a UTF-8 em dash decoded as cp1252. Five sequences repaired; the title now renders correctly.

### M2. UTF-8 BOM in 33 files — ✅ FIXED
Thirty-two HTML files and `sitemap.xml` began with a UTF-8 byte-order mark before `<!doctype html>` / the XML declaration. A BOM ahead of the doctype can trigger quirks mode and is invalid before an XML declaration. Stripped from all 33.

### M3. Corrupted H1 on a project page — ✅ FIXED
`project-rathnapura.html` had `<h1>???? Completed Interior Renovation … Rathnapura ????</h1>` — emoji destroyed by an encoding round-trip, sitting in the page's single most important heading. Rewritten cleanly.

### M4. Wrong-industry and false template copy — ✅ FIXED
- *"Serving since 1970 with Global strategies"* on `team.html` and `testimonials.html` — contradicts the company's own *10+ years* claim. Replaced with an accurate statement.
- *"Our versatile team is built of designers, developers and digital marketers"* on five pages — describes a marketing agency. Replaced with the actual disciplines.
- *"Our success in creating business solutions is due in part specially to talented committed team"* — generic filler in the footer of **all 77 pages**. Replaced with a factual description of the company and its service area.
- `Testimominals` typo corrected.

### M5. Six pages had template H1s that ignored search intent — ✅ FIXED

| Page | Was | Now |
|---|---|---|
| `projects` | *Work together to create unique experience!* | Construction Projects in Sri Lanka |
| `team` | *Our team create great things together!* (ungrammatical) | Meet the Engineers Behind Every Gaura Project |
| `testimonials` | *Build your dream house today!* | What Our Clients Say About Gaura Construction |
| `blog` | *News & Insights* | Construction Guides & Insights for Sri Lanka |
| `services` | *Building Sri Lanka's Future with Excellence & Innovation!* | Construction Services in Sri Lanka |
| `contact` | *Get In Touch* | Contact Gaura Construction |

### M6. Missing structured data on six pages — ✅ FIXED
- `project-almas`, `project-kadawatha`, `project-rathnapura`, `project-waththala` had **no JSON-LD at all**. Added `BreadcrumbList` + `Article` with real project facts (client, location, scope, and the LKR 20.1M / LKR 1.1M values already published on those pages).
- `blog-best-construction-company-kurunegala` had **no JSON-LD at all** despite being the target of the `blog-details` redirect. Added `BreadcrumbList` + `BlogPosting`.
- `blog.html` gained `Blog` + `ItemList` covering all 17 posts; `projects.html` gained `CollectionPage` + `ItemList` covering all 10 projects.

**All 76 JSON-LD blocks across the site now parse as valid JSON.**

### M7. Four vague project titles — ✅ FIXED
*"Almas Project"*, *"Kadawatha Project"*, *"Rathnapura Project"*, *"Waththala Project"* described nothing. Retitled to what each actually is (e.g. *2-Storey Luxury Residence with Rooftop, Kadawatha*), with matching descriptions.

### M8. Two indexed template stub pages — ✅ FIXED
`project-details.html` (528 words of placeholder project copy) and `team-details.html` (a fabricated profile for *"Graham Thomas"* plus *"Financial experts support or help you…"* filler) were both in `sitemap.xml` and indexable. Worse, the **real** engineers' names on the homepage, About and Kurunegala pages linked to that fake profile.
**Fix:** Both marked `noindex, follow`, removed from `sitemap.xml` and from `html-sitemap.html`. The real engineers' names are now plain text rather than links to a fabricated profile.

### M9. No LCP resource hints — ✅ FIXED
No page preloaded its hero image; inner-page heroes are CSS backgrounds, which the browser cannot discover until CSS parses. Added `<link rel="preload" as="image" fetchpriority="high">` ahead of the first stylesheet on **43 pages**, resolving the hero from `fetchpriority="high"` `<img>` or the page-header background URL.

### M10. Weak internal linking into blog content — ✅ FIXED
No blog post had a related-articles module; posts averaged 2–4 inbound internal links, and several sat at 2.
**Fix:** Added a curated *Related guides* block to all 17 posts — four topically-related posts plus one matching service or tool page, each with a descriptive anchor. Clusters are hand-mapped by topic (cost & finance, planning & process, choosing a builder, materials & methods, design & spaces), not generated round-robin.
**Result: inbound internal links per post went from 2–4 to 3–17.**

### M11. Generic and misleading alt text — ✅ FIXED
53 images had `alt="Logo"`, `alt="thumb"`, `alt="img"` or `alt="post"`. Separately, `testimonials.html` used **stock team photos as avatars beside named real clients**, implying they depicted those clients.
**Fix:** Descriptive alt text where the image is meaningful; `alt=""` where the image is genuinely decorative (the correct accessibility treatment, and it stops stock photos implying they show a named client). The testimonials `og:image`/`twitter:image` were also repointed from a stock team photo to a real completed project.

### M12. 41 malformed `<img>` tags — ✅ FIXED
Self-closing tags (`<img … />`) left a stray `/` mid-tag when attributes were appended, producing `alt="Logo" / width="900"`. Browsers tolerate it; validators do not. All 41 repaired across 39 files. Two `<div>` imbalances introduced during section rewrites were also caught and fixed — **all 78 pages now have balanced `<div>` nesting.**

---

## LOW

| # | Issue | Status |
|---|---|---|
| L1 | Heading hierarchy skips `h1→h3` and `h2→h4` on most pages (a template convention where `h3` is a visual eyebrow above the `h1`). Cosmetic for search, real for screen readers. | Open |
| L2 | Swiper's loop mode clones the hero slide, so rendered DOM shows 3 `<h1>` on the homepage and Kurunegala page. Static HTML has exactly one. Low risk; fixing means changing slider behaviour. | Open |
| L3 | `<meta name="keywords">` present on some pages. Ignored by every major engine since 2009. Harmless. | Open |
| L4 | Image filenames contain spaces and meaningless names — `assets/img/Untitled design (17)/`, `assets/img/design gallery/`, `about us.jpeg`. Renaming means updating every reference and adding redirects; low return. | Open |
| L5 | `assets/profile/` holds **69 MB** for the flipbook — larger than the rest of the site combined. Not linked from most pages, so it does not affect page weight, but it bloats deployment. | Open |
| L6 | Legacy IE conditional comments and `modernizr-2.8.3-respond` still loaded. Dead weight for all current browsers. | Open |

---

## Verification performed

All checks re-run after changes:

| Check | Result |
|---|---|
| JSON-LD validity | **76/76 blocks parse as valid JSON** |
| Duplicate titles | **0** |
| Duplicate meta descriptions | **0** |
| Titles > 62 chars | **0** |
| Descriptions > 160 chars | **0** |
| Missing canonical | **0** |
| Pages without exactly one `<h1>` (static HTML) | **0** |
| Images without `width`/`height` | **0 of 619** |
| Images without `alt` | **0 of 619** |
| Broken internal links | **0** |
| Missing referenced assets (HTML `src`/`href`, CSS `url()`, inline styles) | **0** |
| `<div>` nesting balance | **balanced on all 78 pages** |
| Browser console errors | **0** across sampled pages |
| Failed network requests | **0** across sampled pages |
| `sitemap.xml` | valid XML, 74 URLs, utility/noindex pages excluded |

Rendering was verified in a real headless browser, not just by static inspection — which is how H6 (the two 404ing CSS backgrounds) was found at all.

---

## Remaining issues, in priority order

1. **No templating layer (root cause).** Header, nav and footer are duplicated across 78 files. Every sitewide edit in this audit had to be a scripted find-and-replace, and the next one will too. A tiny static-site generator (Eleventy) or even server-side includes would remove an entire class of drift — the fake-article and wrong-industry copy survived precisely because there was no single place to fix them.
2. **CSS consolidation (H7).** Bundle the 14 stylesheets into one or two files and strip unused Bootstrap/Line Awesome/Animate rules. Expect a large LCP and FCP improvement; requires careful regression testing.
3. **Thin commercial pages.** `projects.html` (253 words), `contact.html` (255), `team.html` (301), `testimonials.html` (444) are all important pages carrying very little substance. `projects.html` in particular should surface per-project scope, value and duration — that data already exists on the individual project pages.
4. **District page differentiation.** The 25 district pages are ~1,900 words each but largely templated, differing mainly by place name, neighbouring towns and province. They are not currently a penalty risk, but they will never rank strongly on templated text alone. Prioritise the districts with real delivered projects (Colombo, Gampaha, Kurunegala, Rathnapura, Hambantota) and add genuinely local material. See `CONTENT-OPPORTUNITIES.md`.
5. **No third-party review presence.** With self-serving markup correctly removed, star ratings can only come from Google Business Profile and independent platforms.
6. **Heading hierarchy (L1)** and the remaining LOW items.

---

## Deliverables

| Document | Contents |
|---|---|
| `SEO-AUDIT.md` | This document |
| `CONTENT-OPPORTUNITIES.md` | Prioritised content gaps with angles and evidence needed |
| `INTERNAL-LINKING-PLAN.md` | Link graph, implemented links, next-priority links |
| `COMPETITOR-GAP-ANALYSIS.md` | Competitive landscape and differentiation method |
| `90-DAY-SEO-PLAN.md` | Week-by-week execution plan |
| `GEO-AI-SEARCH-PLAN.md` | AI/answer-engine visibility strategy |
| `IMPLEMENTATION-REPORT.md` | Everything changed, file by file |

A full backup of every file in its pre-audit state is in `.seo-backup/`.
