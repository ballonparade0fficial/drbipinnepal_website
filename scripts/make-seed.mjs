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
const requestedBatch = process.argv[2] || 'all'

// Sanity requires a unique _key on every array item.
const withKeys = (items = []) =>
  items.map((item) =>
    typeof item === 'string' ? item : {_key: randomUUID().slice(0, 8), ...item},
  )

const content = JSON.parse(await readFile(CONTENT_FILE, 'utf8'))

// The three long-form collections historically lived in small frontend data
// modules. Read them as a one-time migration fallback so the first Sanity
// import contains the complete site rather than only the section documents.
async function readDefaultArray(filename, variable, replacements = {}) {
  const source = await readFile(path.join(ROOT, 'frontend/src/data', filename), 'utf8')
  const declaration = `const ${variable} =`
  const start = source.indexOf(declaration)
  const endMarker = source.indexOf('];\n\nexport', start)
  const end = endMarker < 0 ? -1 : endMarker + 1
  if (start < 0 || end < 0) throw new Error(`Could not read ${filename}`)

  let expression = source.slice(start + declaration.length, end).trim()
  for (const [from, to] of Object.entries(replacements)) expression = expression.replaceAll(from, to)
  return Function(`return (${expression})`)()
}

const defaultVideos = await readDefaultArray('videos.js', 'videos', {
  defaultVideoTitle: JSON.stringify('Dr. Bipin Nepal — Featured Video'),
})
const defaultPublications = await readDefaultArray('publications.js', 'publications')
const defaultNewsCoverage = await readDefaultArray('news.js', 'newsCoverage')
const publications = content.publications?.items?.length ? content.publications.items : defaultPublications
const newsCoverage = content.newsCoverage?.items?.length ? content.newsCoverage.items : defaultNewsCoverage
const videos = content.media?.videos?.length ? content.media.videos : defaultVideos

const documents = [
  {
    _id: 'site',
    _type: 'site',
    name: content.site.name,
    tagline: content.site.tagline,
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
    badgeDetails: withKeys(content.about.badgeDetails),
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
    groups: withKeys(
      content.expertise.groups.map((g) => ({
        ...g,
        tags: g.tags,
        tagDetails: withKeys(g.tagDetails),
      })),
    ),
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
  {
    _id: 'publications',
    _type: 'publications',
    eyebrow: content.publications?.eyebrow || 'Research & Writing',
    title: content.publications?.title || 'Publications',
    intro: content.publications?.intro || 'Selected research, clinical studies, and academic contributions.',
    showMoreLabel: content.publications?.showMoreLabel || 'Show More Publications',
    items: withKeys(publications),
  },
  {
    _id: 'newsCoverage',
    _type: 'newsCoverage',
    eyebrow: content.newsCoverage?.eyebrow || 'In the Press',
    title: content.newsCoverage?.title || 'News Coverage',
    intro: content.newsCoverage?.intro || "Selected interviews, features, and media coverage about Dr. Bipin Nepal's work.",
    items: withKeys(newsCoverage),
  },
  {
    _id: 'media',
    _type: 'media',
    eyebrow: content.media?.eyebrow || 'Watch & Learn',
    title: content.media?.title || 'Media',
    intro: content.media?.intro || "Videos featuring Dr. Bipin Nepal's work and perspectives.",
    showMoreLabel: content.media?.showMoreLabel || 'Show More Videos',
    videos: withKeys(videos),
  },
]

const batches = {
  first: ['site', 'navbar', 'hero', 'about'],
  second: ['achievements', 'research', 'expertise', 'impact'],
  third: ['contact', 'publications', 'newsCoverage', 'media'],
  collections: ['publications', 'media'],
  all: documents.map((doc) => doc._id),
}

if (!batches[requestedBatch]) {
  throw new Error(`Unknown seed batch "${requestedBatch}". Use first, second, third, collections, or all.`)
}

const selectedDocuments = documents.filter((doc) => batches[requestedBatch].includes(doc._id))
await writeFile(OUT_FILE, selectedDocuments.map((doc) => JSON.stringify(doc)).join('\n') + '\n')
console.log(
  `Wrote ${selectedDocuments.length} documents (${requestedBatch} batch) to ${path.relative(ROOT, OUT_FILE)}`,
)
