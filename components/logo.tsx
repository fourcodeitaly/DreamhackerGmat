import Link from "next/link"
import { BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <div className="bg-primary p-1 rounded-md">
        <BookOpen className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl">GMAT Practice</span>
    </Link>
  )
}
