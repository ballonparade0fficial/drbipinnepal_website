import {defineType, defineField, defineArrayMember} from 'sanity'
import {PlayIcon} from '@sanity/icons/Play'

export const media = defineType({
  name: 'media',
  title: 'Media / Videos',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string', initialValue: 'Watch & Learn'}),
    defineField({name: 'title', title: 'Section heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 3}),
    defineField({name: 'showMoreLabel', title: 'Show more button label', type: 'string', initialValue: 'Show More Videos'}),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add a YouTube link and title. Each item becomes a video card automatically.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'video',
          fields: [
            defineField({name: 'title', title: 'Video title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
