import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Ensure that plugins run only in client side
  if (import.meta.client) {
    const config = useRuntimeConfig()
    let matomoHost = config.public.matomo.host
    const matomoContainerId = config.public.matomo.containerId

    if (matomoHost.includes('matomo.cloud')) {
      const domain = new URL(matomoHost).hostname
      matomoHost = `https://cdn.matomo.cloud/${domain}`
    }

    if (matomoHost && matomoContainerId) {
      // Generate container URL
      const url = `${matomoHost}/js/container_${matomoContainerId}.js`

      // Default Matomo Tag Manager snippet
      const _mtm = window._mtm = window._mtm || []
      _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
      (function () {
        const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0]
        g.async = true
        g.src = url
        s.parentNode.insertBefore(g, s)
      })()
    }
  }
})
