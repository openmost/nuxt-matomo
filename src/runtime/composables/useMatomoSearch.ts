import { pushToPaq } from '../utils/paq'

export function useMatomoSearch(keyword: string, category: string | false = false, resultCount?: number) {
  pushToPaq(['trackSiteSearch', keyword, category, resultCount])
}
