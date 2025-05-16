import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Skeleton } from "../components/ui/skeleton"
import { Github, ExternalLink } from "lucide-react"

const badgeColors = {
  ML: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  WebD: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  ComfyUI: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Python: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  NLP: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  AI: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

const ProjectSkeleton = () => (
  <div className="space-y-4">
    <div className="aspect-video relative rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  </div>
)

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)

  // Load projects JSON on mount
  useEffect(() => {
    fetch("/src/data/projectsData.json")
      .then((res) => res.json())
      .then((data) => {
        // Map your JSON to expected fields if needed or augment missing fields
        const formattedProjects = data.map((p, idx) => ({
          id: idx + 1,
          title: p.title,
          description: p.description,
          fullDescription: p.description, // or add if you have more detailed text
          image: p.image,
          tags: p.tags,
          stack: p.tags, // since your JSON has tags but no stack, reuse tags or adjust accordingly
          github: p.github,
          demo: p.demo,
          createdAt: p.createdAt || "2024-01-01", // fallback date
          lastUpdated: p.lastUpdated || "2024-01-01",
        }))
        setProjects(formattedProjects)
        setFilteredProjects(formattedProjects)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load projects data:", err)
        setIsLoading(false)
      })
  }, [])

  // Collect all tags dynamically from loaded projects
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

  // Filter and sort projects on tag/sort changes
  useEffect(() => {
    let filtered = [...projects]

    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag))
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "updated":
          return new Date(b.lastUpdated) - new Date(a.lastUpdated)
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [selectedTags, sortBy, projects])

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Filtering option */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Projects</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer hover:bg-primary/90 transition-colors ${
                  selectedTags.includes(tag)
                    ? ""
                    : badgeColors[tag] || badgeColors.Default
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="updated">Last Updated</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index}>
                <ProjectSkeleton />
              </Card>
            ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden">
                  <div className="relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
                        <div className="text-4xl font-bold text-muted-foreground/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          className={badgeColors[tag] || badgeColors.Default}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        Updated: {new Date(project.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px]">
                <div className="mt-4 flex flex-col md:flex-row gap-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full md:w-1/2 rounded-lg object-cover"
                  />
                  <div className="flex-1 ">
                    {/* <DialogHeader> */}
                      <DialogTitle>{project.title}</DialogTitle>
                      <DialogDescription>{project.fullDescription}</DialogDescription>
                    {/* </DialogHeader> */}
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                      {/* {project.demo && ( */}
                        <Button variant="outline" asChild>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <p>No projects found for selected filters.</p>
        )}
      </div>
    </div>
  )
}

export default Projects
