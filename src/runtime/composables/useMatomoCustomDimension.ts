import { pushToPaq } from '../utils/paq'

export function useMatomoCustomDimension(customDimensionId: number, customDimensionValue: string) {
  pushToPaq(['setCustomDimension', customDimensionId, customDimensionValue])
}
