import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const newsCoverage = defineType({
  name: 'newsCoverage',
  title: 'News Coverage / Press Mentions',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'heading', title: 'News section', options: {collapsible: false}},
    {name: 'pressLinks', title: 'Press links', options: {collapsible: true}},
  ],
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above heading', type: 'string', fieldset: 'heading', initialValue: 'In the Press'}),
    defineField({name: 'title', title: 'News section heading', type: 'string', fieldset: 'heading', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introductory text', type: 'text', rows: 3, fieldset: 'heading'}),
    defineField({
      name: 'items',
      title: 'Coverage links',
      type: 'array',
      fieldset: 'pressLinks',
      description: 'Add one item for each interview, article, or press mention.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'coverageItem',
          fields: [
            defineField({name: 'title', title: 'Article headline', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'source', title: 'News outlet / source name', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'Article URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'source'},
            prepare: ({title, subtitle}) => ({
              title: title || 'Add article headline',
              subtitle: subtitle || 'Add news outlet / source name',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
