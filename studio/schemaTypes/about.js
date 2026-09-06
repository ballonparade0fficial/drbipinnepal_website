import {defineType, defineField, defineArrayMember} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Biography',
      type: 'text',
      rows: 10,
      description: 'The main biography paragraph. This is the part visitors actually read — the more substance here, the better.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badges',
      title: 'Credentials',
      type: 'array',
      description: 'Short qualification pills, e.g. "MBBS • Dow University".',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'affiliationsLabel',
      title: 'Affiliations label',
      type: 'string',
      description: 'The small heading above the societies, e.g. "Member of".',
    }),
    defineField({
      name: 'affiliations',
      title: 'Professional affiliations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'affiliation',
          fields: [
            defineField({
              name: 'acronym',
              title: 'Acronym',
              type: 'string',
              description: 'e.g. ISBT',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Full name',
              type: 'string',
              description: 'Spelled out, e.g. International Society of Blood Transfusion.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Official website',
              type: 'url',
              validation: (rule) =>
                rule
                  .required()
                  .uri({scheme: ['http', 'https']})
                  .error('Must be a full address starting with https://'),
            }),
          ],
          preview: {
            select: {title: 'acronym', subtitle: 'name'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About'}),
  },
})
