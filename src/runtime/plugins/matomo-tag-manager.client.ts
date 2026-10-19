import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { useScriptMatomoTagManager } from '../registry/matomo-tag-manager'

export default defineNuxtPlugin({
  name: 'nuxt-matomo:tag-manager',
  setup() {
    const { host, containerId, trigger } = useRuntimeConfig().public.matomo || {}
    if (!host || !containerId)
      return

    useScriptMatomoTagManager({
      scriptOptions: { trigger: trigger || 'onNuxtReady' },
    })
  },
})
