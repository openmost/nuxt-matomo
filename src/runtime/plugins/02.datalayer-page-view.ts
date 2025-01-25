import {defineNuxtPlugin} from '#app'

export default defineNuxtPlugin((NuxtApp) => {
  if (process.client) {
    NuxtApp.$router.afterEach((to, from) => {
      useDataLayerPush({
        event: 'page_view',
        page_url: to.fullPath,
        //page_title: document.title, // NOT WORKING
        referrer_url: from.fullPath,
      })
    })
  }
})
