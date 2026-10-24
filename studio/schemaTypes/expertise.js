import {defineType, defineField, defineArrayMember} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {TagIcon} from '@sanity/icons/Tag'

export const expertise = defineType({
  name: 'expertise',
  title: 'Expertise',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'groups',
      title: 'Skill groups',
      type: 'array',
      description: 'Each group owns its own skills, so reordering one never affects another.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'expertiseGroup',
          fields: [
            defineField({
              name: 'title',
              title: 'Group name',
              type: 'string',
              description: 'e.g. Core Specialization',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tags',
              title: 'Skills',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule) => rule.min(1).unique(),
            }),
            defineField({
              name: 'tagDetails',
              title: 'Skill details',
              type: 'array',
              description: 'Editable information shown when a skill pill is clicked.',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'tagDetail',
                  icon: TagIcon,
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Skill label',
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
          ],
          preview: {
            select: {title: 'title', tags: 'tags'},
            prepare: ({title, tags}) => ({
              title,
              subtitle: `${tags?.length ?? 0} skill${tags?.length === 1 ? '' : 's'}`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Expertise'}),
  },
})
