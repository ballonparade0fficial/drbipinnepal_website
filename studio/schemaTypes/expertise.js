import {defineType, defineField, defineArrayMember} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'

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
