import { minLength, object, optional, pipe, string, url } from 'valibot'

export const MatomoTagManagerOptions = object({
  /**
   * URL of your Matomo instance.
   * Matomo Cloud URLs (`https://<name>.matomo.cloud`) are automatically served from `cdn.matomo.cloud`.
   * @example 'https://matomo.example.com'
   */
  host: pipe(string(), url()),
  /**
   * Matomo Tag Manager container id (Administration → Tag Manager → Install code).
   * @example 'aBcD1234'
   */
  containerId: pipe(string(), minLength(1)),
  /**
   * Override the container script URL, e.g. to serve it from your own CDN.
   */
  src: optional(string()),
})
