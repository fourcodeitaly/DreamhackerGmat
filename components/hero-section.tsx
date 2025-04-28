"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master the GMAT with Free Practice Tests
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Prepare effectively with our comprehensive practice platform. Realistic questions, detailed analytics,
                  and personalized feedback.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/register">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/practice">Try a Sample Test</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full h-[300px] md:h-[400px] bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Master the GMAT with Free Practice Tests
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Prepare effectively with our comprehensive practice platform. Realistic questions, detailed analytics,
                and personalized feedback.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/register">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/practice">Try a Sample Test</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[300px] md:h-[400px] bg-muted rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-card rounded-lg shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="h-6 w-24 bg-muted-foreground/20 rounded mb-4"></div>
                  <div className="h-4 w-full bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 w-4/6 bg-muted-foreground/20 rounded mb-6"></div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="h-10 bg-muted-foreground/20 rounded"></div>
                    <div className="h-10 bg-muted-foreground/20 rounded"></div>
                    <div className="h-10 bg-muted-foreground/20 rounded"></div>
                    <div className="h-10 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <div className="mt-auto h-10 w-32 bg-primary/30 rounded self-end"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
