# Dr. Bipin Nepal Website

Professional portfolio site for Dr. Bipin Nepal — transfusion medicine specialist, researcher,
and public health contributor. A single static React app (no backend), content-driven from one
JSON file.

Live at [drbipinnepal.com](https://drbipinnepal.com), deployed on Vercel.

## Project Structure

- `frontend/` — the React app (Create React App). This is the entire project; there is no backend.
- `frontend/src/data/content.json` — all site copy (hero, about, achievements, research, expertise,
  impact, contact) in one place.
- `frontend/src/components/` — one component per section.
- `frontend/public/images/` — the profile photo (`placeholder.jpg`) and other static assets.

## Local Development

1. `cd frontend`
2. `npm install`
3. `npm start`
4. Open `http://localhost:3000`

## Editing Content

All text on the site comes from `frontend/src/data/content.json`. That file is the single source of
truth for the site — everything else reads from it.

It can be edited two ways:

**1. Through Sanity Studio (how the client edits).** See "Content management" below.

**2. By editing `content.json` directly.** Still works, and is the fallback if Sanity ever goes
away. Note that the next Sanity sync overwrites manual edits, so make lasting changes in the Studio.

## Content management (Sanity)

The client edits content in Sanity Studio. Nothing on the live site talks to Sanity — content is
pulled at publish time and committed into this repo as ordinary files.

### How a change reaches the site

```
Editor presses Publish in Studio
  → Sanity webhook fires
  → GitHub Action (.github/workflows/sync-content.yml) runs
  → scripts/sync-content.mjs pulls content, writes content.json (+ downloads images)
  → Action commits and pushes to main
  → Vercel deploys
```

Roughly 1–2 minutes end to end.

### Why it's built this way

- **No runtime dependency.** The deployed site contains the content; it never calls Sanity. Sanity
  being slow, down, or gone cannot affect visitors.
- **The repo is the system of record.** Every published version is a commit, so content has full
  version history and can be restored with `git revert`.
- **Images are copied in, not hotlinked.** `sync-content.mjs` downloads uploaded images into
  `frontend/public/images/`, so the site never depends on Sanity's CDN either.

### Studio

- Lives in `studio/`. Run locally with `cd studio && npm run dev`.
- Deploy with `cd studio && npx sanity deploy`.
- Every content type is a **singleton** — one Hero, one About, etc. — pinned by fixed document id in
  `studio/structure.js`. Duplicate/delete are disabled so a section can't be accidentally removed.

### First-time setup

```bash
node scripts/make-seed.mjs                                    # content.json → seed.ndjson
cd studio && npx sanity dataset import ../scripts/seed.ndjson production
```

Then in Sanity: add a webhook pointing at GitHub's `repository_dispatch` endpoint with event type
`sanity-update`, authenticated with a fine-grained GitHub token (Contents: read/write on this repo).

### Manual sync

```bash
node scripts/sync-content.mjs
```

Safe by design: if Sanity returns incomplete content, it exits non-zero and leaves `content.json`
untouched rather than blanking the site.

### Working alongside the sync bot

`main` has two writers: you, and the `sanity-content-sync` bot that commits whenever content is
published. So your local clone goes stale on its own. Pull before you start:

```bash
git pull --rebase origin main
```

If `content.json` conflicts, **don't merge it by hand** — it's generated, so regenerate it:

```bash
node scripts/sync-content.mjs
git add frontend/src/data/content.json
git rebase --continue
```

Sanity is the source of truth for that file, so a fresh pull is always the correct resolution.

### If Sanity ever goes away

Delete `.github/workflows/sync-content.yml` and the `studio/` folder. **Nothing else changes.**
`content.json` already holds all current content in the shape the site expects, so you're back to
editing it by hand — no rewrite, no data recovery, no downtime.

## Design

- **Theme**: "Himalayan Slate" — warm stone neutrals (`#ECEAE4`) with aged-brass (`#B08D57`) and
  slate-teal (`#3E5C63`) accents.
- **Typography**: Fraunces (headings), Public Sans (body), IBM Plex Mono (labels/data).
- Fully responsive, with a mobile nav menu, scroll-spy navigation, and reduced-motion support.

## Deployment

- Hosted on Vercel, connected to this repository's `main` branch — every push to `main` deploys to
  production automatically.
- Custom domain `drbipinnepal.com` (and `www`) is configured in the Vercel project's Domains settings.
- Open a PR for any change beyond a trivial copy edit — Vercel builds a preview deployment per PR,
  so you can check it before merging to `main`.

## Notes

- Replace `frontend/public/images/placeholder.jpg` with a proper professional portrait when available
  — it's used as the hero photo and the Open Graph/Twitter share image.
- `frontend/public/favicon.svg` is a placeholder "BN" monogram; swap it for a real logo mark if one
  is designed later.
