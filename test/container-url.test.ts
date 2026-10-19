import { describe, expect, it } from 'vitest'
import { resolveMatomoContainerUrl } from '../src/runtime/utils/container-url'

describe('resolveMatomoContainerUrl', () => {
  it('serves self-hosted containers from <host>/js', () => {
    expect(resolveMatomoContainerUrl('https://matomo.example.com', 'abc123'))
      .toBe('https://matomo.example.com/js/container_abc123.js')
  })

  it('ignores a trailing slash on the host', () => {
    expect(resolveMatomoContainerUrl('https://matomo.example.com/', 'abc123'))
      .toBe('https://matomo.example.com/js/container_abc123.js')
  })

  it('keeps a sub-path on self-hosted instances', () => {
    expect(resolveMatomoContainerUrl('https://example.com/matomo', 'abc123'))
      .toBe('https://example.com/matomo/js/container_abc123.js')
  })

  it('serves Matomo Cloud containers from cdn.matomo.cloud', () => {
    expect(resolveMatomoContainerUrl('https://openmost.matomo.cloud', 'abc123'))
      .toBe('https://cdn.matomo.cloud/openmost.matomo.cloud/container_abc123.js')
  })

  it.each([
    [undefined, 'abc123'],
    ['https://matomo.example.com', undefined],
    ['', 'abc123'],
    ['not a url', 'abc123'],
  ])('returns undefined for invalid input (%s, %s)', (host, containerId) => {
    expect(resolveMatomoContainerUrl(host, containerId)).toBeUndefined()
  })
})
