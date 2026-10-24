import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const site = defineType({
  name: 'site',
  title: 'Brand & Footer Settings',
  type: 'document',
  icon: CogIcon,
  fieldsets: [
    {name: 'identity', title: 'Brand identity', options: {collapsible: false}},
  ],
  fields: [
    // Retained temporarily so older Sanity documents do not show an
    // "Unknown field" warning before the migration import is run.
    defineField({
      name: 'description',
      title: 'Legacy description',
      type: 'text',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'svg',
      title: 'Legacy SVG field',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'string',
      fieldset: 'identity',
      description: 'The name shown in the header, footer, page title, and other site branding.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Professional tagline',
      type: 'string',
      fieldset: 'identity',
      description: 'The short professional summary shown in the About section and footer.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tagline'},
  },
})
