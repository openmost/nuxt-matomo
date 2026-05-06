import { defineNuxtPlugin, useDataLayerPush, useRouter } from '#imports'

// We can't read the new title synchronously after navigation: unhead /
// useSeoMeta flushes head updates on its own scheduler, which can run after
// Vue's `nextTick`. To guarantee we send the destination page's title, we
// snapshot the title at the *start* of navigation, then either fire as soon
// as `<title>` mutates, or fall back to a short timer for same-title routes.
const TITLE_WAIT_MS = 500

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  const router = useRouter()
  let referrer = ''
  let titleBeforeNav = ''

  router.beforeEach(() => {
    titleBeforeNav = document.title
  })

  router.afterEach((_to, from) => {
    referrer = from.fullPath
  })

  nuxtApp.hook('page:finish', () => {
    const page_url = router.currentRoute.value.fullPath
    const captured = { page_url, referrer_url: referrer }

    const send = () => {
      useDataLayerPush({
        event: 'page_view',
        page_url: captured.page_url,
        referrer_url: captured.referrer_url,
        page_title: document.title,
      })
    }

    // If useSeoMeta already updated the title, send immediately.
    if (document.title !== titleBeforeNav) {
      send()
      return
    }

    // Otherwise wait for the <title> element to mutate. The fallback timer
    // covers same-title navigations and pages that don't call useSeoMeta.
    const titleEl = document.querySelector('title')
    if (!titleEl) {
      send()
      return
    }

    let done = false
    const finish = () => {
      if (done) return
      done = true
      observer.disconnect()
      clearTimeout(fallback)
      send()
    }
    const observer = new MutationObserver(finish)
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true })
    const fallback = window.setTimeout(finish, TITLE_WAIT_MS)
  })
})
