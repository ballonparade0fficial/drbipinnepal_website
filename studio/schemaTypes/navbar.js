import {defineType, defineField, defineArrayMember} from 'sanity'
import {MenuIcon} from '@sanity/icons/Menu'

/**
 * Section ids are structural — they must match the section anchors in the site
 * code, so they're a fixed list rather than free text. Renaming a label is safe;
 * inventing a new id would produce a nav link that scrolls nowhere.
 */
const SECTION_IDS = [
  {title: 'Home (hero)', value: 'hero'},
  {title: 'About', value: 'about'},
  {title: 'Achievements', value: 'achievements'},
  {title: 'Research', value: 'research'},
  {title: 'Expertise', value: 'expertise'},
  {title: 'Impact', value: 'impact'},
  {title: 'Contact', value: 'contact'},
]

export const navbar = defineType({
  name: 'navbar',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand name',
      type: 'string',
      description: 'Shown at the top left of the navigation bar.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Menu links',
      type: 'array',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The wording shown in the menu.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'id',
              title: 'Links to section',
              type: 'string',
              options: {list: SECTION_IDS},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'id'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Navigation'}),
  },
})
