import {defineNuxtRouteMiddleware} from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {

    if (process.client) {
      const _paq = window._paq = window._paq || [];
      _paq.push(['setCustomUrl', to.fullPath]);
      //_paq.push(['setDocumentTitle', document.title]);

      _paq.push(['trackPageView']);
    }

  }
)
