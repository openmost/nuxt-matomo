export default function useMatomoGoal(customDimensionId, customDimensionValue) {
  if (process.client) {
    window._paq = window._paq || []
    window._paq.push(['setCustomDimension', customDimensionId, customDimensionValue])
  }
}
