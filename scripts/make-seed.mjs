#!/usr/bin/env node
/**
 * Converts the current frontend/src/data/content.json into an .ndjson file that
 * can be imported into Sanity, so the Studio opens already populated with the
 * live site's content instead of empty forms.
 *
 * Run once, at setup:
 *   node scripts/make-seed.mjs
 *   cd studio && npx sanity dataset import ../scripts/seed.ndjson production
 *
 * The import uses your Sanity CLI login, so no API token is needed.
 */

import {readFile, writeFile} from 'node:fs/promises'
import {randomUUID} from 'node:crypto'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_FILE = path.join(ROOT, 'frontend/src/data/content.json')
const OUT_FILE = path.join(ROOT, 'scripts/seed.ndjson')

// Sanity requires a unique _key on every array item.
const withKeys = (items = []) =>
  items.map((item) =>
    typeof item === 'string' ? item : {_key: randomUUID().slice(0, 8), ...item},
  )

const content = JSON.parse(await readFile(CONTENT_FILE, 'utf8'))

const documents = [
  {
    _id: 'site',
    _type: 'site',
    name: content.site.name,
    tagline: content.site.tagline,
    description: content.site.description,
  },
  {
    _id: 'navbar',
    _type: 'navbar',
    brand: content.navbar.brand,
    links: withKeys(content.navbar.links),
  },
  {
    _id: 'hero',
    _type: 'hero',
    title: content.hero.title,
    field: content.hero.field,
    location: content.hero.location,
    description: content.hero.description,
    tagline: content.hero.tagline,
    stats: withKeys(content.hero.stats),
  },
  {
    _id: 'about',
    _type: 'about',
    title: content.about.title,
    text: content.about.text,
    badges: content.about.badges,
    affiliationsLabel: content.about.affiliationsLabel,
    affiliations: withKeys(content.about.affiliations),
  },
  {
    _id: 'achievements',
    _type: 'achievements',
    title: content.achievements.title,
    items: withKeys(content.achievements.items),
  },
  {
    _id: 'research',
    _type: 'research',
    title: content.research.title,
    items: withKeys(content.research.items),
  },
  {
    _id: 'expertise',
    _type: 'expertise',
    title: content.expertise.title,
    subtitle: content.expertise.subtitle,
    groups: withKeys(content.expertise.groups.map((g) => ({...g, tags: g.tags}))),
  },
  {
    _id: 'impact',
    _type: 'impact',
    title: content.impact.title,
    stats: withKeys(content.impact.stats),
    items: withKeys(content.impact.items),
  },
  {
    _id: 'contact',
    _type: 'contact',
    title: content.contact.title,
    email: content.contact.email,
    location: content.contact.location,
    note: 'Available for Research Collaborations & Academic Partnerships',
    linkedin: 'https://www.linkedin.com/in/dr-bipin-nepal-145996101/',
    googleScholar: 'https://scholar.google.com/citations?user=iKT_AVoAAAAJ&hl=en',
    researchGate: 'https://www.researchgate.net/profile/Bipin-Nepal',
  },
]

await writeFile(OUT_FILE, documents.map((doc) => JSON.stringify(doc)).join('\n') + '\n')
console.log(`Wrote ${documents.length} documents to ${path.relative(ROOT, OUT_FILE)}`)
