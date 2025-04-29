// Difficulty levels for questions
export type DifficultyLevel = "easy" | "medium" | "hard"

// Question types
export type QuestionType =
  | "multiple-choice"
  | "data-sufficiency"
  | "open-question"
  | "image-based"
  | "reading-comprehension"

// Question section
export type QuestionSection = "Quantitative" | "Verbal" | "Data Insights" | "Reading Comprehension"

// Question interface with difficulty property
export interface AdaptiveQuestion {
  id: string
  text: string
  type: QuestionType
  options?: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
  difficulty: DifficultyLevel
  section: QuestionSection
  imageUrl?: string
  passageId?: string // Reference to a passage for reading comprehension questions
}

// Reading passage interface
export interface ReadingPassage {
  id: string
  title: string
  content: string
  difficulty: DifficultyLevel
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
    section: QuestionSection
  }[]
  consecutiveCorrect: number
  consecutiveIncorrect: number
  currentPassageId?: string // Track the current passage being read
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
  section: QuestionSection,
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
    answeredQuestions: [...state.answeredQuestions, { questionId, userAnswer, isCorrect, difficulty, section }],
    consecutiveCorrect,
    consecutiveIncorrect,
    currentPassageId: state.currentPassageId,
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

// Calculate section scores
export function calculateSectionScore(state: AdaptiveTestState, section: QuestionSection): number {
  const sectionQuestions = state.answeredQuestions.filter((q) => q.section === section)

  if (sectionQuestions.length === 0) return 0

  // Calculate raw score for the section
  const rawScore = sectionQuestions.reduce((score, q) => {
    if (q.isCorrect) {
      return score + (q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3)
    }
    return score
  }, 0)

  // Scale to section score range (0-60 for most GMAT sections)
  const maxPossibleScore = sectionQuestions.length * 3
  const scorePercentage = rawScore / maxPossibleScore

  return Math.round(scorePercentage * 60)
}

// Select the next question based on current difficulty
export function selectNextQuestion(
  questions: AdaptiveQuestion[],
  passages: ReadingPassage[],
  answeredQuestionIds: string[],
  difficulty: DifficultyLevel,
  currentSection?: QuestionSection,
  currentPassageId?: string,
): { question: AdaptiveQuestion | null; passage?: ReadingPassage } {
  // Filter questions by difficulty and exclude already answered questions
  let availableQuestions = questions.filter((q) => q.difficulty === difficulty && !answeredQuestionIds.includes(q.id))

  // If a section is specified, filter by section
  if (currentSection) {
    availableQuestions = availableQuestions.filter((q) => q.section === currentSection)
  }

  // If we're in reading comprehension mode and have a current passage
  if (currentSection === "Reading Comprehension" && currentPassageId) {
    // Filter questions for the current passage
    const passageQuestions = availableQuestions.filter((q) => q.passageId === currentPassageId)

    // If there are still questions for this passage, return one
    if (passageQuestions.length > 0) {
      const question = passageQuestions[Math.floor(Math.random() * passageQuestions.length)]
      const passage = passages.find((p) => p.id === currentPassageId)
      return { question, passage: passage }
    }

    // Otherwise, we need a new passage
    const availablePassages = passages.filter(
      (p) => p.difficulty === difficulty && availableQuestions.some((q) => q.passageId === p.id),
    )

    if (availablePassages.length > 0) {
      const newPassage = availablePassages[Math.floor(Math.random() * availablePassages.length)]
      const passageQuestion = availableQuestions.find((q) => q.passageId === newPassage.id)
      return { question: passageQuestion || null, passage: newPassage }
    }
  }

  // For non-reading comprehension questions or if no reading questions are available
  if (availableQuestions.length === 0) {
    if (difficulty === "medium") {
      // Try easy or hard
      const easyQuestions = questions.filter(
        (q) =>
          q.difficulty === "easy" &&
          !answeredQuestionIds.includes(q.id) &&
          (!currentSection || q.section === currentSection),
      )
      const hardQuestions = questions.filter(
        (q) =>
          q.difficulty === "hard" &&
          !answeredQuestionIds.includes(q.id) &&
          (!currentSection || q.section === currentSection),
      )

      if (easyQuestions.length > 0) {
        const question = easyQuestions[Math.floor(Math.random() * easyQuestions.length)]
        if (question.passageId) {
          const passage = passages.find((p) => p.id === question.passageId)
          return { question, passage }
        }
        return { question }
      }

      if (hardQuestions.length > 0) {
        const question = hardQuestions[Math.floor(Math.random() * hardQuestions.length)]
        if (question.passageId) {
          const passage = passages.find((p) => p.id === question.passageId)
          return { question, passage }
        }
        return { question }
      }
    } else if (difficulty === "hard" || difficulty === "easy") {
      // Try medium
      const mediumQuestions = questions.filter(
        (q) =>
          q.difficulty === "medium" &&
          !answeredQuestionIds.includes(q.id) &&
          (!currentSection || q.section === currentSection),
      )

      if (mediumQuestions.length > 0) {
        const question = mediumQuestions[Math.floor(Math.random() * mediumQuestions.length)]
        if (question.passageId) {
          const passage = passages.find((p) => p.id === question.passageId)
          return { question, passage }
        }
        return { question }
      }
    }

    // If still no questions, return null
    return { question: null }
  }

  // Return a random question from available questions
  const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]

  // If it's a reading comprehension question, also return the passage
  if (question.passageId) {
    const passage = passages.find((p) => p.id === question.passageId)
    return { question, passage }
  }

  return { question }
}
