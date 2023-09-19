import {defineNuxtModule, addPlugin, createResolver, addRouteMiddleware, addImports} from '@nuxt/kit'
import {defu} from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  host: string,
  idSite?: number,
  idContainer?: number,
  trackPageView: boolean,
  enableLinkTracking: boolean,
  enableHeartBeatTimer?: boolean,
  heartBeatTimerActiveTime?: number,
  trackAllContentImpression?: boolean,
  trackVisibleContentImpressions?: boolean,
  contentImpressionsCheckOnScroll?: boolean,
  contentImpressionInterval?: number,
  setCookieDomain?: string,
  setDomains?: any,
  setCookiePath?: string,
  setLinkClasses: string,
  setDownloadExtensions: string,
  addDownloadExtensions: string,
  removeDownloadExtensions: string,
  setDownloadClasses: string,
  setLinkTrackingTimer: true,
  setLinkTrackingTimerDelay: number
  setIgnoreClasses: string,
  requireConsent: boolean,
  requireCookieConsent: boolean,

}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-matomo',
    configKey: 'matomo',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  // The function holding your module logic, it can be asynchronous
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // 1. Set up runtime configuration
    // @ts-ignore
    const moduleOptions: ModuleOptions = defu(nuxt.options.runtimeConfig.public.matomo, options, {
      trackPageView: true,
      enableLinkTracking: true,
    })
    nuxt.options.runtimeConfig.public.matomo = moduleOptions

    // 2. Add plugins
    addPlugin(resolver.resolve("./runtime/plugins/matomo"))
    addPlugin(resolver.resolve("./runtime/plugins/matomo-tag-manager"))

    // 3. Add middleware
    addRouteMiddleware({
      name: "datalayer",
      path: resolver.resolve("./runtime/middleware/datalayer"),
      global: true
    })

    // 4. Add composables
    addImports([{name: "useMatomo", from: resolver.resolve("./runtime/composables/useMatomo")}])

  }
})
