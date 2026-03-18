import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'
import keystaticConfig from '@/keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = await reader.collections.articles.all()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await reader.collections.articles.read(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await reader.collections.articles.read(params.slug)
  if (!article) notFound()

  const content = await article.content()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link href="/articles" className="text-sm text-stone-400 hover:text-accent transition-colors inline-flex items-center gap-1 mb-12">
        ← All articles
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          {article.publishedAt && (
            <time className="text-sm text-stone-400">
              {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          )}
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <span className="text-xs text-stone-300">
              · updated{' '}
              {new Date(article.updatedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-stone-500">{article.summary}</p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose-custom">
        <DocumentRenderer document={content} />
      </div>

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-stone-200">
        <Link href="/articles" className="text-sm text-accent hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </div>
  )
}
