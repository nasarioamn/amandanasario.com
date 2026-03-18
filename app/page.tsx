import Link from 'next/link'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

export default async function HomePage() {
  const [about, articles, projects] = await Promise.all([
    reader.singletons.about.read(),
    reader.collections.articles.all(),
    reader.collections.projects.all(),
  ])

  const recentArticles = articles
    .filter((a) => a.entry.publishedAt)
    .sort((a, b) => (b.entry.publishedAt! > a.entry.publishedAt! ? 1 : -1))
    .slice(0, 3)

  const featuredProjects = projects
    .filter((p) => p.entry.status === 'ongoing')
    .slice(0, 3)
    .concat(projects.filter((p) => p.entry.status === 'completed').slice(0, 3))
    .slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
          Welcome
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight mb-6">
          {about?.name ?? 'Amanda Nasario'}
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mb-4">
          {about?.title ?? 'Your Professional Title'}
        </p>
        {about?.tagline && (
          <p className="text-stone-500 max-w-xl mb-10">{about.tagline}</p>
        )}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/about"
            className="bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            About me
          </Link>
          <Link
            href="/services"
            className="border border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:border-stone-500 hover:text-stone-900 transition-colors"
          >
            My services
          </Link>
        </div>
      </section>

      {/* ── Recent Articles ──────────────────────────────────────── */}
      {recentArticles.length > 0 && (
        <section className="py-16 border-t border-stone-200">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold text-stone-900">Recent Articles</h2>
            <Link href="/articles" className="text-sm text-accent hover:underline">
              All articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col">
                  <time className="text-xs text-stone-400 mb-2">
                    {new Date(article.entry.publishedAt!).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <h3 className="font-semibold text-stone-900 group-hover:text-accent transition-colors mb-2 leading-snug">
                    {article.entry.title}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-3 flex-1">
                    {article.entry.summary}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured Projects ────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-16 border-t border-stone-200">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold text-stone-900">Selected Work</h2>
            <Link href="/portfolio" className="text-sm text-accent hover:underline">
              Full portfolio →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="border border-stone-200 rounded-2xl p-6 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      project.entry.status === 'ongoing'
                        ? 'bg-teal-400 animate-pulse'
                        : 'bg-stone-300'
                    }`}
                  />
                  <span className="text-xs text-stone-400 capitalize">
                    {project.entry.status}
                  </span>
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{project.entry.title}</h3>
                <p className="text-sm text-stone-500 line-clamp-2 mb-4">
                  {project.entry.description}
                </p>
                {project.entry.kpis.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.entry.kpis.slice(0, 2).map((kpi, i) => (
                      <span
                        key={i}
                        className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-md"
                      >
                        {kpi.metric}: {kpi.value}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-stone-200 mb-8">
        <div className="bg-stone-900 text-white rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-stone-400 mb-8 max-w-md mx-auto">
            I&apos;m open to new projects and collaborations. Reach out and let&apos;s explore
            what we can build together.
          </p>
          <Link
            href="/about#contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
