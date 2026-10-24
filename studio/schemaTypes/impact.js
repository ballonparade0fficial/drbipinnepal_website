import {defineType, defineField, defineArrayMember} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'
import {iconField} from './shared/iconField'

export const impact = defineType({
  name: 'impact',
  title: 'Impact / Results',
  type: 'document',
  icon: TrendUpwardIcon,
  fieldsets: [
    {name: 'heading', title: 'Section heading', options: {collapsible: false}},
    {name: 'impactFigures', title: 'Impact figures', options: {collapsible: true}},
    {name: 'impactAreas', title: 'Impact areas', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Impact heading',
      type: 'string',
      fieldset: 'heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Headline figures',
      type: 'array',
      fieldset: 'impactFigures',
      description: 'The row of large numbers at the top of the section.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'impactStat',
          fields: [
            defineField({
              name: 'value',
              title: 'Figure number',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Optional, e.g. "+". Leave blank for an exact figure.',
            }),
            defineField({
              name: 'label',
              title: 'Figure label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', value: 'value', suffix: 'suffix'},
            prepare: ({title, value, suffix}) => ({
              title,
              subtitle: `${value ?? ''}${suffix ?? ''}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Areas of impact',
      type: 'array',
      fieldset: 'impactAreas',
      description: 'The list below the figures.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'impactArea',
          fields: [
            defineField({
              name: 'title',
              title: 'Impact area title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Impact area explanation',
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
    prepare: () => ({title: 'Impact / Results'}),
  },
})
