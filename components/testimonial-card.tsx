"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TestimonialCardProps {
  quote: string
  author: string
  score: string
}

export function TestimonialCard({ quote, author, score }: TestimonialCardProps) {
  // Generate initials from author name
  const initials = author
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="mb-4 text-4xl">"</div>
          <p className="text-lg">{quote}</p>
        </CardContent>
        <CardFooter className="flex items-center space-x-4 border-t pt-4">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{score}</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
