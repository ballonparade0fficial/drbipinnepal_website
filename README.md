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

All text on the site comes from `frontend/src/data/content.json`. Edit that file directly and the
site updates on the next build/deploy — there's no CMS or database.

There's also a local content-preview aid at `http://localhost:3000/admin` (development only — it's
excluded from production builds). It lets you edit the JSON in the browser and see changes live,
but it does **not** persist anything or write back to the repo; you still need to copy any changes
into `content.json` yourself.

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
