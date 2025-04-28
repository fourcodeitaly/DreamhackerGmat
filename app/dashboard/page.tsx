"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for the dashboard
const mockTestHistory = [
  { date: "Jan 5", score: 620 },
  { date: "Jan 12", score: 640 },
  { date: "Jan 19", score: 630 },
  { date: "Jan 26", score: 650 },
  { date: "Feb 2", score: 660 },
  { date: "Feb 9", score: 670 },
  { date: "Feb 16", score: 680 },
]

const mockSectionScores = [
  { date: "Jan 5", quant: 38, verbal: 35, data: 5 },
  { date: "Jan 12", quant: 40, verbal: 36, data: 5 },
  { date: "Jan 19", quant: 39, verbal: 35, data: 5 },
  { date: "Jan 26", quant: 41, verbal: 37, data: 6 },
  { date: "Feb 2", quant: 42, verbal: 38, data: 6 },
  { date: "Feb 9", quant: 44, verbal: 39, data: 6 },
  { date: "Feb 16", quant: 47, verbal: 38, data: 6 },
]

const mockRecentTests = [
  {
    id: "full-1",
    name: "Full-Length Test",
    date: "Feb 16, 2023",
    score: 680,
    percentile: 78,
    time: "2h 45m",
  },
  {
    id: "quant-1",
    name: "Quantitative Practice",
    date: "Feb 14, 2023",
    score: 47,
    percentile: 82,
    time: "58m",
  },
  {
    id: "verbal-1",
    name: "Verbal Practice",
    date: "Feb 12, 2023",
    score: 38,
    percentile: 75,
    time: "62m",
  },
]

const mockUpcomingTests = [
  {
    id: "scheduled-1",
    name: "Full-Length Test",
    date: "Feb 23, 2023",
    time: "10:00 AM",
  },
  {
    id: "scheduled-2",
    name: "Data Insights Practice",
    date: "Feb 25, 2023",
    time: "2:00 PM",
  },
]

const mockStudyPlan = [
  {
    day: "Monday",
    topic: "Quantitative: Problem Solving",
    duration: "1 hour",
    completed: true,
  },
  {
    day: "Tuesday",
    topic: "Verbal: Reading Comprehension",
    duration: "1 hour",
    completed: true,
  },
  {
    day: "Wednesday",
    topic: "Quantitative: Data Sufficiency",
    duration: "1 hour",
    completed: false,
  },
  {
    day: "Thursday",
    topic: "Verbal: Critical Reasoning",
    duration: "1 hour",
    completed: false,
  },
  {
    day: "Friday",
    topic: "Data Insights: Multi-Source Reasoning",
    duration: "1 hour",
    completed: false,
  },
  {
    day: "Saturday",
    topic: "Full-Length Practice Test",
    duration: "3 hours",
    completed: false,
  },
  {
    day: "Sunday",
    topic: "Review Test Results",
    duration: "2 hours",
    completed: false,
  },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("3m")

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
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and manage your GMAT preparation</p>
          </div>

          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {timeRange === "1m"
                    ? "Last Month"
                    : timeRange === "3m"
                      ? "Last 3 Months"
                      : timeRange === "6m"
                        ? "Last 6 Months"
                        : "All Time"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTimeRange("1m")}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("3m")}>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("6m")}>Last 6 Months</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("all")}>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild>
              <Link href="/practice">
                Take a Test <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Score</CardTitle>
              <CardDescription>Based on your most recent test</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">680</div>
              <p className="text-muted-foreground text-sm">78th Percentile</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Target Score</CardTitle>
              <CardDescription>Your goal score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">720</div>
              <p className="text-muted-foreground text-sm">40 points to go</p>
              <Progress value={(680 / 720) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Streak</CardTitle>
              <CardDescription>Consecutive days of practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">14</div>
              <p className="text-muted-foreground text-sm">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Progress</CardTitle>
                <CardDescription>Your GMAT score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockTestHistory}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[600, 800]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#scoreGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section Performance</CardTitle>
                <CardDescription>Your performance by section over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockSectionScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="quant" name="Quantitative" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="verbal" name="Verbal" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="data" name="Data Insights" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription>Your most recent practice tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentTests.map((test, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">{test.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{test.score}</div>
                          <p className="text-xs text-muted-foreground">
                            {test.percentile}th Percentile • {test.time}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/results/${test.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/history">View All Test History</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tests</CardTitle>
                  <CardDescription>Your scheduled practice tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingTests.map((test, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {test.date} • {test.time}
                          </p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/practice/${test.id}`}>Start</Link>
                        </Button>
                      </div>
                    ))}

                    {mockUpcomingTests.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No upcoming tests scheduled</p>
                        <Button className="mt-4" asChild>
                          <Link href="/schedule">Schedule a Test</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/schedule">Schedule a Test</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Tests</CardTitle>
                <CardDescription>Based on your performance and study plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/data-sufficiency" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Data Sufficiency</span>
                      <span className="text-sm text-muted-foreground">Focus area • 30 min</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/sentence-correction" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Sentence Correction</span>
                      <span className="text-sm text-muted-foreground">Weak area • 25 min</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto py-4 justify-start">
                    <Link href="/practice/full-test" className="flex flex-col items-start">
                      <span className="text-lg font-medium">Full-Length Test</span>
                      <span className="text-sm text-muted-foreground">Weekly practice • 3h 7m</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study-plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Study Plan</CardTitle>
                <CardDescription>Your personalized study schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudyPlan.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-4 h-4 rounded-full ${item.completed ? "bg-primary" : "border border-muted-foreground"}`}
                        />
                        <div>
                          <h3 className="font-medium">
                            {item.day}: {item.topic}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                        </div>
                      </div>
                      {!item.completed && (
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Customize Plan</Button>
                <Button>Mark Today Complete</Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Study Time</CardTitle>
                  <CardDescription>This week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8.5 hours</div>
                  <p className="text-muted-foreground text-sm">+2.5 hours from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Questions Practiced</CardTitle>
                  <CardDescription>This week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">124</div>
                  <p className="text-muted-foreground text-sm">+32 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Days to Test Day</CardTitle>
                  <CardDescription>Official GMAT exam</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                  <p className="text-muted-foreground text-sm">You're on track!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
