import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Also used to build the map link, e.g. "Kathmandu, Nepal".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn profile',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'googleScholar',
      title: 'Google Scholar profile',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'researchGate',
      title: 'ResearchGate profile',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'note',
      title: 'Closing note',
      type: 'string',
      description: 'The italic line under the contact cards.',
    }),
  ],
  preview: {
    select: {subtitle: 'email'},
    prepare: ({subtitle}) => ({title: 'Contact', subtitle}),
  },
})
