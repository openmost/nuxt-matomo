import {defineNuxtRouteMiddleware} from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {

    if (process.client) {
      var _mtm = window._mtm = window._mtm || [];
      _mtm.push({
        event: 'mtm.PageView',
        nuxtPageUrl: to.fullPath,
        nuxtPageTitle: document.title,
        nuxtPageOrigin: from.fullPath
      })
    }

  }
)
