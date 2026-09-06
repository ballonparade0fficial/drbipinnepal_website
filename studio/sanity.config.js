import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETON_TYPES} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Dr. Bipin Nepal',

  projectId: 'qpxm2ixz',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singletons are edited in place, never created or deleted from the
    // global "new document" menu.
    templates: (prev) => prev.filter((template) => !SINGLETON_TYPES.includes(template.schemaType)),
  },

  document: {
    // Remove "duplicate" and "delete" for singletons — there should only ever
    // be one of each, and losing one would blank a section of the site.
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.includes(schemaType)
        ? prev.filter(({action}) => !['duplicate', 'delete', 'unpublish'].includes(action))
        : prev,
  },
})
