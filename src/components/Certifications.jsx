import React from 'react'
import { motion } from 'framer-motion'
import { Card } from "./ui/card"
import { ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "Smart India Hackathon 2022",
    platform: "SIH - Government of India",
    date: "2022",
    link: null
  },
  {
    title: "IYD Hackathon: Valmiki Ramayan Fact-Checker",
    platform: "International Youth Day Hackathon",
    date: "2023",
    link: null
  },
  {
    title: "Delhi Tourism Hackathon",
    platform: "Delhi Government",
    date: "2023",
    link: null
  },
  {
    title: "Top 100 Contributors",
    platform: "GirlScript Summer of Code",
    date: "2023",
    link: null
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
}

const Certifications = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {certifications.map((cert, index) => (
        <motion.div key={index} variants={item}>
          <Card className="rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col justify-between h-full bg-card">
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold leading-tight">{cert.title}</h3>
                {cert.link && (
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{cert.platform}</p>
            </div>
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              {cert.date}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Certifications
