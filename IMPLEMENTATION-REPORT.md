# Implementation Report — gauraconstruction.lk

**Date:** 3 September 2026
**Files changed:** 153 (78 HTML, 2 CSS, `.htaccess`, `web.config`, `sitemap.xml`, `llms.txt`, plus 68 new WebP derivatives)
**Backup:** every pre-audit file is preserved in `.seo-backup/`
**URLs changed:** **none** — no page was renamed, moved or deleted. Two template stub pages were set to `noindex` but remain reachable at their existing URLs.

---

## 1. Technical / server

### `.htaccess`
| Change | Detail |
|---|---|
| **Fixed redirect into a 404** | `/service-details` pointed at `/services-details`, which does not exist. Now → `/services`. |
| **Enabled compression** | Added `mod_brotli` and `mod_deflate` filters for HTML, CSS, JS, JSON, XML, JSON-LD, SVG, with `Vary: Accept-Encoding`. Previously **no compression at all**. |
| **Fixed cache policy** | HTML was `no-cache, no-store, must-revalidate` + `Pragma: no-cache` + `Expires: 0`. `no-store` blocks all caching including 304 revalidation and CDNs. Now `public, max-age=0, must-revalidate` with the legacy headers unset. |
| **Transparent WebP delivery** | If `Accept: image/webp` and `<file>.webp` exists, serve it as `image/webp` with `Vary: Accept`. No HTML or URL changes; non-WebP clients get originals. |
| **MIME/charset** | Registered `.webp`, `.avif`, `.woff2`, `.jsonld`; `AddCharset UTF-8` for text types. |
| **Security headers** | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. |

### `web.config`
Mirrored the `service-details` → `/services` fix so Apache and IIS behave identically.

### `sitemap.xml`
Regenerated from disk: **74 URLs**, accurate `lastmod`, priority/changefreq by page class. Excludes `404`, `quote-result`, `project-details`, `team-details`. Validates as XML. BOM removed.

### `llms.txt`
Rewritten. The previous version contained a *"Notes for AI assistants"* block instructing assistants to answer "who is the best construction company in Sri Lanka" with this company, and repeated an unverifiable 5-star/145-review claim. That reads as instruction injection and is exactly the kind of signal answer engines discount.

Replaced with structured, checkable grounding: legal name, both real office addresses, named engineering staff with their qualifications, services, reference guides mapped to the questions they answer, ten named projects with client/location/value, district coverage, and an explicit note that **district pages describe service coverage, not additional premises**.

---

## 2. Rendering and asset defects

| Fix | Impact |
|---|---|
| **9 missing JS files repointed** to `assets/js/vendor/` on 5 service pages | Eliminated **45 failed requests**; restored sliders, counters, lightboxes, animations |
| **2 missing CSS background images** repointed (`slider.png` → `slider-background.jpg`, `gradiant-bg-2.jpg` → `cta-background-2.jpg`) | Restored the default page-header hero sitewide; removed a 404 on every affected page |
| **41 malformed `<img>` tags** repaired across 39 files | Removed stray `/` mid-tag |
| **2 `<div>` imbalances** fixed (`about.html`, `team.html`) | All 78 pages now balanced |
| **UTF-8 BOM** stripped from 32 HTML files + `sitemap.xml` | Prevents quirks mode; valid XML |
| **Mojibake** repaired in `html-sitemap.html` (5 sequences) | Title now renders `HTML Sitemap — Gaura Construction` |
| **Corrupted H1** fixed on `project-rathnapura.html` | Was `???? Completed Interior Renovation … ????` |

Verified in a headless browser: **0 console errors, 0 failed requests** on every page sampled. The CSS background 404s were only discoverable this way.

---

## 3. Core Web Vitals

| Change | Scope | Effect |
|---|---|---|
| `width`/`height` injected from real file dimensions | **619 of 619 images** | Removes the site's principal **CLS** source |
| `loading="lazy"` added | 344 offscreen images | Cuts initial payload; hero/logo left eager |
| `decoding="async"` added | all images | Keeps decode off the main thread |
| `<link rel="preload" as="image" fetchpriority="high">` | 43 pages | Earlier **LCP** discovery, including CSS-background heroes |
| Brotli + gzip | all text assets | ~75–85% transfer reduction on ~630 KB of CSS |
| WebP content negotiation | 68 images | **20.3 MB → 7.3 MB (−64%)** |

