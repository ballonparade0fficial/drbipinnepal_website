import {defineType, defineField, defineArrayMember} from 'sanity'
import {UserIcon} from '@sanity/icons/User'
import {TagIcon} from '@sanity/icons/Tag'

export const about = defineType({
  name: 'about',
  title: 'About / Professional Profile',
  type: 'document',
  icon: UserIcon,
  fieldsets: [
    {name: 'biography', title: 'Biography', options: {collapsible: false}},
    {name: 'credentials', title: 'Interactive credentials', options: {collapsible: true}},
    {name: 'affiliations', title: 'Professional affiliations', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      fieldset: 'biography',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Biography',
      type: 'text',
      rows: 10,
      fieldset: 'biography',
      description: 'The main biography paragraph. This is the part visitors actually read — the more substance here, the better.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badges',
      title: 'Credentials',
      type: 'array',
      hidden: true,
      fieldset: 'credentials',
      description: 'Short qualification pills, e.g. "MBBS • Dow University".',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'badgeDetails',
      title: 'Credential pills & glass-screen details',
      type: 'array',
      fieldset: 'credentials',
      description: 'These are the clickable pills shown in About. Add one item for each pill; its description and details appear in the glass screen.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'badgeDetail',
          icon: TagIcon,
          fields: [
            defineField({
              name: 'label',
              title: 'Pill label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'eyebrow', title: 'Small category label', type: 'string'}),
            defineField({name: 'title', title: 'Dialog title', type: 'string'}),
            defineField({
              name: 'description',
              title: 'Short description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'details',
              title: 'Dialog details',
              type: 'text',
              rows: 5,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'eyebrow'},
          },
        }),
      ],
    }),
    defineField({
      name: 'affiliationsLabel',
      title: 'Affiliations label',
      type: 'string',
      fieldset: 'affiliations',
      description: 'The small heading above the societies, e.g. "Member of".',
    }),
    defineField({
      name: 'affiliations',
      title: 'Professional affiliations',
      type: 'array',
      fieldset: 'affiliations',
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
    prepare: () => ({title: 'About / Professional Profile'}),
  },
})
