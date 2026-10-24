import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const publications = defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'Research & Writing'}),
    defineField({name: 'title', title: 'Section heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({name: 'showMoreLabel', title: 'Show more button label', type: 'string', initialValue: 'Show More Publications'}),
    defineField({
      name: 'items',
      title: 'Publications',
      type: 'array',
      description: 'Add the publication title and the link to its document or journal page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'publication',
          fields: [
            defineField({name: 'title', title: 'Publication title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'Publication link',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
