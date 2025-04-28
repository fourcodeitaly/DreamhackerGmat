"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, ArrowRight, BookOpen, Brain, Clock, Target, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { adaptiveQuestions } from "@/data/adaptive-questions"
import type { DifficultyLevel } from "@/lib/cat-algorithm"

interface TestResults {
  score: number
  answeredQuestions: {
    questionId: string
    userAnswer: string
    isCorrect: boolean
    difficulty: DifficultyLevel
  }[]
  date: string
}

export default function AdaptiveResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [results, setResults] = useState<TestResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve test results from localStorage
    const storedResults = localStorage.getItem("adaptiveTestResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
            <p className="mb-6">We couldn't find any adaptive test results. You may need to take the test first.</p>
            <Button asChild>
              <Link href="/practice/adaptive">Take Adaptive Test</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate statistics
  const totalQuestions = results.answeredQuestions.length
  const correctAnswers = results.answeredQuestions.filter((q) => q.isCorrect).length
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100)

  // Prepare data for charts
  const difficultyBreakdown = [
    { name: "Easy", value: results.answeredQuestions.filter((q) => q.difficulty === "easy").length, color: "#10b981" },
    {
      name: "Medium",
      value: results.answeredQuestions.filter((q) => q.difficulty === "medium").length,
      color: "#f59e0b",
    },
    { name: "Hard", value: results.answeredQuestions.filter((q) => q.difficulty === "hard").length, color: "#ef4444" },
  ]

  const performanceByDifficulty = [
    {
      name: "Easy",
      correct: results.answeredQuestions.filter((q) => q.difficulty === "easy" && q.isCorrect).length,
      incorrect: results.answeredQuestions.filter((q) => q.difficulty === "easy" && !q.isCorrect).length,
    },
    {
      name: "Medium",
      correct: results.answeredQuestions.filter((q) => q.difficulty === "medium" && q.isCorrect).length,
      incorrect: results.answeredQuestions.filter((q) => q.difficulty === "medium" && !q.isCorrect).length,
    },
    {
      name: "Hard",
      correct: results.answeredQuestions.filter((q) => q.difficulty === "hard" && q.isCorrect).length,
      incorrect: results.answeredQuestions.filter((q) => q.difficulty === "hard" && !q.isCorrect).length,
    },
  ]

  // Get percentile based on score (simplified calculation)
  const getPercentile = (score: number) => {
    if (score >= 760) return 99
    if (score >= 730) return 96
    if (score >= 700) return 90
    if (score >= 650) return 80
    if (score >= 600) return 65
    if (score >= 550) return 50
    if (score >= 500) return 35
    if (score >= 450) return 20
    if (score >= 400) return 10
    return 5
  }

  const percentile = getPercentile(results.score)

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Adaptive Test Results</h1>
            <p className="text-muted-foreground">Completed on {new Date(results.date).toLocaleDateString()}</p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button asChild>
              <Link href="/practice/adaptive">
                Practice Again <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard
            icon={<Target className="h-6 w-6 text-primary" />}
            title="GMAT Score"
            value={results.score}
            description={`${percentile}th Percentile`}
          />
          <ScoreCard
            icon={<BarChart3 className="h-6 w-6 text-primary" />}
            title="Difficulty Level"
            value={difficultyBreakdown.sort((a, b) => b.value - a.value)[0].name}
            description={`Most frequent difficulty level`}
          />
          <ScoreCard
            icon={<Brain className="h-6 w-6 text-primary" />}
            title="Accuracy"
            value={`${accuracy}%`}
            description={`${correctAnswers}/${totalQuestions} Correct`}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Distribution</CardTitle>
                  <CardDescription>Breakdown of question difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {difficultyBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance by Difficulty</CardTitle>
                  <CardDescription>Correct vs. incorrect answers by difficulty level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceByDifficulty}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="correct" name="Correct" fill="#10b981" />
                        <Bar dataKey="incorrect" name="Incorrect" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Adaptive Test Explanation</CardTitle>
                <CardDescription>Understanding your adaptive test score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The Computer Adaptive Test (CAT) adjusts the difficulty of questions based on your performance. Your
                    score of <strong>{results.score}</strong> places you in the{" "}
                    <strong>{percentile}th percentile</strong> of test takers.
                  </p>

                  <div className="space-y-2">
                    <h3 className="font-medium">How CAT Scoring Works:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>The test begins with medium difficulty questions</li>
                      <li>As you answer correctly, you receive harder questions worth more points</li>
                      <li>Incorrect answers lead to easier questions</li>
                      <li>Your final score is based on question difficulty and accuracy</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <h3 className="font-medium mb-2">Your Performance Summary:</h3>
                    <p>
                      You answered <strong>{correctAnswers}</strong> out of <strong>{totalQuestions}</strong> questions
                      correctly ({accuracy}%). The majority of your questions were{" "}
                      <strong>{difficultyBreakdown.sort((a, b) => b.value - a.value)[0].name}</strong> difficulty,
                      indicating that the test{" "}
                      {difficultyBreakdown[2].value > difficultyBreakdown[0].value
                        ? "recognized your strong performance and challenged you with harder questions."
                        : "adjusted to match your current skill level."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Analysis</CardTitle>
                <CardDescription>Detailed breakdown of your answers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.answeredQuestions.map((answer, index) => {
                    // Find the question details
                    const question = adaptiveQuestions.find((q) => q.id === answer.questionId)
                    if (!question) return null

                    return (
                      <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">Question {index + 1}</div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={answer.isCorrect ? "outline" : "destructive"}
                              className={answer.isCorrect ? "bg-green-100 text-green-800" : ""}
                            >
                              {answer.isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                question.difficulty === "easy"
                                  ? "bg-green-100 text-green-800"
                                  : question.difficulty === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <p className="mb-2">{question.text}</p>

                        {question.type === "multiple-choice" && question.options && (
                          <div className="space-y-2 mb-4">
                            {question.options.map((option) => (
                              <div
                                key={option.id}
                                className={`p-2 rounded-md ${
                                  option.id === question.correctAnswer && option.id === answer.userAnswer
                                    ? "bg-green-100 border border-green-300"
                                    : option.id === question.correctAnswer
                                      ? "bg-green-50 border border-green-200"
                                      : option.id === answer.userAnswer
                                        ? "bg-red-100 border border-red-300"
                                        : "bg-gray-50 border border-gray-200"
                                }`}
                              >
                                <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
                                {option.text}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-2">
                          <p className="font-medium">Explanation:</p>
                          <p className="text-muted-foreground">{question.explanation}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Recommendations</CardTitle>
                <CardDescription>Personalized suggestions based on your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Generate recommendations based on performance */}
                  {(() => {
                    // Group questions by section
                    const sectionPerformance = {
                      Quantitative: {
                        total: results.answeredQuestions.filter((q) => {
                          const question = adaptiveQuestions.find((aq) => aq.id === q.questionId)
                          return question?.section === "Quantitative"
                        }).length,
                        correct: results.answeredQuestions.filter((q) => {
                          const question = adaptiveQuestions.find((aq) => aq.id === q.questionId)
                          return question?.section === "Quantitative" && q.isCorrect
                        }).length,
                      },
                      Verbal: {
                        total: results.answeredQuestions.filter((q) => {
                          const question = adaptiveQuestions.find((aq) => aq.id === q.questionId)
                          return question?.section === "Verbal"
                        }).length,
                        correct: results.answeredQuestions.filter((q) => {
                          const question = adaptiveQuestions.find((aq) => aq.id === q.questionId)
                          return question?.section === "Verbal" && q.isCorrect
                        }).length,
                      },
                      "Data Insights": {
                        total: results.answeredQuestions.filter((q) => {
                          const question = adaptiveQuestions.find((aq) => aq.id === q.questionId)
                          return question?.section === "Data Insights"
                        }).length,
                        correct: results.answeredQuestions.filter((q) => {
                          const question = adaptiveQuestions.find((aq) => aq.id === q.questionId)
                          return question?.section === "Data Insights" && q.isCorrect
                        }).length,
                      },
                    }

                    // Calculate accuracy for each section
                    const sectionAccuracy = {
                      Quantitative:
                        sectionPerformance.Quantitative.total > 0
                          ? Math.round(
                              (sectionPerformance.Quantitative.correct / sectionPerformance.Quantitative.total) * 100,
                            )
                          : 0,
                      Verbal:
                        sectionPerformance.Verbal.total > 0
                          ? Math.round((sectionPerformance.Verbal.correct / sectionPerformance.Verbal.total) * 100)
                          : 0,
                      "Data Insights":
                        sectionPerformance["Data Insights"].total > 0
                          ? Math.round(
                              (sectionPerformance["Data Insights"].correct /
                                sectionPerformance["Data Insights"].total) *
                                100,
                            )
                          : 0,
                    }

                    // Sort sections by accuracy (ascending)
                    const sortedSections = Object.entries(sectionAccuracy)
                      .sort(([, a], [, b]) => a - b)
                      .map(([section]) => section)

                    // Generate recommendations
                    const recommendations = []

                    // Weakest section recommendation
                    if (sortedSections.length > 0) {
                      const weakestSection = sortedSections[0]
                      recommendations.push({
                        title: `Focus on ${weakestSection}`,
                        description: `This was your most challenging section with ${sectionAccuracy[weakestSection]}% accuracy. Dedicate more study time here.`,
                        icon: <BookOpen className="h-4 w-4" />,
                      })
                    }

                    // Difficulty level recommendation
                    const hardQuestions = results.answeredQuestions.filter((q) => q.difficulty === "hard")
                    const hardAccuracy =
                      hardQuestions.length > 0
                        ? Math.round((hardQuestions.filter((q) => q.isCorrect).length / hardQuestions.length) * 100)
                        : 0

                    if (hardQuestions.length > 0) {
                      if (hardAccuracy < 50) {
                        recommendations.push({
                          title: "Build Foundational Skills",
                          description:
                            "You struggled with harder questions. Focus on strengthening core concepts before tackling advanced problems.",
                          icon: <Brain className="h-4 w-4" />,
                        })
                      } else {
                        recommendations.push({
                          title: "Challenge Yourself",
                          description:
                            "You performed well on harder questions. Continue to challenge yourself with difficult practice problems.",
                          icon: <Brain className="h-4 w-4" />,
                        })
                      }
                    }

                    // Overall score recommendation
                    if (results.score < 650) {
                      recommendations.push({
                        title: "Comprehensive Review",
                        description:
                          "Your current score indicates you would benefit from a comprehensive review of all GMAT topics.",
                        icon: <BookOpen className="h-4 w-4" />,
                      })
                    } else if (results.score >= 650 && results.score < 700) {
                      recommendations.push({
                        title: "Targeted Practice",
                        description:
                          "You have a solid foundation. Focus on targeted practice in specific areas to push your score above 700.",
                        icon: <Target className="h-4 w-4" />,
                      })
                    } else {
                      recommendations.push({
                        title: "Advanced Strategies",
                        description:
                          "Your score is already competitive. Focus on advanced test-taking strategies and time management.",
                        icon: <Clock className="h-4 w-4" />,
                      })
                    }

                    return recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-primary/10 p-1.5 rounded-full text-primary mt-0.5">
                          {recommendation.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{recommendation.title}</h3>
                          <p className="text-muted-foreground">{recommendation.description}</p>
                        </div>
                      </div>
                    ))
                  })()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Practice</CardTitle>
                <CardDescription>Targeted practice to address your weak areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/quantitative" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Quantitative Practice</span>
                      <span className="text-sm text-muted-foreground">
                        Focus on problem solving and data sufficiency
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/verbal" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Verbal Practice</span>
                      <span className="text-sm text-muted-foreground">
                        Improve reading comprehension and critical reasoning
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/data-insights" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Data Insights Practice</span>
                      <span className="text-sm text-muted-foreground">
                        Master multi-source reasoning and data analysis
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/adaptive" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Full Adaptive Test</span>
                      <span className="text-sm text-muted-foreground">Take another full-length adaptive test</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

interface ScoreCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  description: string
}

function ScoreCard({ icon, title, value, description }: ScoreCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold">{value}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
