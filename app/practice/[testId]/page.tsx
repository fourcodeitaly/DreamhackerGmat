"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock, Flag, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock questions for demonstration
const mockQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    text: "If x + y = 10 and x - y = 4, what is the value of x?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "5" },
      { id: "c", text: "7" },
      { id: "d", text: "9" },
      { id: "e", text: "11" },
    ],
    correctAnswer: "c",
    explanation: "We have two equations: x + y = 10 and x - y = 4. Adding these equations: 2x = 14, so x = 7.",
  },
  {
    id: 2,
    type: "multiple-choice",
    text: "A company's profit increased by 15% from 2020 to 2021, and then decreased by 10% from 2021 to 2022. What was the overall percentage change in profit from 2020 to 2022?",
    options: [
      { id: "a", text: "5% increase" },
      { id: "b", text: "3.5% increase" },
      { id: "c", text: "1.5% decrease" },
      { id: "d", text: "5% decrease" },
      { id: "e", text: "3.5% decrease" },
    ],
    correctAnswer: "b",
    explanation:
      "If the initial profit is P, then after a 15% increase, it becomes 1.15P. After a 10% decrease, it becomes 1.15P × 0.9 = 1.035P, which is a 3.5% increase from the original.",
  },
  {
    id: 3,
    type: "open-question",
    text: "Explain the concept of opportunity cost and provide an example of how it might influence a business decision.",
    correctAnswer:
      "Opportunity cost is the value of the next best alternative that must be forgone in order to pursue a certain action. For example, if a company decides to invest $1 million in a new factory, the opportunity cost might be the potential returns from investing that money in the stock market or using it to acquire a competitor.",
  },
  {
    id: 4,
    type: "multiple-choice",
    text: "In a survey of 200 customers, 120 preferred Product A and 100 preferred Product B. How many customers preferred both products?",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "20" },
      { id: "c", text: "80" },
      { id: "d", text: "100" },
      { id: "e", text: "120" },
    ],
    correctAnswer: "b",
    explanation:
      "Let x be the number of customers who preferred both products. Then, customers who preferred Product A only: 120 - x. Customers who preferred Product B only: 100 - x. Total customers: (120 - x) + (100 - x) + x = 200. Solving: 220 - x = 200, so x = 20.",
  },
  {
    id: 5,
    type: "image-based",
    text: "The graph below shows the relationship between the number of hours studied and test scores for a group of students. Based on the trend line, what is the approximate increase in test score for each additional hour of study?",
    imageUrl: "/placeholder.svg?height=300&width=500",
    options: [
      { id: "a", text: "2 points" },
      { id: "b", text: "5 points" },
      { id: "c", text: "8 points" },
      { id: "d", text: "10 points" },
      { id: "e", text: "15 points" },
    ],
    correctAnswer: "b",
    explanation:
      "The trend line shows that for each additional hour of study, the test score increases by approximately 5 points.",
  },
]

export default function TestPage({ params }: { params: { testId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)

  const currentQuestion = mockQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

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

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitTest = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setTestCompleted(true)

      toast({
        title: "Test submitted successfully!",
        description: "Your results are being processed.",
      })

      // Redirect to results page
      router.push(`/results/${params.testId}`)
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {params.testId.charAt(0).toUpperCase() + params.testId.slice(1).replace("-", " ")} Test
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className={`font-mono ${timeLeft < 300 ? "text-destructive font-bold" : ""}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Test Instructions</DialogTitle>
                <DialogDescription>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Read each question carefully before answering.</li>
                    <li>You can navigate between questions using the previous and next buttons.</li>
                    <li>The timer in the top right shows your remaining time.</li>
                    <li>Click "Submit Test" when you've completed all questions.</li>
                    <li>The test will be automatically submitted when the timer reaches zero.</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {mockQuestions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
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

                {currentQuestion.type === "multiple-choice" && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-3"
                  >
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
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="min-h-[150px]"
                  />
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>

                  {currentQuestionIndex < mockQuestions.length - 1 ? (
                    <Button onClick={handleNextQuestion}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="default" onClick={handleSubmitTest} disabled={isSubmitting}>
                      <Flag className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Submitting..." : "Submit Test"}
                    </Button>
                  )}
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
