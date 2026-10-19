import { pushToPaq } from '../utils/paq'

export function useMatomoEvent(eventCategory = '', eventAction = '', eventName = '', eventValue: number | undefined = undefined, customDimensions: Record<string, string> = {}) {
  pushToPaq(['trackEvent', eventCategory, eventAction, eventName, eventValue, customDimensions])
}
