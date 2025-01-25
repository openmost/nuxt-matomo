export default defineNuxtConfig({
  modules: ['../src/module'],
  runtimeConfig: {
    public: {
      matomo: {
        host: 'https://matomo.example.com',
        containerId: 'xxxxxxxx',
      },
    },
  },
  devtools: {enabled: true},
  compatibilityDate: '2025-01-24',
})
