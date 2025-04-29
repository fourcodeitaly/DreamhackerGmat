"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock, Flag, HelpCircle, BookOpen } from "lucide-react"
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

// Mock data for the full-length test
const mockFullTest = {
  sections: [
    {
      id: "quant",
      title: "Quantitative Reasoning",
      timeLimit: 62 * 60, // 62 minutes in seconds
      questions: Array(31)
        .fill(null)
        .map((_, i) => ({
          id: `q-${i + 1}`,
          text: `Quantitative question ${i + 1}`,
          type: "multiple-choice",
          options: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
            { id: "d", text: "Option D" },
            { id: "e", text: "Option E" },
          ],
          correctAnswer: ["a", "b", "c", "d", "e"][Math.floor(Math.random() * 5)],
        })),
    },
    {
      id: "verbal",
      title: "Verbal Reasoning",
      timeLimit: 65 * 60, // 65 minutes in seconds
      questions: Array(36)
        .fill(null)
        .map((_, i) => ({
          id: `v-${i + 1}`,
          text: `Verbal question ${i + 1}`,
          type: "multiple-choice",
          options: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
            { id: "d", text: "Option D" },
            { id: "e", text: "Option E" },
          ],
          correctAnswer: ["a", "b", "c", "d", "e"][Math.floor(Math.random() * 5)],
        })),
    },
    {
      id: "reading",
      title: "Reading Comprehension",
      timeLimit: 30 * 60, // 30 minutes in seconds
      passages: [
        {
          id: "passage-1",
          title: "The Evolution of Corporate Social Responsibility",
          content: `Corporate social responsibility (CSR) has evolved significantly over the past several decades, transforming from a peripheral concern to a central business strategy for many organizations. In its earliest manifestations, CSR was often limited to philanthropic activities, with businesses making charitable donations or sponsoring community events as a form of giving back. These initiatives, while beneficial, were typically disconnected from core business operations and strategic objectives.

The 1970s marked a turning point in the conceptualization of CSR, largely due to economist Milton Friedman's influential assertion that the sole responsibility of business was to increase profits for shareholders. This perspective, while controversial, prompted important discussions about the proper role of business in society and the potential conflicts between profit maximization and social welfare.

By the 1990s, a more integrated approach to CSR began to emerge. Companies started to recognize that social and environmental issues could have material impacts on their financial performance and long-term viability. This shift was driven by several factors, including increased globalization, greater transparency enabled by information technology, and growing consumer awareness of corporate practices.`,
          questions: [
            {
              id: "rc-1-1",
              text: "According to the passage, how has corporate social responsibility evolved over time?",
              options: [
                { id: "a", text: "It has become less important to businesses over time" },
                { id: "b", text: "It has shifted from peripheral philanthropy to integrated business strategy" },
                { id: "c", text: "It has remained consistent in its implementation since the 1970s" },
                { id: "d", text: "It has become exclusively focused on environmental concerns" },
                { id: "e", text: "It has been replaced entirely by the profit maximization principle" },
              ],
              correctAnswer: "b",
            },
            {
              id: "rc-1-2",
              text: "The author mentions Milton Friedman primarily to:",
              options: [
                { id: "a", text: "Endorse his view that businesses should focus solely on profits" },
                { id: "b", text: "Criticize his influence on corporate behavior in the 1970s" },
                { id: "c", text: "Highlight a significant perspective that influenced discussions about CSR" },
                { id: "d", text: "Demonstrate how economic theories have become irrelevant to modern business" },
                { id: "e", text: "Explain why philanthropic activities decreased during that period" },
              ],
              correctAnswer: "c",
            },
          ],
        },
        {
          id: "passage-2",
          title: "Quantum Computing: Promises and Challenges",
          content: `Quantum computing represents one of the most promising and challenging frontiers in computer science today. Unlike classical computers, which process information in binary form as bits (0s and 1s), quantum computers leverage the principles of quantum mechanics to process information as quantum bits, or qubits. This fundamental difference enables quantum computers to exist in multiple states simultaneously through a phenomenon known as superposition, and to exhibit quantum entanglement, whereby qubits become interconnected in ways that have no classical analog.

These quantum properties potentially allow quantum computers to solve certain complex problems exponentially faster than even the most powerful classical supercomputers. For instance, Shor's algorithm, developed by mathematician Peter Shor in 1994, demonstrates that a sufficiently powerful quantum computer could factor large numbers exponentially faster than known classical algorithms. This capability has profound implications for cryptography, as many current encryption methods rely on the computational difficulty of factoring large numbers.`,
          questions: [
            {
              id: "rc-2-1",
              text: "What fundamental property of quantum computing distinguishes it from classical computing?",
              options: [
                { id: "a", text: "The use of silicon-based processors" },
                {
                  id: "b",
                  text: "The ability to process information as qubits that can exist in multiple states simultaneously",
                },
                { id: "c", text: "The requirement for room temperature operation" },
                { id: "d", text: "The focus on solving only cryptographic problems" },
                { id: "e", text: "The reduced need for error correction" },
              ],
              correctAnswer: "b",
            },
            {
              id: "rc-2-2",
              text: "According to the passage, Shor's algorithm is significant because it:",
              options: [
                { id: "a", text: "Was the first quantum algorithm ever developed" },
                { id: "b", text: "Proves that quantum computers are impossible to build" },
                { id: "c", text: "Shows how quantum computers could break current encryption methods" },
                { id: "d", text: "Demonstrates that classical computers are more powerful than previously thought" },
                { id: "e", text: "Establishes that quantum entanglement is not a real phenomenon" },
              ],
              correctAnswer: "c",
            },
          ],
        },
      ],
    },
    {
      id: "data",
      title: "Data Insights",
      timeLimit: 30 * 60, // 30 minutes in seconds
      questions: Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `d-${i + 1}`,
          text: `Data Insights question ${i + 1}`,
          type: "multiple-choice",
          options: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
            { id: "d", text: "Option D" },
            { id: "e", text: "Option E" },
          ],
          correctAnswer: ["a", "b", "c", "d", "e"][Math.floor(Math.random() * 5)],
        })),
    },
  ],
}

