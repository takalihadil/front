import { Challenge } from "@/lib/types/community"
import { mockChallenges as businessChallenges } from "./business"
import { fitnessChallenges } from "./fitness"
import { habitsChallenges } from "./habits"
import { spiritualChallenges } from "./spiritual"

// Combine all challenge types
export const mockChallenges: Challenge[] = [
  ...businessChallenges,
  ...fitnessChallenges,
  ...habitsChallenges,
  ...spiritualChallenges
]

// Export individual challenge sets for direct access
export {
  businessChallenges,
  fitnessChallenges,
  habitsChallenges,
  spiritualChallenges
}