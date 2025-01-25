export default function useMatomoEvent(eventCategory, eventAction, eventName, eventValue = undefined, customDimensions = {}) {
  if (process.client) {
    window._paq = window._paq || []
    window._paq.push(['trackEvent', eventCategory, eventAction, eventName, eventValue, customDimensions])
  }
}
