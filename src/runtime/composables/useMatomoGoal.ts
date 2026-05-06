export function useMatomoGoal(goalId: number) {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['trackGoal', goalId])
  }
}
