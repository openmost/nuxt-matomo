import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((NuxtApp) => {
  if (import.meta.client) {
    NuxtApp.$router.afterEach((to, from) => {
      useDataLayerPush({
        event: 'page_view',
        page_url: to.fullPath,
        referrer_url: from.fullPath,
      })
    })
  }
})
