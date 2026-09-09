# Roadmap & Handover

Working plan for drbipinnepal.com. **This file, not conversation history, is the
source of truth.** It is written to be self-contained: a developer or AI
assistant with no prior context should be able to read this and continue.

---

## 0. How to pick this up cold

If you are a fresh assistant or developer:

1. Read this file top to bottom.
2. Read `README.md` for the full architecture and setup commands.
3. Run `git pull --rebase origin main` before doing anything (see Gotchas).
4. Start at **Phase 1** below — it needs no new content from the client.

---

## 1. What this project is

A professional portfolio site for **Dr. Bipin Nepal**, a transfusion medicine
specialist in Kathmandu, Nepal — researcher, public health contributor, and
(per his own copy) a pioneer of modern blood transfusion services in Nepal.

- **Live at:** https://www.drbipinnepal.com
- **Repo:** `ballonparade0fficial/drbipinnepal_website`
- **Audience:** research collaborators, journals, journalists, institutions,
  and patients. The website is *not* the work product — the research and
  clinical infrastructure is. That distinction drives most design decisions here.

## 2. Stack

- **Frontend:** React 18, Create React App (`react-scripts` 5), **plain
  JavaScript — no TypeScript**. Hand-written CSS in `frontend/src/App.css`, no
  Tailwind. No router; routing is a single `pathname === "/"` check in `App.js`.
- **Content:** Sanity Studio in `studio/` (project `qpxm2ixz`, dataset
  `production`, public). Nine singleton document types mirroring the page
  sections.
- **Hosting:** Vercel, root directory `frontend`, auto-deploys on push to `main`.
  Domain DNS is at Himalayan Host, pointed at Vercel.

## 3. Architecture — the one unusual thing

**The live site never calls Sanity.** Content is pulled at *publish* time and
committed into the repo as plain files:

```
Editor presses Publish in Sanity Studio
  → Sanity webhook → GitHub Action (.github/workflows/sync-content.yml)
  → scripts/sync-content.mjs writes frontend/src/data/content.json
  → Action commits and pushes to main
  → Vercel deploys
```

Takes 1–2 minutes end to end.

