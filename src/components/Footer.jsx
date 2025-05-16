import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-dashed border-2 border-b-0 border-r-0 border-l-0 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-around items-center">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Krishna Gupta. All rights reserved.
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Projects
          </Link>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Krishna0405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
