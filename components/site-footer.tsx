import Link from "next/link"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Free GMAT practice tests and resources to help you prepare for the GMAT exam.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Practice</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/practice/quantitative"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Quantitative Reasoning
                </Link>
              </li>
              <li>
                <Link href="/practice/verbal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Verbal Reasoning
                </Link>
              </li>
              <li>
                <Link
                  href="/practice/data-insights"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Data Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/practice/full-test"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Full-Length Tests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/resources/study-guides"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Study Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/tips" className="text-muted-foreground hover:text-foreground transition-colors">
                  Test-Taking Tips
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GMAT Practice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