**Why:** no runtime dependency (Sanity outages can't affect visitors), the repo
holds every version of the content in the shape the components already read, and
images are downloaded into the repo rather than hotlinked. If Sanity ever
disappears, delete the workflow and the `studio/` folder — **nothing else
changes**, and content.json is already the fallback source of truth.

## 4. Gotchas that will bite you

- **`main` has two writers** — you, and a `sanity-content-sync` bot that commits
  on every publish. Your clone goes stale on its own. **Always
  `git pull --rebase origin main` before working.** Pushes get rejected as
  non-fast-forward otherwise. (`git config pull.rebase true` is already set.)
- **Never hand-edit `frontend/src/data/content.json`.** It is generated. The
  next publish silently overwrites your edit. Content changes go in the Studio.
  If it conflicts during a rebase, don't merge it — regenerate:
  `node scripts/sync-content.mjs && git add frontend/src/data/content.json && git rebase --continue`
- **Don't use "Re-run jobs"** on the sync workflow — re-runs replay against the
  original commit. Use **Run workflow** for a fresh run.
- **Sanity is on a free plan** with exactly 2 permission roles (Administrator +
  Editor) — no headroom. Confirm the doctor's Editor role still works if
  anything changes.

## 5. Current state — what already works

- Full visual redesign ("Himalayan Slate": stone `#ECEAE4`, aged brass
  `#B08D57`, slate-teal `#3E5C63`; Fraunces / Public Sans / IBM Plex Mono).
- Sections: Hero, About, Achievements, Research, Expertise, Impact, Contact.
- Sanity Studio live; the doctor can edit every section himself.
- Mobile nav, scroll-spy, 404 page, print stylesheet, skip link, `<main>`
  landmark, `prefers-reduced-motion`, visible focus states.
- Favicon/SEO fixed (this was a real bug: `/favicon.ico` didn't exist, so the
  SPA rewrite served HTML there and Google couldn't index the icon).
- Layout is resilient to content changes: grids use `auto-fit`, stagger delays
  scale via a `--i` custom property, icons fall back positionally when unset.

## 6. The design diagnosis — read before changing anything

The site's weakness is **not visual polish**. It *asserts without proving*:

- "30+ publications" — no list
- "Pioneer in Transfusion Medicine" — no evidence
- "~20 blood banks established" — no names, districts or dates
- "covered by national and international media" — nothing linked

For an academic audience, unsupported claims read as **weaker** than fewer
evidenced ones. A researcher who can find zero papers assumes there aren't many.

**There is also no person in it.** The About text is a Wikipedia stub — where he
studied, which societies he belongs to. Nothing about *why* transfusion
medicine, what Nepal's blood system looked like before, or what is still broken.
That absence is why it reads as a credential list rather than a portfolio.

> **Design principle for this phase: the distinctive visual opportunities *are*
> the content.** A map of blood bank coverage, a real publication list, press
> coverage with outlet names — each is simultaneously proof and visual interest.
> That is how this site becomes distinctive without gimmicks.

## 7. Ground rules

- **Render conditionally, never "coming soon".** A section appears only when it
  has content (`{items.length > 0 && …}`), as affiliations and academic profile
  links already do. An empty section marked "coming soon" signals an abandoned
  site — the opposite of the credibility being built.
- **No hotlinking.** Any image (portrait, video thumbnail) is downloaded into
  the repo by the sync script.
- **Hover is not an interaction on touch devices.** Anything hover-only needs a
  tap equivalent. Much of the Nepali audience is mobile.
- **URLs are plural and hyphenated** (`/blood-banks`, not `/bloodbank`) — they
  are permanent once indexed.

---

## 8. Phase 1 — structure (no new content needed) ← START HERE

1. **Consolidate overlapping sections.** Achievements, Expertise and Impact are
   three renderings of "things he is good at and has done"; a visitor cannot
   tell why they are separate. Merge Achievements + Impact into one evidenced
   narrative; demote Expertise to a compact strip. Do this *before* adding
   pages, or the structure worsens as it grows.
2. **Hero CTAs → "View Publications"** (primary, the proof) **+ "Get in Touch"**
   (secondary, the conversion). Contact must stay above the fold — it is the one
   action that produces value for him. Do *not* replace it with a gallery link.
3. **Expertise glosses** — plain-English one-liners for jargon like
   "Immunohematology", revealed on **tap/click, not hover**. Consider whether
   fewer, plainer tags would be better than jargon plus explanations.
4. **Accessibility fixes** — see Known Issues.

## 9. Phase 2 — new content types and pages

New Sanity types, all **collections** (unlike the nine existing singletons —
`studio/structure.js` already handles non-singletons below a divider).

| Type | Fields | Page |
|---|---|---|
| `publication` | title, journal, year, authors, DOI/URL, type, featured | `/publications` |
| `media` | kind (video / news article / interview), title, outlet, url, date, language | `/media` |
| `bloodBank` | name, district, year, role, **optional** coordinates | `/blood-banks` |

Design notes:

- **Media coverage is stronger evidence than self-published photos** — anyone
  can publish photos of themselves; third-party coverage can't be faked. He has
  3–4 YouTube videos and news coverage; no usable photo library.
- **YouTube: click-to-play facade, not a bare iframe.** Embedding loads Google
  tracking and hurts performance on every page load. Thumbnails derive from the
  video ID and should be pulled into the repo at sync time.
- **`bloodBank` coordinates are optional on purpose:** ship a list grouped by
  province now, add a map later without a schema migration. The map is the
  distinctive version but needs lat/lng for ~20 sites compiled by hand.
- Make the About stat boxes ("30+ Publications", "~20 Blood Banks Established")
  clickable into `/publications` and `/blood-banks`.

**Architectural consequence to decide:** adding routes breaks social sharing.
OG/Twitter tags are static in `frontend/public/index.html`, and because this is
a client-rendered CRA app, sharing `/publications` shows the *homepage's*
description. Fixing it properly needs pre-rendering. Decide deliberately.

## 10. Phase 3 — blocked on the client

**Highest impact of anything in this document. None can be done without him.**
Send him this list.

1. **A professional portrait.** The biggest visual liability — the current
   placeholder is a casual snapshot with a market signboard behind him, and it
   doubles as the Open Graph share image, so it appears whenever the site is
   shared.
2. **A real biography**, 3–4 paragraphs with a point of view. The About text is
   one thin paragraph. *This — not typography — is the "hard to read" problem.*
3. **The publication list** with journals, years and DOIs.
4. **Blood bank names, districts and dates.**
5. **Media links** — the YouTube videos and press coverage, with outlet names.

**Consent check:** any photograph taken in a clinical or donation setting needs
consent from identifiable people before publishing.

---

## 11. Known issues

- **20 of 31 icons lack `aria-hidden`** — screen readers announce decorative
  flask/globe/vial icons as content.
- **Animated counters** render as `<span>4</span>+` with no ARIA handling;
  assistive tech may announce every intermediate value during the count.
- **Portrait alt text** is just the name — should describe the image.
- **No image pipeline:** the portrait is a single 1600×1066 JPEG (223 KB), no
  `srcset`, no modern format, no `loading` attribute. Mobile users on Nepali
  networks download the full desktop image.
- **Three font families, eleven weights** from Google Fonts — render-blocking
  third-party requests. Consider subsetting or self-hosting.
- **No analytics.** Every design decision from here is guesswork.
- **Per-route meta tags** — see Phase 2.

## 12. Deliberately NOT doing

Chasing Awwwards / Dribbble / siteinspire portfolio aesthetics.

Those galleries are almost entirely **designers' and agencies' portfolios, where
the website *is* the work product** — so experimental navigation, WebGL, cursor
effects and scroll-jacking are evidence of craft. Here the work product is
research and clinical infrastructure, and the audience reads credibility from
restraint. A transfusion medicine specialist with an Awwwards-style site would
read as strange.

**Borrow the craft** — typographic discipline, spacing confidence, considered
motion. **Not the genre.** This was considered and rejected deliberately; please
don't re-propose it without a reason.
