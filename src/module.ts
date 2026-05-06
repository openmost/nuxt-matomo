import { addImportsDir, addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  /**
   * Matomo URL (e.g. https://matomo.example.com or https://your.matomo.cloud).
   * Mirrored into `runtimeConfig.public.matomo.host` (env: `NUXT_PUBLIC_MATOMO_HOST`).
   */
  host?: string
  /**
   * Matomo Tag Manager container id. Mirrored into
   * `runtimeConfig.public.matomo.containerId` (env: `NUXT_PUBLIC_MATOMO_CONTAINER_ID`).
   */
  containerId?: string
  /**
   * Name of the global array `useDataLayerPush` writes to.
   * Defaults to `'dataLayer'` (the GTM-style queue Matomo Tag Manager
   * picks up when "Synchronize with GTM Data Layer events" is enabled).
   * Set to `'_mtm'` to push directly into Matomo's own queue, or any
   * other name your container is configured to read from.
   * Env: `NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME`.
   */
  dataLayerName?: string
}

export interface MatomoPublicRuntimeConfig {
  host?: string
  containerId?: string
  dataLayerName?: string
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    matomo?: MatomoPublicRuntimeConfig
  }
}

const DEFAULT_DATA_LAYER_NAME = 'dataLayer'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-matomo',
    configKey: 'matomo',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const logger = useLogger('nuxt-matomo')

    // Seed runtimeConfig.public.matomo with module options. `defu` keeps any
    // value already set in nuxt.config or via NUXT_PUBLIC_MATOMO_* env vars,
    // so runtime overrides always win over module-time defaults.
    const publicConfig = nuxt.options.runtimeConfig.public
    const merged = defu(publicConfig.matomo, {
      host: options.host,
      containerId: options.containerId,
      dataLayerName: options.dataLayerName || DEFAULT_DATA_LAYER_NAME,
    }) as MatomoPublicRuntimeConfig
    publicConfig.matomo = merged

    if (!merged.host || !merged.containerId) {
      logger.warn(
        'Matomo `host` and/or `containerId` are not configured — the Tag Manager script will not be injected. '
        + 'Set them via `matomo: { host, containerId }` in nuxt.config, `runtimeConfig.public.matomo`, or '
        + 'the NUXT_PUBLIC_MATOMO_HOST / NUXT_PUBLIC_MATOMO_CONTAINER_ID env vars.',
      )
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/01.matomo-tag-manager'))
    addPlugin(resolver.resolve('./runtime/plugins/02.datalayer-page-view'))

    // Load all composables
    addImportsDir(resolver.resolve('runtime/composables'))
  },
})
