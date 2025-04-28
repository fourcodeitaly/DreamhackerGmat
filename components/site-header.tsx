"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/practice",
      label: "Practice Tests",
      active: pathname === "/practice",
    },
    {
      href: "/resources",
      label: "Resources",
      active: pathname === "/resources",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Logo className="mb-8" />
            <nav className="grid gap-6 text-lg font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                    route.active ? "bg-accent text-accent-foreground" : "",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                route.active ? "text-foreground font-semibold" : "text-foreground/60",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <div className="hidden sm:flex space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
