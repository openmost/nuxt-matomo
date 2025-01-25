export default function useMatomoEvent(eventCategory, eventAction, eventName, eventValue = undefined, customDimensions = {}) {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['trackEvent', eventCategory, eventAction, eventName, eventValue, customDimensions])
  }
}
