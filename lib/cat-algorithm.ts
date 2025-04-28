// Difficulty levels for questions
export type DifficultyLevel = "easy" | "medium" | "hard"

// Question interface with difficulty property
export interface AdaptiveQuestion {
  id: string
  text: string
  type: "multiple-choice" | "data-sufficiency" | "open-question" | "image-based"
  options?: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: DifficultyLevel
  section: "Quantitative" | "Verbal" | "Data Insights"
  imageUrl?: string
}

// Interface for tracking user's current test state
export interface AdaptiveTestState {
  currentQuestionIndex: number
  currentDifficulty: DifficultyLevel
  score: number
  answeredQuestions: {
    questionId: string
    userAnswer: string
    isCorrect: boolean
    difficulty: DifficultyLevel
  }[]
  consecutiveCorrect: number
  consecutiveIncorrect: number
}

// Initialize a new adaptive test
export function initializeAdaptiveTest(): AdaptiveTestState {
  return {
    currentQuestionIndex: 0,
    currentDifficulty: "medium", // Start with medium difficulty
    score: 0,
    answeredQuestions: [],
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0,
  }
}

// Get the next question difficulty based on user performance
export function getNextQuestionDifficulty(state: AdaptiveTestState): DifficultyLevel {
  // If user answered 2 consecutive questions correctly, increase difficulty
  if (state.consecutiveCorrect >= 2) {
    return state.currentDifficulty === "easy" ? "medium" : "hard"
  }

  // If user answered 2 consecutive questions incorrectly, decrease difficulty
  if (state.consecutiveIncorrect >= 2) {
    return state.currentDifficulty === "hard" ? "medium" : "easy"
  }

  // Otherwise, maintain current difficulty
  return state.currentDifficulty
}

// Update test state after answering a question
export function updateTestState(
  state: AdaptiveTestState,
  questionId: string,
  userAnswer: string,
  isCorrect: boolean,
  difficulty: DifficultyLevel,
): AdaptiveTestState {
  // Calculate score adjustment based on difficulty and correctness
  let scoreAdjustment = 0

  if (isCorrect) {
    // Correct answers give more points for harder questions
    scoreAdjustment = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3
  } else {
    // Incorrect answers penalize more for easier questions
    scoreAdjustment = difficulty === "easy" ? -2 : difficulty === "medium" ? -1 : -0.5
  }

  // Update consecutive counters
  const consecutiveCorrect = isCorrect ? state.consecutiveCorrect + 1 : 0
  const consecutiveIncorrect = isCorrect ? 0 : state.consecutiveIncorrect + 1

  // Determine next difficulty
  const nextDifficulty = getNextQuestionDifficulty({
    ...state,
    consecutiveCorrect,
    consecutiveIncorrect,
  })

  return {
    currentQuestionIndex: state.currentQuestionIndex + 1,
    currentDifficulty: nextDifficulty,
    score: Math.max(0, state.score + scoreAdjustment), // Ensure score doesn't go below 0
    answeredQuestions: [...state.answeredQuestions, { questionId, userAnswer, isCorrect, difficulty }],
    consecutiveCorrect,
    consecutiveIncorrect,
  }
}

// Calculate final scaled score (200-800 range like GMAT)
export function calculateFinalScore(state: AdaptiveTestState, totalQuestions: number): number {
  // Base score starts at 550 (average GMAT score)
  const baseScore = 550

  // Calculate raw score percentage
  const rawScore = state.score

  // Calculate percentage of maximum possible score
  // Maximum possible score would be if all questions were hard and correct
  const maxPossibleScore = totalQuestions * 3
  const scorePercentage = rawScore / maxPossibleScore

  // Scale to GMAT range (200-800)
  // This is a simplified version of the actual GMAT algorithm
  const scaledScore = baseScore + Math.round((scorePercentage - 0.5) * 500)

  // Ensure score is within GMAT bounds
  return Math.max(200, Math.min(800, scaledScore))
}

// Select the next question based on current difficulty
export function selectNextQuestion(
  questions: AdaptiveQuestion[],
  answeredQuestionIds: string[],
  difficulty: DifficultyLevel,
): AdaptiveQuestion | null {
  // Filter questions by difficulty and exclude already answered questions
  const availableQuestions = questions.filter((q) => q.difficulty === difficulty && !answeredQuestionIds.includes(q.id))

  // If no questions available at the current difficulty, try adjacent difficulties
  if (availableQuestions.length === 0) {
    if (difficulty === "medium") {
      // Try easy or hard
      const easyQuestions = questions.filter((q) => q.difficulty === "easy" && !answeredQuestionIds.includes(q.id))
      const hardQuestions = questions.filter((q) => q.difficulty === "hard" && !answeredQuestionIds.includes(q.id))

      if (easyQuestions.length > 0) return easyQuestions[Math.floor(Math.random() * easyQuestions.length)]
      if (hardQuestions.length > 0) return hardQuestions[Math.floor(Math.random() * hardQuestions.length)]
    } else if (difficulty === "hard") {
      // Try medium
      const mediumQuestions = questions.filter((q) => q.difficulty === "medium" && !answeredQuestionIds.includes(q.id))

      if (mediumQuestions.length > 0) return mediumQuestions[Math.floor(Math.random() * mediumQuestions.length)]
    } else if (difficulty === "easy") {
      // Try medium
      const mediumQuestions = questions.filter((q) => q.difficulty === "medium" && !answeredQuestionIds.includes(q.id))

      if (mediumQuestions.length > 0) return mediumQuestions[Math.floor(Math.random() * mediumQuestions.length)]
    }

    // If still no questions, return null
    return null
  }

  // Return a random question from available questions
  return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
}
