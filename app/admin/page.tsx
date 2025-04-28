"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  Edit,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for the admin dashboard
const mockQuestions = [
  {
    id: "q1",
    text: "If x + y = 10 and x - y = 4, what is the value of x?",
    type: "Multiple Choice",
    section: "Quantitative",
    difficulty: "Medium",
    status: "Active",
    dateAdded: "Feb 15, 2023",
  },
  {
    id: "q2",
    text: "A company's profit increased by 15% from 2020 to 2021, and then decreased by 10% from 2021 to 2022. What was the overall percentage change in profit from 2020 to 2022?",
    type: "Multiple Choice",
    section: "Quantitative",
    difficulty: "Hard",
    status: "Active",
    dateAdded: "Feb 14, 2023",
  },
  {
    id: "q3",
    text: "Explain the concept of opportunity cost and provide an example of how it might influence a business decision.",
    type: "Open Question",
    section: "Verbal",
    difficulty: "Medium",
    status: "Active",
    dateAdded: "Feb 13, 2023",
  },
  {
    id: "q4",
    text: "In a survey of 200 customers, 120 preferred Product A and 100 preferred Product B. How many customers preferred both products?",
    type: "Multiple Choice",
    section: "Quantitative",
    difficulty: "Medium",
    status: "Active",
    dateAdded: "Feb 12, 2023",
  },
  {
    id: "q5",
    text: "The graph below shows the relationship between the number of hours studied and test scores for a group of students. Based on the trend line, what is the approximate increase in test score for each additional hour of study?",
    type: "Image-Based",
    section: "Data Insights",
    difficulty: "Medium",
    status: "Active",
    dateAdded: "Feb 11, 2023",
  },
]

const mockUsers = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    tests: 12,
    lastActive: "Feb 16, 2023",
    status: "Active",
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    tests: 8,
    lastActive: "Feb 15, 2023",
    status: "Active",
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    tests: 5,
    lastActive: "Feb 10, 2023",
    status: "Active",
  },
  {
    id: "u4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    tests: 15,
    lastActive: "Feb 16, 2023",
    status: "Active",
  },
  {
    id: "u5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    tests: 3,
    lastActive: "Feb 5, 2023",
    status: "Inactive",
  },
]

const mockStats = [
  {
    title: "Total Questions",
    value: "1,245",
    change: "+32 this week",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Active Users",
    value: "8,392",
    change: "+124 this week",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Tests Taken",
    value: "24,856",
    change: "+843 this week",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Avg. Score",
    value: "650",
    change: "+5 this week",
    icon: <FileText className="h-4 w-4" />,
  },
]

export default function AdminPage() {
  const [searchQuestions, setSearchQuestions] = useState("")
  const [searchUsers, setSearchUsers] = useState("")

  const filteredQuestions = mockQuestions.filter(
    (question) =>
      question.text.toLowerCase().includes(searchQuestions.toLowerCase()) ||
      question.type.toLowerCase().includes(searchQuestions.toLowerCase()) ||
      question.section.toLowerCase().includes(searchQuestions.toLowerCase()),
  )

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase()),
  )

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
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage questions, users, and view analytics</p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="questions" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  className="pl-8"
                  value={searchQuestions}
                  onChange={(e) => setSearchQuestions(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem>All Questions</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Quantitative</DropdownMenuItem>
                    <DropdownMenuItem>Verbal</DropdownMenuItem>
                    <DropdownMenuItem>Data Insights</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Multiple Choice</DropdownMenuItem>
                    <DropdownMenuItem>Open Questions</DropdownMenuItem>
                    <DropdownMenuItem>Image-Based</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Question</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium">
                          {question.text.length > 60 ? question.text.substring(0, 60) + "..." : question.text}
                        </TableCell>
                        <TableCell>{question.type}</TableCell>
                        <TableCell>{question.section}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              question.difficulty === "Easy"
                                ? "outline"
                                : question.difficulty === "Medium"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {question.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={question.status === "Active" ? "outline" : "destructive"}>
                            {question.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{question.dateAdded}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                Change Status
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tests Taken</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.tests}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "outline" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                Change Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Tests
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
