export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2026-10-01',
  matomo: {
    // Serves the fake container from `public/js/container_playground.js`.
    // Point these to your own instance via NUXT_PUBLIC_MATOMO_HOST / NUXT_PUBLIC_MATOMO_CONTAINER_ID.
    host: 'http://localhost:3000',
    containerId: 'playground',
  },
})
