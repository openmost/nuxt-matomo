import type { RegistryScriptInput, UseScriptContext } from '#nuxt-scripts/types'
import { useRegistryScript } from '#nuxt-scripts/utils'
import { useNuxtApp, useRuntimeConfig } from '#imports'
import { resolveMatomoContainerUrl } from '../utils/container-url'
import { MatomoTagManagerOptions } from './schema'

export { MatomoTagManagerOptions, resolveMatomoContainerUrl }

export type MatomoTagManagerInput = RegistryScriptInput<typeof MatomoTagManagerOptions, false>

export type MatomoTagManagerEntry = Record<string, unknown>

export interface MatomoTagManagerApi {
  _mtm: {
    push: (...entries: MatomoTagManagerEntry[]) => number
  }
}

declare global {
  interface Window {
    _mtm: MatomoTagManagerEntry[]
  }
}

/**
 * Load a Matomo Tag Manager container through Nuxt Scripts.
 *
 * Options default to the `matomo` module config, so calling it without
 * arguments returns the container registered by the module.
 */
export function useScriptMatomoTagManager<T extends MatomoTagManagerApi>(_options?: MatomoTagManagerInput): UseScriptContext<T> {
  const key = _options?.key || 'matomoTagManager'
  const config = useRuntimeConfig().public.matomo
  const options: MatomoTagManagerInput = {
    host: config?.host || undefined,
    containerId: config?.containerId || undefined,
    ..._options,
  }

  // Reusing an existing instance must never load it on its own: without an
  // explicit trigger, keep the one it was registered with (e.g. `manual`).
  if (_options?.scriptOptions?.trigger === undefined && useNuxtApp().$scripts?.[key])
    options.scriptOptions = { ..._options?.scriptOptions, trigger: 'manual' }

  return useRegistryScript<T, typeof MatomoTagManagerOptions>(key, (opts) => {
    const src = opts.src || resolveMatomoContainerUrl(opts.host, opts.containerId)
    return {
      scriptInput: {
        src: src || '',
      },
      schema: import.meta.dev ? MatomoTagManagerOptions : undefined,
      scriptOptions: {
        // Never inject a script without a valid container URL.
        ...(src ? {} : { trigger: 'manual' as const }),
        use() {
          return {
            _mtm: {
              push: (...entries: MatomoTagManagerEntry[]) => (window._mtm = window._mtm || []).push(...entries),
            },
          }
        },
      },
      clientInit: import.meta.server
        ? undefined
        : () => {
            // Same bootstrap as the official Matomo Tag Manager snippet.
            window._mtm = window._mtm || []
            window._mtm.push({ 'mtm.startTime': Date.now(), 'event': 'mtm.Start' })
          },
    }
  }, options) as UseScriptContext<T>
}
