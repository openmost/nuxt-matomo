import { pushToPaq } from '../utils/paq'

export function useMatomoGoal(goalId: number, revenue?: number) {
  pushToPaq(revenue === undefined ? ['trackGoal', goalId] : ['trackGoal', goalId, revenue])
}
