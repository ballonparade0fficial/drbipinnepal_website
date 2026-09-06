import {defineType, defineField, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

export const hero = defineType({
  name: 'hero',
  title: 'Home / Hero',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Name (large heading)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field / role',
      type: 'string',
      description: 'Shown in the small label above the name, e.g. "Researcher in Transfusion Medicine".',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Shown next to the field label, e.g. "Kathmandu, Nepal".',
    }),
    defineField({
      name: 'description',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'The paragraph directly under the name.',
    }),
    defineField({
      name: 'tagline',
      title: 'Byline',
      type: 'string',
      description: 'The single accented line under the introduction.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait photo',
      type: 'image',
      options: {hotspot: true},
      description:
        'Uploaded here, then copied into the site during publishing — the live site never depends on Sanity to serve it.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describes the photo for screen readers and search engines.',
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Headline figures',
      type: 'array',
      description: 'The small cards under the buttons. Four fits the layout best.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description:
                'Publications, Blood Banks, Years and Affiliations get matching icons automatically.',
              validation: (rule) => rule.required(),
            }),
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
  ],
  preview: {
    prepare: () => ({title: 'Home / Hero'}),
  },
})
