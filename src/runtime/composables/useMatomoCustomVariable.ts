export function useMatomoCustomVariable(index: number, name: string, value: string, scope: 'page' | 'visit' = 'page') {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['setCustomVariable', index, name, value, scope])
  }
}
