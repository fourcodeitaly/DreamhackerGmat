import Link from "next/link"
import { ArrowRight, BookOpen, Brain, BarChartIcon as ChartBar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to ace the GMAT
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform offers all the tools and resources you need to prepare effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10 text-primary" />}
            title="Realistic Practice"
            description="Experience tests that mirror the actual GMAT format and difficulty."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-primary" />}
            title="Adaptive Learning"
            description="Questions adjust to your skill level for more effective practice."
          />
          <FeatureCard
            icon={<ChartBar className="h-10 w-10 text-primary" />}
            title="Detailed Analytics"
            description="Track your progress with comprehensive performance insights."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-primary" />}
            title="Timed Practice"
            description="Build your pacing skills with realistic timing conditions."
          />
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/practice">
              Start Practicing Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <section className="bg-muted py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What our users say</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful test-takers who improved their scores with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The practice tests were incredibly similar to the actual GMAT. I improved my score by 80 points!"
              author="Sarah J."
              score="720 GMAT Score"
            />
            <TestimonialCard
              quote="The analytics helped me identify my weak areas. The detailed explanations were game-changers."
              author="Michael T."
              score="700 GMAT Score"
            />
            <TestimonialCard
              quote="I studied for just 6 weeks using this platform and exceeded my target score. Highly recommend!"
              author="Priya K."
              score="740 GMAT Score"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to boost your GMAT score?</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
            Join our free platform today and start your journey to GMAT success.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-transparent border-white hover:bg-white hover:text-primary"
            >
              <Link href="/practice">Try a Sample Test</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
