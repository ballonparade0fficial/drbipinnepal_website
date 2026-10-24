import {defineType, defineField, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

export const hero = defineType({
  name: 'hero',
  title: 'Home / Hero Introduction',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {name: 'intro', title: 'Home page introduction', options: {collapsible: false}},
    {name: 'portrait', title: 'Portrait image', options: {collapsible: true}},
    {name: 'stats', title: 'Headline figures', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Large heading / name',
      type: 'string',
      fieldset: 'intro',
      description: 'The main name shown in the large hero heading.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field / role',
      type: 'string',
      fieldset: 'intro',
      description: 'The professional field shown above the name, e.g. "Transfusion Medicine Specialist".',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'intro',
      description: 'Shown beside the professional field, e.g. "Kathmandu, Nepal".',
    }),
    defineField({
      name: 'description',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      fieldset: 'intro',
      description: 'The paragraph directly under the name.',
    }),
    defineField({
      name: 'tagline',
      title: 'Byline',
      type: 'string',
      fieldset: 'intro',
      description: 'The single accented line under the introduction.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait photo',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'portrait',
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
      fieldset: 'stats',
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
    prepare: () => ({title: 'Home / Hero Introduction'}),
  },
})
