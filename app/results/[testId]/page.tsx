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

// Mock data for the results
const mockResults = {
  score: 680,
  percentile: 78,
  timeSpent: "48:23",
  questionsAnswered: 31,
  correctAnswers: 24,
  incorrectAnswers: 7,
  sectionScores: [
    { name: "Quantitative", score: 47, percentile: 82 },
    { name: "Verbal", score: 38, percentile: 75 },
    { name: "Data Insights", score: 6, percentile: 68 },
  ],
  questionBreakdown: [
    { name: "Correct", value: 24, color: "#10b981" },
    { name: "Incorrect", value: 7, color: "#ef4444" },
    { name: "Unanswered", value: 0, color: "#d1d5db" },
  ],
  timePerQuestion: [
    { name: "Q1", time: 45 },
    { name: "Q2", time: 62 },
    { name: "Q3", time: 78 },
    { name: "Q4", time: 53 },
    { name: "Q5", time: 90 },
    { name: "Q6", time: 48 },
    { name: "Q7", time: 65 },
    { name: "Q8", time: 72 },
    { name: "Q9", time: 58 },
    { name: "Q10", time: 43 },
  ],
  strengthsWeaknesses: [
    { category: "Problem Solving", score: 85, color: "#10b981" },
    { category: "Data Sufficiency", score: 65, color: "#f59e0b" },
    { category: "Reading Comprehension", score: 78, color: "#10b981" },
    { category: "Critical Reasoning", score: 72, color: "#10b981" },
    { category: "Sentence Correction", score: 58, color: "#f59e0b" },
    { category: "Multi-Source Reasoning", score: 45, color: "#ef4444" },
    { category: "Graphics Interpretation", score: 62, color: "#f59e0b" },
  ],
  recommendations: [
    "Focus on improving Multi-Source Reasoning skills",
    "Practice more Sentence Correction questions",
    "Work on time management for Data Sufficiency questions",
    "Continue strengthening Problem Solving skills",
    "Review Graphics Interpretation techniques",
  ],
}

export default function ResultsPage({ params }: { params: { testId: string } }) {
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
            <h1 className="text-3xl font-bold tracking-tight">Test Results</h1>
            <p className="text-muted-foreground">
              {params.testId.charAt(0).toUpperCase() + params.testId.slice(1).replace("-", " ")} Test • Completed on{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button asChild>
              <Link href="/practice">
                Practice Again <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard
            icon={<Target className="h-6 w-6 text-primary" />}
            title="Total Score"
            value={mockResults.score}
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
            value={`${Math.round((mockResults.correctAnswers / mockResults.questionsAnswered) * 100)}%`}
            description={`${mockResults.correctAnswers}/${mockResults.questionsAnswered} Correct`}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="timing">Timing</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Breakdown of your test performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockResults.questionBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockResults.questionBreakdown.map((entry, index) => (
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
                  <CardTitle>Strengths & Weaknesses</CardTitle>
                  <CardDescription>Performance by question category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.strengthsWeaknesses.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="font-medium">{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" indicatorColor={item.color} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Scores</CardTitle>
                <CardDescription>Your performance across test sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockResults.sectionScores.map((section, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{section.name}</h3>
                        <span className="text-muted-foreground">{section.percentile}th Percentile</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold w-12">{section.score}</div>
                        <div className="flex-1">
                          <Progress value={(section.score / 51) * 100} className="h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockResults.sectionScores.map((section, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{section.score}</div>
                    <p className="text-muted-foreground text-sm mb-4">{section.percentile}th Percentile</p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/practice/${section.name.toLowerCase()}`}>Practice {section.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time per Question</CardTitle>
                <CardDescription>Time spent on each question (in seconds)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockResults.timePerQuestion}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Seconds", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Bar dataKey="time" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timing Analysis</CardTitle>
                <CardDescription>Insights on your time management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Average Time per Question</h3>
                    <div className="text-3xl font-bold">
                      {Math.round(
                        mockResults.timePerQuestion.reduce((acc, curr) => acc + curr.time, 0) /
                          mockResults.timePerQuestion.length,
                      )}{" "}
                      seconds
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Time Management Tips</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Aim to spend no more than 2 minutes on each question</li>
                      <li>For difficult questions, make an educated guess and move on</li>
                      <li>Practice with timed sections to improve your pacing</li>
                      <li>Review questions that took you longer than average</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Recommendations</CardTitle>
                <CardDescription>Personalized suggestions to improve your score</CardDescription>
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
                    <Link href="/practice/multi-source-reasoning" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Multi-Source Reasoning</span>
                      <span className="text-sm text-muted-foreground">15 questions • 30 min</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/sentence-correction" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Sentence Correction</span>
                      <span className="text-sm text-muted-foreground">20 questions • 25 min</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/data-sufficiency" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Data Sufficiency</span>
                      <span className="text-sm text-muted-foreground">15 questions • 30 min</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/graphics-interpretation" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Graphics Interpretation</span>
                      <span className="text-sm text-muted-foreground">10 questions • 20 min</span>
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
