import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'ballonparade0fficial',
  api: {
    projectId: 'qpxm2ixz',
    dataset: 'production'
  },
  deployment: {
    appId: 'mhs26up39p3j852y5q48pvu8',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
