import {defineField} from 'sanity'

/**
 * Icon keys must stay in sync with frontend/src/data/iconMap.js.
 * If you add an option here, add the matching key there too — otherwise the
 * site falls back to its positional default rather than the chosen icon.
 */
export const ICON_OPTIONS = [
  {title: 'Flask (research, lab)', value: 'flask'},
  {title: 'Vial (samples, testing)', value: 'vial'},
  {title: 'Shield (safety, screening)', value: 'shield'},
  {title: 'Activity (monitoring, vigilance)', value: 'activity'},
  {title: 'Helping hands (community, service)', value: 'hands-helping'},
  {title: 'Heartbeat (clinical care)', value: 'heartbeat'},
  {title: 'Trending up (growth, progress)', value: 'trending-up'},
  {title: 'Globe (international, collaboration)', value: 'globe'},
]

export const iconField = defineField({
  name: 'icon',
  title: 'Icon',
  type: 'string',
  description:
    'Optional. Leave blank and the site picks one automatically — set it to choose a specific icon.',
  options: {list: ICON_OPTIONS},
})
