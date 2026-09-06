import {defineType, defineField, defineArrayMember} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'
import {iconField} from './shared/iconField'

export const research = defineType({
  name: 'research',
  title: 'Research Areas',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Research areas',
      type: 'array',
      description: 'Shown as cards. Any number works — the grid adjusts.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'researchArea',
          fields: [
            defineField({
              name: 'title',
              title: 'Area',
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
            iconField,
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Research Areas'}),
  },
})
