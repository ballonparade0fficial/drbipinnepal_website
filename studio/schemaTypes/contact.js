import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

export const contact = defineType({
  name: 'contact',
  title: 'Contact & Social Profiles',
  type: 'document',
  icon: EnvelopeIcon,
  fieldsets: [
    {name: 'heading', title: 'Contact section', options: {collapsible: false}},
    {name: 'details', title: 'Contact details', options: {collapsible: true}},
    {name: 'profiles', title: 'Professional profile links', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Contact heading',
      type: 'string',
      fieldset: 'heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email address for visitors',
      type: 'string',
      fieldset: 'details',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'details',
      description: 'Also used to build the map link, e.g. "Kathmandu, Nepal".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn profile URL',
      type: 'url',
      fieldset: 'profiles',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'googleScholar',
      title: 'Google Scholar profile URL',
      type: 'url',
      fieldset: 'profiles',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'researchGate',
      title: 'ResearchGate profile URL',
      type: 'url',
      fieldset: 'profiles',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'note',
      title: 'Closing note',
      type: 'string',
      fieldset: 'heading',
      description: 'The italic line under the contact cards.',
    }),
  ],
  preview: {
    select: {subtitle: 'email'},
    prepare: ({subtitle}) => ({title: 'Contact & Social Profiles', subtitle}),
  },
})
