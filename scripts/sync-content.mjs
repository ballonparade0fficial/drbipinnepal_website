#!/usr/bin/env node
/**
 * Pulls published content out of Sanity and writes it into the site as plain
 * files: frontend/src/data/content.json, plus any images copied into
 * frontend/public/images/.
 *
 * Why it works this way
 * --------------------
 * The live site never talks to Sanity. This script runs before the build (or in
 * CI), and everything it produces is committed to the repo. That means:
 *   - no runtime dependency, so Sanity being slow or down can't affect visitors
 *   - the repo always holds a complete, current copy of the content
 *   - if Sanity ever goes away, delete this script and nothing else changes
 *
 * It deliberately has no dependencies — just Node 18+ fetch — so there is no
 * SDK to fall out of date.
 *
 * Usage:  node scripts/sync-content.mjs
 */

import {writeFile, mkdir, readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'qpxm2ixz'
const DATASET = process.env.SANITY_DATASET || 'production'
const API_VERSION = '2024-01-01'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_FILE = path.join(ROOT, 'frontend/src/data/content.json')
const IMAGES_DIR = path.join(ROOT, 'frontend/public/images')

// Singletons are fetched by their fixed document id. Using the plain id (not
// `drafts.<id>`) means we only ever publish content the editor has published.
const QUERY = `{
  "site": *[_id == "site"][0]{name, tagline, description},
  "navbar": *[_id == "navbar"][0]{brand, links[]{label, id}},
  "hero": *[_id == "hero"][0]{
    title, field, location, description, tagline,
    "imageUrl": portrait.asset->url,
    "imageAlt": portrait.alt,
    stats[]{label, value, suffix}
  },
  "about": *[_id == "about"][0]{
    title, text, badges, affiliationsLabel,
    affiliations[]{acronym, name, url}
  },
  "achievements": *[_id == "achievements"][0]{title, items[]{title, description}},
  "research": *[_id == "research"][0]{title, items[]{title, description, icon}},
  "expertise": *[_id == "expertise"][0]{title, subtitle, groups[]{title, tags}},
  "impact": *[_id == "impact"][0]{
    title,
    stats[]{value, suffix, label},
    items[]{title, description, icon}
  },
  "contact": *[_id == "contact"][0]{
    title, email, location, note, linkedin, googleScholar, researchGate
  }
}`

async function fetchContent() {
  const url =
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(QUERY)}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Sanity responded ${res.status} ${res.statusText}`)
  }
  const body = await res.json()
  return body.result
}

/**
 * Downloads the portrait into the repo so the published site serves its own
 * copy rather than hotlinking Sanity's CDN. Returns a site-relative path.
 * Falls back to the existing placeholder if there's no image set.
 */
async function localiseImage(imageUrl) {
  if (!imageUrl) return ''

  const res = await fetch(imageUrl)
  if (!res.ok) {
    throw new Error(`Could not download portrait: ${res.status}`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())

  // Content-hashed filename so a new upload never sits behind a stale cache.
  const ext = path.extname(new URL(imageUrl).pathname) || '.jpg'
  const hash = createHash('sha1').update(buffer).digest('hex').slice(0, 8)
  const filename = `portrait-${hash}${ext}`

  await mkdir(IMAGES_DIR, {recursive: true})
  await writeFile(path.join(IMAGES_DIR, filename), buffer)
  return `/images/${filename}`
}

function shape(data, imagePath) {
  return {
    site: data.site,
    navbar: {
      brand: data.navbar?.brand,
      links: data.navbar?.links ?? [],
      // Dev-only label for the local /admin editor; not editable in Sanity.
      adminLabel: 'Admin',
    },
    hero: {
      title: data.hero?.title,
      tagline: data.hero?.tagline,
      description: data.hero?.description,
      location: data.hero?.location,
      field: data.hero?.field,
      image: imagePath,
      stats: data.hero?.stats ?? [],
    },
    about: {
      title: data.about?.title,
      text: data.about?.text,
      badges: data.about?.badges ?? [],
      affiliationsLabel: data.about?.affiliationsLabel,
      affiliations: data.about?.affiliations ?? [],
    },
    achievements: {title: data.achievements?.title, items: data.achievements?.items ?? []},
    research: {title: data.research?.title, items: data.research?.items ?? []},
    expertise: {
      title: data.expertise?.title,
      subtitle: data.expertise?.subtitle,
      groups: data.expertise?.groups ?? [],
    },
    impact: {
      title: data.impact?.title,
      stats: data.impact?.stats ?? [],
      items: data.impact?.items ?? [],
    },
    contact: data.contact,
  }
}

/**
 * Refuses to write content that looks empty. Without this, an outage or an
 * empty dataset would silently blank the live site on the next deploy.
 */
function assertUsable(data) {
  const missing = Object.entries(data)
    .filter(([, value]) => value === null || value === undefined)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Refusing to write: no published content for [${missing.join(', ')}]. ` +
        `Publish these in the Studio, then run again. content.json left untouched.`,
    )
  }
}

async function main() {
  console.log(`Fetching content from Sanity (${PROJECT_ID}/${DATASET})…`)
  const data = await fetchContent()

  if (!data) throw new Error('Sanity returned no result. content.json left untouched.')
  assertUsable(data)

  const imagePath = await localiseImage(data.hero?.imageUrl)
  if (imagePath) console.log(`Portrait saved to ${imagePath}`)

  const content = shape(data, imagePath)
  const json = JSON.stringify(content, null, 2) + '\n'

  const previous = await readFile(CONTENT_FILE, 'utf8').catch(() => null)
  if (previous === json) {
    console.log('No changes — content.json is already up to date.')
    return
  }

  await writeFile(CONTENT_FILE, json)
  console.log(`Wrote ${path.relative(ROOT, CONTENT_FILE)}`)
}

main().catch((error) => {
  console.error(`\nContent sync failed: ${error.message}\n`)
  process.exit(1)
})
