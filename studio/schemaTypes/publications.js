import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const publications = defineType({
  name: 'publications',
  title: 'Publications / Research & Writing',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above heading', type: 'string', initialValue: 'Research & Writing'}),
    defineField({name: 'title', title: 'Publication section heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introductory text', type: 'text', rows: 3}),
    defineField({name: 'showMoreLabel', title: 'Home-page button label', type: 'string', initialValue: 'Show More Publications'}),
    defineField({
      name: 'items',
      title: 'Publications',
      type: 'array',
      description: 'Add one entry for each publication. The first six appear on Home; all entries appear on the Publications page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'publication',
          fields: [
            defineField({name: 'title', title: 'Full publication title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'Document or journal URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'url'},
            prepare: ({title, subtitle}) => ({
              title: title || 'Add publication title',
              subtitle: subtitle || 'Add document or journal URL',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
