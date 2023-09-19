export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: {enabled: true},
  runtimeConfig: {
    matomo: {
      host: process.env.NUXT_MATOMO_HOST,
      idSite: process.env.NUXT_MATOMO_ID_SITE,
      idContainer: process.env.NUXT_MATOMO_ID_CONTAINER,
    }
  }
})
