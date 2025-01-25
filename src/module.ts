import {defineNuxtModule, addPlugin, createResolver, addImportsDir} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-matomo',
    configKey: 'matomo',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/01.matomo-tag-manager'))
    addPlugin(resolver.resolve('./runtime/plugins/02.datalayer-page-view'))

    // Load all composables
    addImportsDir(resolver.resolve('runtime/composables'))
  },
})
