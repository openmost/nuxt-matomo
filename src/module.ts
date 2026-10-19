import { addImports, addImportsDir, addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import { defu } from 'defu'
import { MatomoTagManagerOptions } from './runtime/registry/schema'

export type MatomoTrigger = 'onNuxtReady' | 'client' | 'manual'

export interface ModuleOptions {
  /**
   * Matomo URL (e.g. https://matomo.example.com or https://your.matomo.cloud).
   * Env: `NUXT_PUBLIC_MATOMO_HOST`.
   */
  host?: string
  /**
   * Matomo Tag Manager container id.
   * Env: `NUXT_PUBLIC_MATOMO_CONTAINER_ID`.
   */
  containerId?: string
  /**
   * When the container is loaded, using Nuxt Scripts triggers:
   * - `'onNuxtReady'` *(default)*: once the app is hydrated and idle, best for Core Web Vitals.
   * - `'client'`: as soon as possible on the client.
   * - `'manual'`: never on its own. Call `useScriptMatomoTagManager().load()`,
   *   e.g. once the visitor accepts your cookie banner.
   * Env: `NUXT_PUBLIC_MATOMO_TRIGGER`.
   */
  trigger?: MatomoTrigger
  /**
   * Name of the global array `useDataLayerPush` writes to.
   * Defaults to `'dataLayer'` (the GTM-style queue Matomo Tag Manager
   * picks up when "Synchronize with GTM Data Layer events" is enabled).
   * Set to `'_mtm'` to push directly into Matomo's own queue.
   * Env: `NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME`.
   */
  dataLayerName?: string
  /**
   * Push a `page_view` event to the data layer on every page, with the
   * resolved URL, referrer and title.
   * @default true
   */
  pageViewEvent?: boolean
}

export interface MatomoPublicRuntimeConfig {
  host?: string
  containerId?: string
  trigger?: MatomoTrigger
  dataLayerName?: string
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    matomo?: MatomoPublicRuntimeConfig
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@openmost/nuxt-matomo',
    configKey: 'matomo',
    compatibility: {
      nuxt: '>=4.1.0',
    },
  },
  moduleDependencies: {
    '@nuxt/scripts': {
      version: '>=1.3.12',
    },
  },
  defaults: {
    trigger: 'onNuxtReady',
    dataLayerName: 'dataLayer',
    pageViewEvent: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const logger = useLogger('nuxt-matomo')

    // Seed runtimeConfig.public.matomo with module options. `defu` keeps any
    // value already set in nuxt.config, and NUXT_PUBLIC_MATOMO_* env vars
    // override both at runtime.
    const publicConfig = nuxt.options.runtimeConfig.public
    const matomo = defu(publicConfig.matomo, {
      host: options.host || '',
      containerId: options.containerId || '',
      trigger: options.trigger,
      dataLayerName: options.dataLayerName,
    }) as MatomoPublicRuntimeConfig
    publicConfig.matomo = matomo

    if (!nuxt.options._prepare && (!matomo.host || !matomo.containerId)) {
      logger.warn(
        'Matomo `host` and/or `containerId` are not configured: the Tag Manager container will not be loaded. '
        + 'Set them via `matomo: { host, containerId }` in nuxt.config or the '
        + 'NUXT_PUBLIC_MATOMO_HOST / NUXT_PUBLIC_MATOMO_CONTAINER_ID env vars.',
      )
    }

    const tagManagerImport = {
      name: 'useScriptMatomoTagManager',
      from: resolver.resolve('./runtime/registry/matomo-tag-manager'),
    }
    // Nuxt Scripts only adds registry imports in `modules:done`, after Nuxt has
    // generated its imports, so register the composable ourselves.
    addImports(tagManagerImport)

    // List Matomo Tag Manager in the Nuxt Scripts registry (Nuxt DevTools).
    nuxt.hook('scripts:registry', (registry) => {
      registry.push({
        registryKey: 'matomoTagManager',
        label: 'Matomo Tag Manager',
        category: 'tag-manager',
        schema: MatomoTagManagerOptions,
        import: tagManagerImport,
      })
    })

    addPlugin(resolver.resolve('./runtime/plugins/matomo-tag-manager.client'))
    if (options.pageViewEvent)
      addPlugin(resolver.resolve('./runtime/plugins/page-view.client'))

    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
