import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  runtimeConfig: {
    public: {
      matomo: {
        host: 'https://matomo.example.com',
        containerId: 'test',
      },
    },
  },
  compatibilityDate: '2026-04-07',
})
