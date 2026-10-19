import { defineNuxtPlugin, useScriptEventPage } from '#imports'
import { useDataLayerPush } from '../composables/useDataLayerPush'

export default defineNuxtPlugin({
  name: 'nuxt-matomo:page-view',
  setup() {
    let referrer = ''

    // `useScriptEventPage` fires once the destination page has rendered and its
    // `<title>` has been flushed by unhead, so `page_title` is always accurate.
    useScriptEventPage(({ path, title }) => {
      useDataLayerPush({
        event: 'page_view',
        page_url: path,
        referrer_url: referrer,
        page_title: title,
      })
      referrer = path
    })
  },
})