export default function FullTestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
  const [currentPassageQuestionIndex, setCurrentPassageQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(mockFullTest.sections[0].timeLimit)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sectionCompleted, setSectionCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState("questions")

  const currentSection = mockFullTest.sections[currentSectionIndex]

  // Handle reading comprehension section differently
  const isReadingSection = currentSection.id === "reading"
  const currentPassage = isReadingSection ? currentSection.passages[currentPassageIndex] : null
  const currentQuestion = isReadingSection
    ? currentPassage?.questions[currentPassageQuestionIndex]
    : currentSection.questions[currentQuestionIndex]

  // Calculate progress
  const totalQuestions = isReadingSection
    ? currentSection.passages.reduce((total, passage) => total + passage.questions.length, 0)
    : currentSection.questions.length

  const currentQuestionNumber = isReadingSection
    ? currentSection.passages
        .slice(0, currentPassageIndex)
        .reduce((total, passage) => total + passage.questions.length, 0) +
      currentPassageQuestionIndex +
      1
    : currentQuestionIndex + 1

  const progress = (currentQuestionNumber / totalQuestions) * 100

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || sectionCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, sectionCompleted])

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && !sectionCompleted) {
      handleCompleteSectionOrTest()
    }
  }, [timeLeft, sectionCompleted])

  const handleAnswerChange = (value: string) => {
    if (isReadingSection) {
      setAnswers((prev) => ({
        ...prev,
        [`${currentSection.id}-p${currentPassageIndex}-q${currentPassageQuestionIndex}`]: value,
      }))
    } else {
      setAnswers((prev) => ({
        ...prev,
        [`${currentSection.id}-q${currentQuestionIndex}`]: value,
      }))
    }
  }

  const handleNextQuestion = () => {
    if (isReadingSection) {
      // If there are more questions in the current passage
      if (currentPassageQuestionIndex < currentPassage!.questions.length - 1) {
        setCurrentPassageQuestionIndex((prev) => prev + 1)
        setActiveTab("questions")
        return
      }

      // If there are more passages
      if (currentPassageIndex < currentSection.passages.length - 1) {
        setCurrentPassageIndex((prev) => prev + 1)
        setCurrentPassageQuestionIndex(0)
        setActiveTab("passage")
        return
      }

      // If we've reached the end of all passages
      handleCompleteSectionOrTest()
      return
    }

    // For non-reading sections
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleCompleteSectionOrTest()
    }
  }

  const handlePreviousQuestion = () => {
    if (isReadingSection) {
      // If we're not at the first question of the passage
      if (currentPassageQuestionIndex > 0) {
        setCurrentPassageQuestionIndex((prev) => prev - 1)
        setActiveTab("questions")
        return
      }

      // If we're at the first question but not the first passage
      if (currentPassageIndex > 0) {
        setCurrentPassageIndex((prev) => prev - 1)
        setCurrentPassageQuestionIndex(currentSection.passages[currentPassageIndex - 1].questions.length - 1)
        setActiveTab("questions")
        return
      }
    } else {
      // For non-reading sections
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1)
      }
    }
  }

  const navigateToQuestion = (passageIndex: number, questionIndex: number) => {
    setCurrentPassageIndex(passageIndex)
    setCurrentPassageQuestionIndex(questionIndex)
    setActiveTab("questions")
  }

  const handleCompleteSectionOrTest = () => {
    setSectionCompleted(true)

    // If this is the last section, submit the test
    if (currentSectionIndex === mockFullTest.sections.length - 1) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)

        toast({
          title: "Test submitted successfully!",
          description: "Your results are being processed.",
        })

        // Redirect to results page
        router.push(`/results/full`)
      }, 1500)
    } else {
      // Otherwise, show a message about completing the section
      toast({
        title: `${currentSection.title} completed!`,
        description: "Moving to the next section.",
      })

      // Move to the next section after a short delay
      setTimeout(() => {
        setCurrentSectionIndex((prev) => prev + 1)
        setCurrentQuestionIndex(0)
        setCurrentPassageIndex(0)
        setCurrentPassageQuestionIndex(0)
        setTimeLeft(mockFullTest.sections[currentSectionIndex + 1].timeLimit)
        setSectionCompleted(false)
        setActiveTab("questions")
      }, 1500)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{currentSection.title}</h1>
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
                    <li>The timer in the top right shows your remaining time for this section.</li>
                    <li>Click "Submit Section" when you've completed all questions in this section.</li>
                    <li>The test will automatically move to the next section when the timer reaches zero.</li>
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
            Question {currentQuestionNumber} of {totalQuestions}
          </span>
          <span>
            Section {currentSectionIndex + 1} of {mockFullTest.sections.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {isReadingSection ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigator for Reading Comprehension */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Question Navigator</h3>
                <div className="space-y-4">
                  {currentSection.passages.map((passage, passageIndex) => (
                    <div key={passageIndex}>
                      <h4 className="text-sm font-medium mb-2">Passage {passageIndex + 1}</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {passage.questions.map((_, questionIndex) => {
                          const questionId = `${currentSection.id}-p${passageIndex}-q${questionIndex}`
                          const isAnswered = !!answers[questionId]
                          const isActive =
                            passageIndex === currentPassageIndex && questionIndex === currentPassageQuestionIndex

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
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleCompleteSectionOrTest}
                    disabled={isSubmitting || sectionCompleted}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit Section"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content for Reading Comprehension */}
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
                        <h2 className="text-xl font-bold mb-4">{currentPassage?.title}</h2>
                        <div className="prose max-w-none">
                          {currentPassage?.content.split("\n\n").map((paragraph, idx) => (
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
                        key={`question-${currentPassageIndex}-${currentPassageQuestionIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-lg font-medium">{currentQuestion?.text}</div>

                        <RadioGroup
                          value={
                            answers[`${currentSection.id}-p${currentPassageIndex}-q${currentPassageQuestionIndex}`] ||
                            ""
                          }
                          onValueChange={handleAnswerChange}
                          className="space-y-3"
                        >
                          {currentQuestion?.options.map((option) => (
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
                            disabled={currentPassageIndex === 0 && currentPassageQuestionIndex === 0}
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
      ) : (
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
                  <div className="text-lg font-medium">{currentQuestion?.text}</div>

                  <RadioGroup
                    value={answers[`${currentSection.id}-q${currentQuestionIndex}`] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-3"
                  >
                    {currentQuestion?.options.map((option) => (
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
                    <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>

                    {currentQuestionIndex < currentSection.questions.length - 1 ? (
                      <Button onClick={handleNextQuestion}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handleCompleteSectionOrTest}
                        disabled={isSubmitting || sectionCompleted}
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        {isSubmitting ? "Submitting..." : "Submit Section"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex justify-center mt-8">
        <Button variant="destructive" onClick={handleCompleteSectionOrTest} disabled={isSubmitting || sectionCompleted}>
          <Flag className="mr-2 h-4 w-4" />
          {isSubmitting ? "Submitting..." : "End Section Early"}
        </Button>
      </div>
    </div>
  )
}
