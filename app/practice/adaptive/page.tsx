"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Clock, Flag, HelpCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  type AdaptiveQuestion,
  type AdaptiveTestState,
  type DifficultyLevel,
  initializeAdaptiveTest,
  updateTestState,
  selectNextQuestion,
  calculateFinalScore,
} from "@/lib/cat-algorithm"
import { adaptiveQuestions } from "@/data/adaptive-questions"

export default function AdaptiveTestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [testState, setTestState] = useState<AdaptiveTestState>(initializeAdaptiveTest())
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [totalQuestions] = useState(15) // Set the total number of questions for the test

  // Initialize test and get first question
  useEffect(() => {
    const firstQuestion = selectNextQuestion(adaptiveQuestions, [], testState.currentDifficulty)
    setCurrentQuestion(firstQuestion)
  }, [])

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || testCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, testCompleted])

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && !testCompleted) {
      handleSubmitTest()
    }
  }, [timeLeft, testCompleted])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Get badge color based on difficulty
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return ""
    }
  }

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value)
  }

  const handleNextQuestion = () => {
    if (!currentQuestion) return

    // Check if answer is correct
    const isCorrect = userAnswer === currentQuestion.correctAnswer

    // Update test state
    const newState = updateTestState(testState, currentQuestion.id, userAnswer, isCorrect, currentQuestion.difficulty)

    setTestState(newState)

    // Check if we've reached the total number of questions
    if (newState.currentQuestionIndex >= totalQuestions) {
      handleSubmitTest()
      return
    }

    // Get next question based on updated difficulty
    const answeredQuestionIds = newState.answeredQuestions.map((q) => q.questionId)
    const nextQuestion = selectNextQuestion(adaptiveQuestions, answeredQuestionIds, newState.currentDifficulty)

    // If no more questions available, end the test
    if (!nextQuestion) {
      handleSubmitTest()
      return
    }

    // Set the next question and reset user answer
    setCurrentQuestion(nextQuestion)
    setUserAnswer("")

    // Show toast notification about difficulty change if it changed
    if (newState.currentDifficulty !== testState.currentDifficulty) {
      toast({
        title: `Difficulty changed to ${newState.currentDifficulty}`,
        description: isCorrect
          ? "Great job! The questions will get more challenging."
          : "The difficulty has been adjusted to better match your level.",
        duration: 3000,
      })
    }
  }

  const handleSubmitTest = () => {
    setIsSubmitting(true)

    // Calculate final score
    const finalScore = calculateFinalScore(testState, totalQuestions)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setTestCompleted(true)

      toast({
        title: "Test submitted successfully!",
        description: `Your adaptive test score is ${finalScore}`,
      })

      // Store results in localStorage for the results page
      localStorage.setItem(
        "adaptiveTestResults",
        JSON.stringify({
          score: finalScore,
          answeredQuestions: testState.answeredQuestions,
          date: new Date().toISOString(),
        }),
      )

      // Redirect to results page
      router.push(`/results/adaptive`)
    }, 1500)
  }

  // If no question is loaded yet, show loading
  if (!currentQuestion) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading your adaptive test...</p>
        </div>
      </div>
    )
  }

  const progress = (testState.currentQuestionIndex / totalQuestions) * 100

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Adaptive GMAT Practice Test</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={`font-mono ${timeLeft < 300 ? "text-destructive font-bold" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Badge className={`${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About Adaptive Testing</DialogTitle>
                <DialogDescription>
                  <div className="space-y-4 mt-2">
                    <p>
                      This is a Computer Adaptive Test (CAT), similar to the actual GMAT exam. The difficulty of
                      questions will adjust based on your performance:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>If you answer questions correctly, the difficulty will increase.</li>
                      <li>If you answer questions incorrectly, the difficulty will decrease.</li>
                      <li>
                        Your score is determined not just by how many questions you get right, but also by the
                        difficulty level of the questions you answer.
                      </li>
                    </ul>
                    <div className="flex items-center gap-2 mt-4">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <p className="text-sm font-medium">
                        Unlike the real GMAT, you can review your answers before submitting in this practice test.
                      </p>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>
            Question {testState.currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {currentQuestion.type === "image-based" && (
                  <div className="mb-4">
                    <img
                      src={currentQuestion.imageUrl || "/placeholder.svg"}
                      alt="Question visual"
                      className="mx-auto rounded-md"
                    />
                  </div>
                )}

                <div className="text-lg font-medium">{currentQuestion.text}</div>

                {(currentQuestion.type === "multiple-choice" || currentQuestion.type === "data-sufficiency") && (
                  <RadioGroup value={userAnswer} onValueChange={handleAnswerChange} className="space-y-3">
                    {currentQuestion.options?.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent"
                      >
                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                        <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === "open-question" && (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="min-h-[150px]"
                  />
                )}

                <div className="flex justify-end pt-4">
                  <Button onClick={handleNextQuestion} disabled={!userAnswer} className="gap-2">
                    {testState.currentQuestionIndex >= totalQuestions - 1 ? (
                      <>
                        Submit Test
                        <Flag className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next Question
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-8">
        <Button variant="destructive" onClick={handleSubmitTest} disabled={isSubmitting}>
          <Flag className="mr-2 h-4 w-4" />
          {isSubmitting ? "Submitting..." : "End Test Early"}
        </Button>
      </div>
    </div>
  )
}
