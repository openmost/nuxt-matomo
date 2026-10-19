import { withBase, withoutTrailingSlash } from 'ufo'

/**
 * Resolve the container URL the same way the official Matomo install snippet does.
 */
export function resolveMatomoContainerUrl(host?: string, containerId?: string): string | undefined {
  if (!host || !containerId || !URL.canParse(host))
    return undefined
  const { hostname } = new URL(host)
  const base = hostname.endsWith('.matomo.cloud')
    ? `https://cdn.matomo.cloud/${hostname}`
    : `${withoutTrailingSlash(host)}/js`
  return withBase(`container_${containerId}.js`, base)
}
