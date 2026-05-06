import type { MatomoPublicRuntimeConfig } from '../../src/module'

interface RuntimeConfigStub {
  public: {
    matomo: MatomoPublicRuntimeConfig
  }
}

const stub: RuntimeConfigStub = {
  public: {
    matomo: {
      dataLayerName: 'dataLayer',
    },
  },
}

export function useRuntimeConfig(): RuntimeConfigStub {
  return stub
}

export function __setRuntimeConfigMatomo(value: MatomoPublicRuntimeConfig) {
  stub.public.matomo = value
}

export function __resetRuntimeConfigMatomo() {
  stub.public.matomo = { dataLayerName: 'dataLayer' }
}
