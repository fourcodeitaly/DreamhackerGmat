"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock, Flag, BookOpen, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { mockReadingComprehensionTest } from "@/data/reading-comprehension-data"

export default function ReadingComprehensionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState("passage")

  const passages = mockReadingComprehensionTest.passages
  const currentPassage = passages[currentPassageIndex]
  const currentQuestion = currentPassage.questions[currentQuestionIndex]

  // Calculate overall progress
  const totalQuestions = passages.reduce((total, passage) => total + passage.questions.length, 0)
  const questionsAnswered = Object.keys(answers).length
  const progress = (questionsAnswered / totalQuestions) * 100

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
      [`p${currentPassageIndex}-q${currentQuestionIndex}`]: value,
    }))
  }

  const handleNextQuestion = () => {
    // If there are more questions in the current passage
    if (currentQuestionIndex < currentPassage.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setActiveTab("questions")
      return
    }

    // If there are more passages
    if (currentPassageIndex < passages.length - 1) {
      setCurrentPassageIndex((prev) => prev + 1)
      setCurrentQuestionIndex(0)
      setActiveTab("passage")
      return
    }

    // If we've reached the end, show a confirmation dialog
    toast({
      title: "All questions completed",
      description: "You've reached the end of the test. You can review your answers or submit the test.",
    })
  }

  const handlePreviousQuestion = () => {
    // If we're not at the first question of the passage
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setActiveTab("questions")
      return
    }

    // If we're at the first question but not the first passage
    if (currentPassageIndex > 0) {
      setCurrentPassageIndex((prev) => prev - 1)
      setCurrentQuestionIndex(passages[currentPassageIndex - 1].questions.length - 1)
      setActiveTab("questions")
      return
    }
  }

  const navigateToQuestion = (passageIndex: number, questionIndex: number) => {
    setCurrentPassageIndex(passageIndex)
    setCurrentQuestionIndex(questionIndex)
    setActiveTab("questions")
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
      router.push(`/results/reading-comprehension`)
    }, 1500)
  }

  const getCurrentQuestionNumber = () => {
    let questionNumber = 1

    for (let i = 0; i < currentPassageIndex; i++) {
      questionNumber += passages[i].questions.length
    }

    return questionNumber + currentQuestionIndex
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reading Comprehension Practice</h1>
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
                <DialogTitle>Reading Comprehension Instructions</DialogTitle>
                <DialogDescription>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Read each passage carefully before answering the questions.</li>
                    <li>You can switch between the passage and questions using the tabs.</li>
                    <li>
                      All questions for a passage must be based solely on what is stated or implied in the passage.
                    </li>
                    <li>You can navigate between questions using the previous and next buttons.</li>
                    <li>Use the question navigator to jump to specific questions.</li>
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
            Question {getCurrentQuestionNumber()} of {totalQuestions}
          </span>
          <span>
            Passage {currentPassageIndex + 1} of {passages.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigator */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Question Navigator</h3>
              <div className="space-y-4">
                {passages.map((passage, passageIndex) => (
                  <div key={passageIndex}>
                    <h4 className="text-sm font-medium mb-2">Passage {passageIndex + 1}</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {passage.questions.map((_, questionIndex) => {
                        const questionId = `p${passageIndex}-q${questionIndex}`
                        const isAnswered = !!answers[questionId]
                        const isActive = passageIndex === currentPassageIndex && questionIndex === currentQuestionIndex

                        return (
                          <Button
                            key={questionId}
                            variant={isActive ? "default" : isAnswered ? "outline" : "secondary"}
                            size="sm"
                            className={`w-full ${isAnswered && !isActive ? "bg-primary/10" : ""}`}
                            onClick={() => navigateToQuestion(passageIndex, questionIndex)}
                          >
                            {questionIndex + 1}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="destructive" className="w-full" onClick={handleSubmitTest} disabled={isSubmitting}>
                  <Flag className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Test"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="passage" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Passage
                  </TabsTrigger>
                  <TabsTrigger value="questions" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Questions
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="passage" className="p-6">
                    <motion.div
                      key={`passage-${currentPassageIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-bold mb-4">{currentPassage.title}</h2>
                      <div className="prose max-w-none">
                        {currentPassage.content.split("\n\n").map((paragraph, idx) => (
                          <p key={idx} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="flex justify-end mt-6">
                        <Button onClick={() => setActiveTab("questions")}>
                          Go to Questions <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="questions" className="p-6">
                    <motion.div
                      key={`question-${currentPassageIndex}-${currentQuestionIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-lg font-medium">{currentQuestion.text}</div>

                      <RadioGroup
                        value={answers[`p${currentPassageIndex}-q${currentQuestionIndex}`] || ""}
                        onValueChange={handleAnswerChange}
                        className="space-y-3"
                      >
                        {currentQuestion.options.map((option) => (
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

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          onClick={handlePreviousQuestion}
                          disabled={currentPassageIndex === 0 && currentQuestionIndex === 0}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("passage")}>
                          <BookOpen className="mr-2 h-4 w-4" /> View Passage
                        </Button>
                        <Button onClick={handleNextQuestion}>
                          Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
