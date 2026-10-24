import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const newsCoverage = defineType({
  name: 'newsCoverage',
  title: 'News Coverage',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'In the Press'}),
    defineField({name: 'title', title: 'Section heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({
      name: 'items',
      title: 'Coverage links',
      type: 'array',
      description: 'Add a headline, publication/source name, and the news article URL.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'coverageItem',
          fields: [
            defineField({name: 'title', title: 'Headline', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'source', title: 'Source / publication', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'Article link',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'source'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
