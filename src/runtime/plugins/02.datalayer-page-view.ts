import { defineNuxtPlugin, useRouter, useDataLayerPush } from '#imports'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const router = useRouter()
    router.afterEach((to, from) => {
      useDataLayerPush({
        event: 'page_view',
        page_url: to.fullPath,
        referrer_url: from.fullPath,
      })
    })
  }
})
