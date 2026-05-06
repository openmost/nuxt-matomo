import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDataLayerPush } from '../src/runtime/composables/useDataLayerPush'
import { useMatomoCustomDimension } from '../src/runtime/composables/useMatomoCustomDimension'
import { useMatomoCustomVariable } from '../src/runtime/composables/useMatomoCustomVariable'
import { useMatomoEvent } from '../src/runtime/composables/useMatomoEvent'
import { useMatomoGoal } from '../src/runtime/composables/useMatomoGoal'
import { useMatomoSearch } from '../src/runtime/composables/useMatomoSearch'
import { __resetRuntimeConfigMatomo, __setRuntimeConfigMatomo } from './mocks/imports'

declare global {
  interface Window {
    _paq?: unknown[]
    dataLayer?: unknown[]
  }
}

// The Nuxt module exposes composables via `addImportsDir`, which only registers
// *named* exports. Switching any of these back to `export default` will break
// `#imports` resolution for downstream apps (regression from GitHub issue #3).
describe('composables are exported as named exports', () => {
  it.each([
    ['useDataLayerPush', useDataLayerPush],
    ['useMatomoEvent', useMatomoEvent],
    ['useMatomoGoal', useMatomoGoal],
    ['useMatomoCustomDimension', useMatomoCustomDimension],
    ['useMatomoCustomVariable', useMatomoCustomVariable],
    ['useMatomoSearch', useMatomoSearch],
  ])('exports %s as a named function', (name, fn) => {
    expect(typeof fn).toBe('function')
    expect(fn.name).toBe(name)
  })
})

describe('composables push the expected payloads', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {} as Window)
    __resetRuntimeConfigMatomo()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('useDataLayerPush', () => {
    it('pushes the payload to window.dataLayer by default', () => {
      useDataLayerPush({ event: 'page_view', page_url: '/home' })
      expect(window.dataLayer).toEqual([{ event: 'page_view', page_url: '/home' }])
    })

    it('appends to an existing dataLayer rather than replacing it', () => {
      window.dataLayer = [{ event: 'existing' }]
      useDataLayerPush({ event: 'next' })
      expect(window.dataLayer).toEqual([{ event: 'existing' }, { event: 'next' }])
    })

    it('respects a custom dataLayerName from runtime config', () => {
      __setRuntimeConfigMatomo({ dataLayerName: '_mtm' })
      useDataLayerPush({ event: 'page_view' })
      expect((window as unknown as { _mtm?: unknown[] })._mtm).toEqual([
        { event: 'page_view' },
      ])
      expect(window.dataLayer).toBeUndefined()
    })

    it('falls back to dataLayer when the runtime config is empty', () => {
      __setRuntimeConfigMatomo({})
      useDataLayerPush({ event: 'page_view' })
      expect(window.dataLayer).toEqual([{ event: 'page_view' }])
    })
  })

  describe('useMatomoEvent', () => {
    it('pushes a trackEvent tuple with all arguments', () => {
      useMatomoEvent('Category', 'Action', 'Name', 42, { 1: 'value' })
      expect(window._paq).toEqual([
        ['trackEvent', 'Category', 'Action', 'Name', 42, { 1: 'value' }],
      ])
    })

    it('uses sane defaults for optional arguments', () => {
      useMatomoEvent('Category', 'Action')
      expect(window._paq).toEqual([
        ['trackEvent', 'Category', 'Action', '', undefined, {}],
      ])
    })
  })

  describe('useMatomoGoal', () => {
    it('pushes a trackGoal tuple', () => {
      useMatomoGoal(7)
      expect(window._paq).toEqual([['trackGoal', 7]])
    })
  })

  describe('useMatomoCustomDimension', () => {
    it('pushes a setCustomDimension tuple', () => {
      useMatomoCustomDimension(3, 'premium')
      expect(window._paq).toEqual([['setCustomDimension', 3, 'premium']])
    })
  })

  describe('useMatomoCustomVariable', () => {
    it('pushes a setCustomVariable tuple with a default page scope', () => {
      useMatomoCustomVariable(1, 'plan', 'pro')
      expect(window._paq).toEqual([['setCustomVariable', 1, 'plan', 'pro', 'page']])
    })

    it('forwards a custom scope', () => {
      useMatomoCustomVariable(1, 'plan', 'pro', 'visit')
      expect(window._paq).toEqual([['setCustomVariable', 1, 'plan', 'pro', 'visit']])
    })
  })

  describe('useMatomoSearch', () => {
    it('pushes a trackSiteSearch tuple with keyword only', () => {
      useMatomoSearch('nuxt module')
      expect(window._paq).toEqual([['trackSiteSearch', 'nuxt module', false, undefined]])
    })

    it('forwards category and result count', () => {
      useMatomoSearch('nuxt module', 'docs', 12)
      expect(window._paq).toEqual([['trackSiteSearch', 'nuxt module', 'docs', 12]])
    })
  })
})
