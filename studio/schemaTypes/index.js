import {site} from './site'
import {navbar} from './navbar'
import {hero} from './hero'
import {about} from './about'
import {achievements} from './achievements'
import {research} from './research'
import {expertise} from './expertise'
import {impact} from './impact'
import {contact} from './contact'

export const schemaTypes = [
  site,
  navbar,
  hero,
  about,
  achievements,
  research,
  expertise,
  impact,
  contact,
]

/**
 * Every type here is a singleton — one document each, pinned by a fixed id in
 * structure.js. Keep this list in sync with SINGLETONS there.
 */
export const SINGLETON_TYPES = schemaTypes.map((type) => type.name)