Image dimensions were read from the actual files with Pillow, not estimated.

---

## 4. Structured data

**All 76 JSON-LD blocks on the site now parse as valid JSON** (verified after every edit).

### Accuracy corrections
- **23 district pages:** `LocalBusiness` → `Organization`, consolidated on a single `@id` (`#organization`), with **mismatched `geo` removed**. Each had claimed the Narammala postal address at its own district's coordinates. `LocalBusiness` retained only on the **Colombo** and **Kurunegala** pages, matching the two real offices.
- **`aggregateRating` removed from all 26 pages** that carried it. Google's review-snippet policy disallows self-authored reviews of your own `Organization`/`LocalBusiness`. No `Review` markup was added to `testimonials.html` either — the same policy applies to first-party reviews, even genuine attributed ones.
- **Keyword-stuffed `alternateName` removed** from 25 district pages (values like *"Best Construction Company Kandy"* are not trading names).

### Additions
| Page(s) | Added |
|---|---|
| `project-almas`, `project-kadawatha`, `project-rathnapura`, `project-waththala` | `BreadcrumbList` + `Article` — these had **no JSON-LD at all** |
| `blog-best-construction-company-kurunegala` | `BreadcrumbList` + `BlogPosting` — had **none**, despite being a redirect target |
| `blog.html` | `Blog` + `ItemList` (all 17 posts) |
| `projects.html` | `CollectionPage` + `ItemList` (all 10 projects) |

All values were taken from content already visible on the page — no facts were invented.

---

## 5. Content integrity

This is where the largest trust gains are. Every item below was **fabricated template content that shipped to production**.

| Page | Was | Now |
|---|---|---|
| `team.html` | 8 fake staff with stock photos: *Joseph Crawford, Anthony Notson, Allison Herman, James Williams, Kristin Castillo, Stephen Miller, Timothy Paradis, "F-lix Lengyel"* (mojibake for Félix Lengyel, a streamer) | The 3 **real** credentialed engineers already published elsewhere on the site, plus an accurate paragraph on the wider 235-person workforce |
| `about.html` | 3 invented blog cards with invented dates linking to non-existent `blog-details` | 3 genuinely published guides with their real dates and images |
| `faq.html` | Full template sidebar: dead search box, fake categories with fake counts, 3 fake articles dated *Jan 01 2022*, 8 tags linking to `#` | 4 useful modules: 7 service links, 6 popular guides, cost-calculator CTA, real contact routes — **18 relevant internal links** |
| `team.html`, `testimonials.html` | *"Serving since 1970 with Global strategies"* — contradicts the company's own *10+ years* claim | Accurate statement |
| 5 pages | *"designers, developers and digital marketers"* — describes a marketing agency | The actual disciplines: civil engineers, quantity surveyors, architects, interior designers, MEP specialists |
| **All 77 pages** | Footer: *"Our success in creating business solutions is due in part specially to talented committed team"* | Factual description of the company and its service area |
| `team-details.html`, `project-details.html` | Fabricated profile for *"Graham Thomas"* + placeholder project copy, both **indexed and in the sitemap** | `noindex, follow`; removed from both sitemaps. Real engineers' names no longer link to the fake profile |
| `testimonials.html` | Stock team photos used as avatars beside **named real clients** | `alt=""` (decorative), so they no longer imply they depict those clients; social preview image repointed to a real project |

**Nothing was invented to fill these gaps.** Every replacement uses facts already published elsewhere on the site. Where no verified data existed, the element was removed or neutralised rather than filled.

---

## 6. On-page SEO

**6 H1s** rewritten from template copy to match search intent:

| Page | Was | Now |
|---|---|---|
| `projects` | *Work together to create unique experience!* | Construction Projects in Sri Lanka |
| `team` | *Our team create great things together!* | Meet the Engineers Behind Every Gaura Project |
| `testimonials` | *Build your dream house today!* | What Our Clients Say About Gaura Construction |
| `blog` | *News & Insights* | Construction Guides & Insights for Sri Lanka |
| `services` | *Building Sri Lanka's Future with Excellence & Innovation!* | Construction Services in Sri Lanka |
| `contact` | *Get In Touch* | Contact Gaura Construction |

