import type { Metadata } from 'next'
import Link from 'next/link'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Thoughts, insights, and learnings by Amanda Nasario.',
}

const reader = createReader(process.cwd(), keystaticConfig)

export default async function ArticlesPage() {
  const articles = await reader.collections.articles.all()

  const sorted = articles
    .filter((a) => a.entry.publishedAt)
    .sort((a, b) => (b.entry.publishedAt! > a.entry.publishedAt! ? 1 : -1))

  // Group by year
  const byYear: Record<string, typeof sorted> = {}
  for (const article of sorted) {
    const year = new Date(article.entry.publishedAt!).getFullYear().toString()
    if (!byYear[year]) byYear[year] = []
    byYear[year].push(article)
  }

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Writing</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Articles</h1>
      <p className="text-stone-500 mb-16 max-w-xl">
        Thoughts, insights, and learnings from my work.
      </p>

      {sorted.length === 0 ? (
        <p className="text-stone-400">No articles yet — check back soon.</p>
      ) : (
        <div className="space-y-16">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-sm font-medium text-stone-400 tracking-widest uppercase mb-6">
                {year}
              </h2>
              <ul className="space-y-8">
                {byYear[year].map((article) => (
                  <li key={article.slug}>
                    <Link href={`/articles/${article.slug}`} className="group block">
                      <div className="flex items-start gap-4 md:gap-8">
                        <time className="text-sm text-stone-400 shrink-0 mt-0.5 w-16">
                          {new Date(article.entry.publishedAt!).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </time>
                        <div>
                          <h3 className="font-semibold text-stone-900 group-hover:text-accent transition-colors mb-1">
                            {article.entry.title}
                          </h3>
                          <p className="text-sm text-stone-500 leading-relaxed">
                            {article.entry.summary}
                          </p>
                          {article.entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {article.entry.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
