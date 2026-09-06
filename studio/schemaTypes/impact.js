import {defineType, defineField, defineArrayMember} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'
import {iconField} from './shared/iconField'

export const impact = defineType({
  name: 'impact',
  title: 'Impact',
  type: 'document',
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Headline figures',
      type: 'array',
      description: 'The row of large numbers at the top of the section.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'impactStat',
          fields: [
            defineField({
              name: 'value',
              title: 'Number',
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
              title: 'Label',
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
      description: 'The list below the figures.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'impactArea',
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
    prepare: () => ({title: 'Impact'}),
  },
})
