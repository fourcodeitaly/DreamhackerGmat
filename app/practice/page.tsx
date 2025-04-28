"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Brain, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState("all")

  const testTypes = [
    {
      id: "full",
      title: "Full-Length Test",
      description: "Complete GMAT simulation with all sections",
      icon: <FileText className="h-5 w-5" />,
      duration: "3 hours 7 minutes",
      questions: 80,
      category: "all",
    },
    {
      id: "quant",
      title: "Quantitative Reasoning",
      description: "Problem solving and data sufficiency questions",
      icon: <Brain className="h-5 w-5" />,
      duration: "62 minutes",
      questions: 31,
      category: "section",
    },
    {
      id: "verbal",
      title: "Verbal Reasoning",
      description: "Reading comprehension, critical reasoning, and sentence correction",
      icon: <BookOpen className="h-5 w-5" />,
      duration: "65 minutes",
      questions: 36,
      category: "section",
    },
    {
      id: "data",
      title: "Data Insights",
      description: "Multi-source reasoning, graphics interpretation, and table analysis",
      icon: <Clock className="h-5 w-5" />,
      duration: "30 minutes",
      questions: 12,
      category: "section",
    },
    {
      id: "quant-mini",
      title: "Quantitative Mini Test",
      description: "Short practice for quantitative skills",
      icon: <Brain className="h-5 w-5" />,
      duration: "30 minutes",
      questions: 15,
      category: "mini",
    },
    {
      id: "verbal-mini",
      title: "Verbal Mini Test",
      description: "Short practice for verbal skills",
      icon: <BookOpen className="h-5 w-5" />,
      duration: "30 minutes",
      questions: 18,
      category: "mini",
    },
  ]

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Practice Tests</h1>
          <p className="text-muted-foreground">Choose a test format to practice and improve your GMAT skills</p>
        </div>

        <Tabs defaultValue="all" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="section">Section Tests</TabsTrigger>
            <TabsTrigger value="mini">Mini Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testTypes.map((test, index) => (
                <TestCard key={test.id} test={test} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="section" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testTypes
                .filter((test) => test.category === "section")
                .map((test, index) => (
                  <TestCard key={test.id} test={test} index={index} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mini" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testTypes
                .filter((test) => test.category === "mini")
                .map((test, index) => (
                  <TestCard key={test.id} test={test} index={index} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

interface TestCardProps {
  test: {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    duration: string
    questions: number
    category: string
  }
  index: number
}

function TestCard({ test, index }: TestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-md">{test.icon}</div>
            <CardTitle>{test.title}</CardTitle>
          </div>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{test.duration}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Questions</span>
              <span className="font-medium">{test.questions}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/practice/${test.id}`}>
              Start Test <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
