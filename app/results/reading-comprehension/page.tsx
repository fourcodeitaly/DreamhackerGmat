"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Download, ArrowRight, BookOpen, Brain, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockReadingComprehensionTest } from "@/data/reading-comprehension-data"

// Mock results data
const mockResults = {
  score: 12,
  totalQuestions: 15,
  percentile: 80,
  timeSpent: "42:18",
  passageScores: [
    { title: "The Evolution of Corporate Social Responsibility", correct: 3, total: 4, percentage: 75 },
    { title: "Quantum Computing: Promises and Challenges", correct: 2, total: 3, percentage: 67 },
    { title: "Urban Agriculture and Food Security", correct: 4, total: 4, percentage: 100 },
    { title: "The Neuroscience of Decision Making", correct: 3, total: 4, percentage: 75 },
  ],
  skillBreakdown: [
    { skill: "Main Idea Identification", score: 85, color: "#10b981" },
    { skill: "Detail Recognition", score: 70, color: "#f59e0b" },
    { skill: "Inference", score: 65, color: "#f59e0b" },
    { skill: "Logical Structure", score: 90, color: "#10b981" },
    { skill: "Author's Tone/Attitude", score: 75, color: "#10b981" },
  ],
  recommendations: [
    "Practice more inference questions, focusing on drawing conclusions from implicit information",
    "Work on improving reading speed while maintaining comprehension",
    "Focus on identifying supporting details in complex passages",
    "Continue strengthening your ability to recognize passage structure and organization",
    "Practice more science and technology passages to broaden your comfort with different topics",
  ],
}

export default function ReadingComprehensionResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
            <h1 className="text-3xl font-bold tracking-tight">Reading Comprehension Results</h1>
            <p className="text-muted-foreground">Completed on {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button asChild>
              <Link href="/practice/reading-comprehension">
                Practice Again <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard
            icon={<Target className="h-6 w-6 text-primary" />}
            title="Total Score"
            value={`${mockResults.score}/${mockResults.totalQuestions}`}
            description={`${mockResults.percentile}th Percentile`}
          />
          <ScoreCard
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Time Spent"
            value={mockResults.timeSpent}
            description="Minutes"
          />
          <ScoreCard
            icon={<Brain className="h-6 w-6 text-primary" />}
            title="Accuracy"
            value={`${Math.round((mockResults.score / mockResults.totalQuestions) * 100)}%`}
            description={`${mockResults.score}/${mockResults.totalQuestions} Correct`}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="passages">Passages</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Skill</CardTitle>
                <CardDescription>Breakdown of your reading comprehension skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResults.skillBreakdown.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill.skill}</span>
                        <span className="font-medium">{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance by Passage</CardTitle>
                <CardDescription>Your score for each reading passage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockResults.passageScores.map((passage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{passage.title}</h3>
                        <Badge variant={passage.percentage >= 75 ? "outline" : "secondary"}>
                          {passage.correct}/{passage.total}
                        </Badge>
                      </div>
                      <Progress value={passage.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="passages" className="space-y-6">
            <div className="space-y-6">
              {mockReadingComprehensionTest.passages.map((passage, passageIndex) => (
                <Card key={passageIndex}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{passage.title}</CardTitle>
                      <Badge variant="outline">
                        {mockResults.passageScores[passageIndex].correct}/
                        {mockResults.passageScores[passageIndex].total}
                      </Badge>
                    </div>
                    <CardDescription>Passage {passageIndex + 1}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {passage.questions.map((question, questionIndex) => {
                        // Mock data for whether the user got this question right
                        // In a real app, this would come from the user's actual answers
                        const isCorrect = Math.random() > 0.3 // 70% chance of being correct for demo

                        return (
                          <div key={questionIndex} className="border-b pb-6 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-medium">Question {questionIndex + 1}</div>
                              <Badge
                                variant={isCorrect ? "outline" : "destructive"}
                                className={isCorrect ? "bg-green-100 text-green-800" : ""}
                              >
                                {isCorrect ? "Correct" : "Incorrect"}
                              </Badge>
                            </div>

                            <p className="mb-4">{question.text}</p>

                            <div className="space-y-2 mb-4">
                              {question.options.map((option) => (
                                <div
                                  key={option.id}
                                  className={`p-2 rounded-md ${
                                    option.id === question.correctAnswer &&
                                    (isCorrect
                                      ? "bg-green-100 border border-green-300"
                                      : "bg-green-50 border border-green-200")
                                  } ${
                                    !isCorrect && option.id !== question.correctAnswer
                                      ? "bg-red-100 border border-red-300"
                                      : ""
                                  } ${option.id !== question.correctAnswer ? "bg-gray-50 border border-gray-200" : ""}`}
                                >
                                  <span className="font-medium mr-2">{option.id.toUpperCase()}.</span>
                                  {option.text}
                                </div>
                              ))}
                            </div>

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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Recommendations</CardTitle>
                <CardDescription>Personalized suggestions to improve your reading comprehension</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockResults.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1.5 rounded-full text-primary mt-0.5">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p>{recommendation}</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
                    <Link href="/practice/inference-questions" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Inference Questions</span>
                      <span className="text-sm text-muted-foreground">Practice drawing conclusions from text</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/science-passages" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Science Passages</span>
                      <span className="text-sm text-muted-foreground">Improve comprehension of technical content</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/speed-reading" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Speed Reading</span>
                      <span className="text-sm text-muted-foreground">Improve reading efficiency</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/detail-questions" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Detail Questions</span>
                      <span className="text-sm text-muted-foreground">Practice identifying key details</span>
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
