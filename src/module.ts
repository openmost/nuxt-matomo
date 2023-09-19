import {defineNuxtModule, addPlugin, createResolver} from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  host: string,
  idSite?: number,
  idContainer?: string,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-matomo',
    configKey: 'matomo',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    host: process.env.NUXT_MATOMO_HOST,
    idSite: process.env.NUXT_MATOMO_ID_SITE,
    idContainer: process.env.NUXT_MATOMO_ID_CONTAINER,
  },
  // Shorthand sugar to register Nuxt hooks
  hooks: {},
  // The function holding your module logic, it can be asynchronous
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const moduleOptions: ModuleOptions = defu(nuxt.options.runtimeConfig.public.matomo, options)

    nuxt.options.runtimeConfig.public.matomo = moduleOptions

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
