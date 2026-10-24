import {defineType, defineField, defineArrayMember} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const achievements = defineType({
  name: 'achievements',
  title: 'Achievements / Career Highlights',
  type: 'document',
  icon: StarIcon,
  fieldsets: [
    {name: 'heading', title: 'Section heading', options: {collapsible: false}},
    {name: 'items', title: 'Career highlights', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Achievements heading',
      type: 'string',
      fieldset: 'heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Achievements',
      type: 'array',
      fieldset: 'items',
      description: 'Numbered automatically on the site, in the order listed here — drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'achievement',
          fields: [
            defineField({
              name: 'title',
              title: 'Highlight title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Highlight explanation',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Achievements / Career Highlights'}),
  },
})
