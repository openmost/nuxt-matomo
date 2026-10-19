import { pushToPaq } from '../utils/paq'

export function useMatomoCustomVariable(index: number, name: string, value: string, scope: 'page' | 'visit' = 'page') {
  pushToPaq(['setCustomVariable', index, name, value, scope])
}
