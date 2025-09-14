import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Badge } from "../components/ui/badge"
import { Github, Linkedin, Twitter, Mail, Download, ExternalLink, SparkleIcon } from "lucide-react"
import Section from '../components/Section'
import TechStack from '../components/TechStack'
import FadeIn from '../components/FadeIn'

const Home = () => {
  const [homeData, setHomeData] = useState(null)

  useEffect(() => {
    fetch('/data/homeData.json')
      .then(res => res.json())
      .then(data => setHomeData(data))
      .catch(err => console.error('Failed to load home data:', err))
  }, [])

  if (!homeData) return <div className="p-10 text-center">Loading...</div>

  const { hero, certifications, education, featuredProjects } = homeData

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 lg:px-20">
      {/* Hero Section */}
      <Section className="pt-16 pb-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-6 ring-2 ring-primary/20">
            <img
              src="../../images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3">{hero.name}</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
            {hero.bio}
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href={hero.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={hero.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={hero.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all hover:scale-110"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${hero.socialLinks.email}`}
              className="hover:text-primary transition-all hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <a href="/Krishna_Gupta_CV_17May2025.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>

            <Button asChild variant="outline">
              <a
                href="/Krishna_Gupta_CV_17May2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> View Resume
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Technologies Section */}
      <Section
        title="Technologies"
        emoji="✨"
        subtitle="Software and services I frequently use"
        className="border-t"
      >
        <TechStack />
      </Section>

      {/* Featured Projects Section */}
      <Section
        title="Featured Projects"
        emoji="🌟"
        subtitle="Selected works and personal projects"
        className="border-t"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <div className="aspect-video relative rounded-t-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[850px]">
                <div className="mt-4 flex flex-col md:flex-row gap-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full md:w-1/2 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                    <div className="flex flex-wrap gap-2 mb-4 mt-4">
                      {project.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      <Button asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" /> View Code
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
          <Link to="/projects">
            <Card className="h-full hover:shadow-md transition-all flex items-center justify-center cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <SparkleIcon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-lg font-semibold">View All Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Explore my complete portfolio
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </Section>

      {/* Certifications Section */}
      <Section
        title="Participations"
        emoji="🏅"
        subtitle="Recognitions I’ve received!"
        className="border-t"
      >
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="rounded-lg p-4 shadow-sm border bg-background/50 backdrop-blur flex relative">
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-sm md:text-base">{cert.title}</h3>
                  <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                </div>
                <p className="text-muted-foreground text-sm absolute top-4 right-4">{cert.date}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Education Section */}
      <Section
        title="Education"
        emoji="🎓"
        subtitle="My academic background!"
        className="border-t"
      >
        <div className="space-y-4">
          {education.map((edu, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="rounded-lg p-4 shadow-sm border bg-background/50 backdrop-blur flex relative">
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-sm md:text-base">{edu.title}</h3>
                  <p className="text-muted-foreground text-sm">{edu.issuer}</p>
                </div>
                <p className="text-muted-foreground text-sm absolute top-4 right-4">{edu.date}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </main>
  )
}

export default Home