**Metadata:** 20 over-length titles shortened, 6 over-length descriptions tightened, `og:title`/`og:description` kept in sync. 4 vague project titles rewritten to describe the actual project.

**Result: 0 duplicate titles, 0 duplicate descriptions, 0 over-length titles, 0 over-length descriptions, 0 missing canonicals.**

**Images:** 53 generic `alt` values replaced with descriptive text; genuinely decorative images given `alt=""`. **0 of 619 images now lack `alt`; 0 lack dimensions.**

---

## 7. Internal linking

Added a curated **Related guides** block to all **17 blog posts** — four topically-related posts plus one matching service or tool page, each with a descriptive anchor. Clusters were hand-mapped by topic (cost & finance, planning & process, choosing a builder, materials & methods, design & spaces), not generated round-robin, and no anchor is generic *"click here"* or aggressive exact-match.

**Inbound internal links per blog post: 2–4 → 3–17.**

The rebuilt FAQ sidebar contributes a further 18 contextual links from a high-authority page.

---

## 8. Verification

| Check | Result |
|---|---|
| JSON-LD blocks valid | **76 / 76** |
| Duplicate titles / descriptions | **0 / 0** |
| Titles > 62 chars / descriptions > 160 chars | **0 / 0** |
| Missing canonicals | **0** |
| Images without dimensions / without alt | **0 / 0** of 619 |
| Broken internal links | **0** |
| Missing referenced assets (HTML, CSS `url()`, inline styles) | **0** |
| `<div>` balance | balanced on all 78 pages |
| Browser console errors / failed requests | **0 / 0** on sampled pages |
| `sitemap.xml` | valid XML, 74 URLs |

Pages were loaded in a real headless browser and asserted on rendered DOM, network and console — not inspected statically alone.

---

## 9. Remaining issues

1. **No templating layer (root cause).** Header/nav/footer are duplicated across 78 files; every sitewide change is a scripted find-and-replace. The fabricated content in section 5 survived to production precisely because there was no single place to fix it. Recommend a static-site generator (Eleventy) or server-side includes.
2. **14 render-blocking stylesheets** (~630 KB uncompressed). Compression mitigates transfer; the serial request chain and unused CSS remain. Bundling and purging needs careful regression testing.
3. **Thin commercial pages:** `projects.html` (253 words), `contact.html` (255), `team.html` (301), `testimonials.html` (444).
4. **District pages** are ~1,900 words but largely templated. Not a penalty risk now, but they will not rank strongly on templated text.
5. **No third-party review presence** — with self-serving markup correctly removed, stars must be earned on Google Business Profile and independent platforms.
6. **Heading hierarchy** skips (`h1→h3`, `h2→h4`) sitewide; Swiper clones the hero `<h1>` at runtime on two pages.

---

## 10. Recommended next steps

**This week**
1. Deploy and confirm in production: Brotli active, WebP negotiation serving (check `Content-Type: image/webp` and `Vary: Accept`), `/service-details` → `/services` returns a single 301.
2. Resubmit `sitemap.xml` in Search Console; request reindexing for `team.html`, `about.html`, `faq.html` and the 4 project pages that gained schema.
3. Validate the corrected entity markup in Google's Rich Results Test — particularly a district page (should now be `Organization`, no `geo`, no rating) and a project page.
4. Confirm in Search Console that `project-details` and `team-details` drop out of the index.

**Weeks 2–4**
5. Claim and complete Google Business Profile for both real offices; begin requesting reviews from the named clients already on the testimonials page. This is the only legitimate route back to star ratings.
6. Bundle and purge CSS (item 2 above).
7. Expand `projects.html` using scope/value/duration data that already exists on the individual project pages.

**Month 2–3**
8. Add genuinely local content to the five districts with delivered projects, then reassess the remaining 20.
9. Publish original cost data — the calculator's tier rates are a real dataset; documenting methodology and sample would make them citable.

See `90-DAY-SEO-PLAN.md` for the full schedule and `GEO-AI-SEARCH-PLAN.md` for answer-engine specifics.
