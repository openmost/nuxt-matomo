import {defineNuxtModule, addPlugin, createResolver} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  host?: string
  idSite?: number
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
    host: 'https://demo.matomo.cloud',
    idSite: 1,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
