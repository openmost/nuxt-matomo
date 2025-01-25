export default function useMatomoGoal(customDimensionId, customDimensionValue) {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['setCustomDimension', customDimensionId, customDimensionValue])
  }
}
