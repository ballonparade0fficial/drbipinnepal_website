import {defineType, defineField, defineArrayMember} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {TagIcon} from '@sanity/icons/Tag'

export const expertise = defineType({
  name: 'expertise',
  title: 'Expertise / Skills',
  type: 'document',
  icon: BulbOutlineIcon,
  fieldsets: [
    {name: 'heading', title: 'Section heading', options: {collapsible: false}},
    {name: 'skillGroups', title: 'Skill groups and interactive pills', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Expertise heading',
      type: 'string',
      fieldset: 'heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'heading',
    }),
    defineField({
      name: 'groups',
      title: 'Skill groups',
      type: 'array',
      fieldset: 'skillGroups',
      description: 'Each group owns its own skills, so reordering one never affects another.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'expertiseGroup',
          fields: [
            defineField({
              name: 'title',
              title: 'Skill group name',
              type: 'string',
              description: 'e.g. Core Specialization',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tags',
              title: 'Skills',
              type: 'array',
              hidden: true,
              description: 'Legacy list retained for compatibility. Edit the individual items under Skill pills instead.',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule) => rule.min(1).unique(),
            }),
            defineField({
              name: 'tagDetails',
              title: 'Skill pills & glass-screen details',
              type: 'array',
              description: 'Add one item for each visible skill pill. Every item has its own editable glass-screen content.',
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
                    defineField({name: 'title', title: 'Glass-screen title', type: 'string'}),
                    defineField({
                      name: 'description',
                      title: 'Pill summary',
                      type: 'text',
                      rows: 3,
                    }),
                    defineField({
                      name: 'details',
                      title: 'Glass-screen details',
                      type: 'text',
                      rows: 5,
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
    prepare: () => ({title: 'Expertise / Skills'}),
  },
})
