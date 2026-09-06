import {SINGLETON_TYPES} from './schemaTypes'

/**
 * Every content type on this site is a singleton — there is exactly one Hero,
 * one About, one Contact. Pinning each to a fixed document id means the editor
 * opens straight into the form, with no "create new" list and no way to end up
 * with two competing Hero documents.
 *
 * The order below mirrors the order of the sections on the live site.
 */
const ORDER = [
  ['site', 'Site Details'],
  ['navbar', 'Navigation'],
  ['hero', 'Home / Hero'],
  ['about', 'About'],
  ['achievements', 'Achievements'],
  ['research', 'Research Areas'],
  ['expertise', 'Expertise'],
  ['impact', 'Impact'],
  ['contact', 'Contact'],
]

export const structure = (S) =>
  S.list()
    .title('Website Content')
    .items([
      ...ORDER.map(([type, title]) =>
        S.listItem()
          .title(title)
          .id(type)
          .schemaType(type)
          .child(S.document().schemaType(type).documentId(type).title(title)),
      ),
      S.divider(),
      // Anything added later that isn't a singleton still shows up here.
      ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.includes(item.getId())),
    ])
