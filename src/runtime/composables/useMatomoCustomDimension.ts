export function useMatomoCustomDimension(customDimensionId: number, customDimensionValue: string) {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['setCustomDimension', customDimensionId, customDimensionValue])
  }
}
