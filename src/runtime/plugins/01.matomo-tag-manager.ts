import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

interface MatomoRuntimeConfig {
  host: string
  containerId: string
}

declare global {
  interface Window {
    _mtm?: Array<Record<string, unknown>>
  }
}

export default defineNuxtPlugin(() => {
  // Ensure that plugins run only in client side
  if (import.meta.client) {
    const config = useRuntimeConfig()
    const matomo = config.public.matomo as MatomoRuntimeConfig | undefined
    let matomoHost = matomo?.host
    const matomoContainerId = matomo?.containerId

    if (!matomoHost || !matomoContainerId) {
      return
    }

    if (matomoHost.includes('matomo.cloud')) {
      const domain = new URL(matomoHost).hostname
      matomoHost = `https://cdn.matomo.cloud/${domain}`
    }
    else {
      matomoHost = matomoHost + '/js'
    }

    // Generate container URL
    const url = `${matomoHost}/container_${matomoContainerId}.js`

    // Default Matomo Tag Manager snippet
    const _mtm = window._mtm = window._mtm || []
    _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
    (function () {
      const d = document
      const g = d.createElement('script')
      const s = d.getElementsByTagName('script')[0]
      g.async = true
      g.src = url
      if (s?.parentNode) {
        s.parentNode.insertBefore(g, s)
      }
      else {
        d.head.appendChild(g)
      }
    })()
  }
})
