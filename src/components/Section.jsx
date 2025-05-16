import React from 'react'
import { cn } from "../lib/utils"
import FadeIn from './FadeIn'

const Section = ({ title, emoji, subtitle, className, children, index = 0 }) => {
  return (
    <FadeIn delay={index * 0.15} className={cn("py-12", className)}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          {emoji && <span className="text-2xl">{emoji}</span>}
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>

      <FadeIn delay={(index * 0.15) + 0.1}>
        {children}
      </FadeIn>
    </FadeIn>
  )
}

export default Section
