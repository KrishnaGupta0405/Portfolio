import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"
import { Button } from "./components/ui/button"
import { Toggle } from "./components/ui/toggle"
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet"
import { Menu, Sun, Moon } from "lucide-react"
import Home from './pages/Home'
import Projects from './pages/Projects'
import Footer from './components/Footer'

//  TODO -> Try adding Retro grid (Magici UI) or sparkling grid (UI Beats.com) as background of homepage

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check if user has a theme preference
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      return savedTheme ? savedTheme === 'dark' : prefersDark
    }
    return false
  })

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  // Update theme when isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground relative">
        {/* Decorative Left & Right Borders */}
        {/* Left Vertical Border */}
          <div className="fixed top-0 bottom-0 left-4 sm:left-16 md:left-24 lg:left-10 xl:left-60 border-l border-dashed border-2 z-40 pointer-events-none hidden lg:block" />

          {/* Right Vertical Border */}
          <div className="fixed top-0 bottom-0 right-4 sm:right-16 md:right-24 lg:right-10 xl:right-60 border-r border-dashed border-2 z-40 pointer-events-none hidden lg:block" />



    {/* Header/Navigation */}
    <header className="border-dashed border-2 border-t-0 border-r-0 border-l-0 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center justify-between px-4 max-w-5xl mx-auto">
        <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
          Krishna Gupta
        </Link>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link 
                  to="/" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/projects"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Projects
                </Link>
                <Toggle 
                  variant="outline"
                  pressed={isDark}
                  onPressedChange={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Toggle>
              </nav>
              <Separator orientation="vertical" />
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            Projects
          </NavLink>
          <Toggle 
            variant="outline"
            pressed={isDark}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Toggle>
        </nav>
      </div>
    </header>

    {/* Main Content */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>

    {/* Footer */}
    <Footer />
  </div>
</Router>

  )
}

export default App
