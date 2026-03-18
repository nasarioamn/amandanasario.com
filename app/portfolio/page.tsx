import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Past and ongoing projects by Amanda Nasario.',
}

const reader = createReader(process.cwd(), keystaticConfig)

export default async function PortfolioPage() {
  const projects = await reader.collections.projects.all()

  const ongoing = projects.filter((p) => p.entry.status === 'ongoing')
  const completed = projects.filter((p) => p.entry.status === 'completed')

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <section className="mb-20">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Work</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-stone-500 max-w-xl">
          A selection of past and ongoing projects with measurable outcomes.
        </p>
      </section>

      {/* Ongoing projects */}
      {ongoing.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <h2 className="text-lg font-semibold text-stone-900">Ongoing</h2>
          </div>
          <ProjectGrid projects={ongoing} />
        </section>
      )}

      {/* Completed projects */}
      {completed.length > 0 && (
        <section className="border-t border-stone-200 pt-16">
          <h2 className="text-lg font-semibold text-stone-900 mb-8">Completed</h2>
          <ProjectGrid projects={completed} />
        </section>
      )}

      {projects.length === 0 && (
        <p className="text-stone-400">No projects yet — check back soon.</p>
      )}
    </div>
  )
}

type Project = {
  slug: string
  entry: {
    title: string
    description: string
    status: string
    technologies: string[]
    kpis: { metric: string; value: string }[]
    projectUrl: string
    coverImage: string | null
    startDate: string | null
    endDate: string | null
  }
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { entry } = project
  const card = (
    <article className="border border-stone-200 rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-sm transition-all h-full flex flex-col">
      {entry.coverImage && (
        <div className="relative w-full aspect-video bg-stone-100">
          <Image src={entry.coverImage} alt={entry.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        {/* Date range */}
        {entry.startDate && (
          <p className="text-xs text-stone-400 mb-3">
            {new Date(entry.startDate).getFullYear()}
            {entry.endDate && ` – ${new Date(entry.endDate).getFullYear()}`}
            {!entry.endDate && entry.status === 'ongoing' && ' – present'}
          </p>
        )}

        <h3 className="text-lg font-semibold text-stone-900 mb-2">{entry.title}</h3>
        <p className="text-sm text-stone-500 leading-relaxed mb-5 flex-1">{entry.description}</p>

        {/* KPIs */}
        {entry.kpis.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {entry.kpis.map((kpi, i) => (
              <div key={i} className="bg-teal-50 rounded-xl p-3">
                <p className="text-lg font-bold text-teal-700">{kpi.value}</p>
                <p className="text-xs text-teal-600">{kpi.metric}</p>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        {entry.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )

  if (entry.projectUrl) {
    return (
      <Link href={entry.projectUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {card}
      </Link>
    )
  }

  return card
}
