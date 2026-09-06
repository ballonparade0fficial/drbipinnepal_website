import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const site = defineType({
  name: 'site',
  title: 'Site Details',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      description: 'Shown in the footer and used as the site name.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'The one-line summary shown under the About heading and in the footer.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tagline'},
  },
})
