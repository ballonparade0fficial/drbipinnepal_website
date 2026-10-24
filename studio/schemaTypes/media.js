import {defineType, defineField, defineArrayMember} from 'sanity'
import {PlayIcon} from '@sanity/icons/Play'

export const media = defineType({
  name: 'media',
  title: 'Media / YouTube Videos',
  type: 'document',
  icon: PlayIcon,
  fieldsets: [
    {name: 'heading', title: 'Media section', options: {collapsible: false}},
    {name: 'items', title: 'YouTube video entries', options: {collapsible: true}},
  ],
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above heading', type: 'string', fieldset: 'heading', initialValue: 'Watch & Learn'}),
    defineField({name: 'title', title: 'Media section heading', type: 'string', fieldset: 'heading', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introductory text', type: 'text', rows: 3, fieldset: 'heading'}),
    defineField({name: 'showMoreLabel', title: 'Home-page button label', type: 'string', fieldset: 'heading', initialValue: 'Show More Videos'}),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      fieldset: 'items',
      description: 'Add one YouTube URL and title per item. The first six appear on Home; all entries appear on the Media page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'video',
          fields: [
            defineField({name: 'title', title: 'Editable video title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'YouTube video URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'url'},
            prepare: ({title, subtitle}) => ({
              title: title || 'Add video title',
              subtitle: subtitle || 'Add YouTube video URL',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
