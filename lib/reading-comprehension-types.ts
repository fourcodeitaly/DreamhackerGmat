import type { DifficultyLevel } from "./cat-algorithm"

export interface ReadingComprehensionOption {
  id: string
  text: string
}

export interface ReadingComprehensionQuestion {
  id: string
  text: string
  options: ReadingComprehensionOption[]
  correctAnswer: string
  explanation: string
  difficulty: DifficultyLevel
}

export interface ReadingComprehensionPassage {
  id: string
  title: string
  content: string
  questions: ReadingComprehensionQuestion[]
  difficulty: DifficultyLevel
}

export interface ReadingComprehensionTest {
  id: string
  title: string
  description: string
  timeLimit: number // in seconds
  passages: ReadingComprehensionPassage[]
}
