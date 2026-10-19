declare global {
  interface Window {
    _paq: unknown[]
  }
}

/**
 * Queue a command for the Matomo tracker loaded by your Tag Manager container.
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */
export function pushToPaq(command: unknown[]) {
  if (!import.meta.client) return

  window._paq = window._paq || []
  window._paq.push(command)
}
