import {defineType, defineField, defineArrayMember} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'
import {iconField} from './shared/iconField'

export const research = defineType({
  name: 'research',
  title: 'Research Areas / Focus Cards',
  type: 'document',
  icon: SearchIcon,
  fieldsets: [
    {name: 'heading', title: 'Section heading', options: {collapsible: false}},
    {name: 'cards', title: 'Research cards', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Research heading',
      type: 'string',
      fieldset: 'heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Research areas',
      type: 'array',
      fieldset: 'cards',
      description: 'Shown as cards. Any number works — the grid adjusts.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'researchArea',
          fields: [
            defineField({
              name: 'title',
              title: 'Card title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card summary',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'details',
              title: 'Glass-screen details',
              type: 'text',
              rows: 5,
              description: 'Longer information shown after the visitor clicks the research card.',
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
    prepare: () => ({title: 'Research Areas / Focus Cards'}),
  },
})
