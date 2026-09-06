import {defineType, defineField, defineArrayMember} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const achievements = defineType({
  name: 'achievements',
  title: 'Achievements',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Achievements',
      type: 'array',
      description: 'Numbered automatically on the site, in the order listed here — drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'achievement',
          fields: [
            defineField({
              name: 'title',
              title: 'Achievement',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
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
    prepare: () => ({title: 'Achievements'}),
  },
})
