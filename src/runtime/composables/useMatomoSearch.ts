export function useMatomoSearch(keyword: string, category: string | false = false, resultCount?: number) {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['trackSiteSearch', keyword, category, resultCount])
  }
}
