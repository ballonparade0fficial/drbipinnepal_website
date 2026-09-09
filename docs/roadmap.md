# Roadmap

Working plan for the next phase of drbipinnepal.com. Written down so it survives
across sessions — this file, not conversation history, is the source of truth.

## The diagnosis

The site's weakness is not visual polish. It **asserts without proving**:
"30+ publications" with no list, "Pioneer in Transfusion Medicine" with no
evidence, "~20 blood banks" with no names, "covered by national and
international media" with nothing linked.

For an academic audience, unsupported claims read as *weaker* than fewer
evidenced ones. The fix is substance, rendered well — not decoration.

**Design principle for this phase:** the distinctive visual opportunities *are*
the content. A map of blood bank coverage, a real publication list, press
coverage with outlet names — each is simultaneously proof and visual interest.
That's how this site becomes distinctive without gimmicks.

## Ground rules

- **Render conditionally, never "coming soon".** A section appears only when it
  has content (`{items.length > 0 && ...}`), as affiliations and academic
  profile links already do. An empty section marked "coming soon" signals an
  abandoned site — the opposite of the credibility being built.
- **No hotlinking.** Any image (portraits, video thumbnails) gets downloaded
  into the repo by the sync script, so the site never depends on a third party.
- **Hover is not an interaction on touch devices.** Anything hover-only must
  have a tap equivalent.

## Phase 1 — structure (no new content needed)

1. **Consolidate overlapping sections.** Achievements, Expertise and Impact are
   three renderings of "things he is good at and has done"; a visitor can't tell
   why they're separate. Merge Achievements + Impact into one evidenced
   narrative; demote Expertise to a compact strip. Do this *before* adding
   pages, or the structure worsens as it grows.
2. **Hero CTAs.** Primary "View Publications" (the proof), secondary "Get in
   Touch" (the conversion). Contact must stay above the fold — it is the one
   action that produces value for him.
3. **Expertise glosses** — plain-English one-liners, tap-to-expand, not hover.
4. **Accessibility fixes** (see below).

## Phase 2 — new content types

New Sanity types, all **collections** (unlike the nine existing singletons).
Build the schemas first so he can gather material in parallel.

| Type | Fields | Page |
|---|---|---|
| `publication` | title, journal, year, authors, DOI/URL, type, featured | `/publications` |
| `media` | kind (video/article/interview), title, outlet, url, date, language | `/media` |
| `bloodBank` | name, district, year, role, optional coordinates | `/blood-banks` |

Notes:
- **URLs are plural and hyphenated** — permanent once indexed.
- `bloodBank` coordinates are **optional**: ship a list grouped by province now,
  add the map later without a migration. The map is the distinctive version but
  needs lat/lng for ~20 sites compiled by hand.
- **YouTube: click-to-play facade**, not a bare iframe — embedding loads Google
  tracking and hurts performance on every page load. Thumbnails derive from the
  video ID and should be pulled into the repo at sync time.
- Media coverage is stronger evidence than self-published photos: third-party
  coverage can't be faked.

## Phase 3 — blocked on the client

These are the highest-impact items and none can be done without him:

1. **A professional portrait.** Still the biggest visual liability — the current
   placeholder is a casual snapshot with a market signboard, and it doubles as
   the Open Graph share image.
2. **A real biography**, 3–4 paragraphs with a point of view. The About text is
   a Wikipedia stub. This — not typography — is the "hard to read" problem.
3. **The publication list** with DOIs.
4. **Blood bank names, districts and dates.**
5. **Media links** — the 3–4 YouTube videos and press coverage.

Consent check: any photograph taken in a clinical or donation setting needs
consent from identifiable people before publishing.

## Known issues to fix

- **20 of 31 icons lack `aria-hidden`** — screen readers announce decorative
  flask/globe/vial icons as content.
- **Animated counters** render as `<span>4</span>+` with no ARIA handling;
  assistive tech may announce every intermediate value during the count.
- **Portrait alt text** is just the name — should describe the image.
- **No image pipeline**: the portrait is a single 1600×1066 JPEG (223 KB), no
  `srcset`, no modern format, no `loading` attribute.
- **Per-route meta tags.** OG/Twitter tags are static in `index.html`. Because
  this is a client-rendered CRA app, sharing `/publications` shows the
  *homepage's* description. Adding routes makes this visible — needs
  pre-rendering to fix properly. Decide deliberately.
- **No analytics** — every design decision from here is guesswork.

## Deliberately not doing

Chasing Awwwards/Dribbble-style portfolio aesthetics. Those galleries are almost
entirely designers' and agencies' portfolios, where the website *is* the work
product, so experimental navigation and heavy motion are evidence of craft.
Here the work product is research and clinical infrastructure, and the audience
reads credibility from restraint. Borrow the craft — typographic discipline,
spacing, considered motion. Not the genre.
