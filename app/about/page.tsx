import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createReader } from '@keystatic/core/reader'
import { DocumentRenderer } from '@keystatic/core/renderer'
import keystaticConfig from '@/keystatic.config'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Amanda Nasario — bio, CV, and skills.',
}

const reader = createReader(process.cwd(), keystaticConfig)

export default async function AboutPage() {
  const about = await reader.singletons.about.read()

  if (!about) return null

  const bio = await about.bio()

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">About</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{about.name}</h1>
          <p className="text-xl text-stone-500 mb-8">{about.title}</p>
          {bio && (
            <div className="prose-custom">
              <DocumentRenderer document={bio} />
            </div>
          )}
          {about.cvUrl && (
            <a
              href={about.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full text-sm font-medium hover:border-stone-500 transition-colors"
            >
              ↓ Download CV / Resume
            </a>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {about.avatar && (
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Social links */}
          <div className="space-y-2">
            {about.email && (
              <a href={`mailto:${about.email}`} className="flex items-center gap-2 text-sm text-stone-600 hover:text-accent transition-colors">
                <span>✉</span> {about.email}
              </a>
            )}
            {about.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-600 hover:text-accent transition-colors">
                <span>in</span> LinkedIn
              </a>
            )}
            {about.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-600 hover:text-accent transition-colors">
                <span>⌥</span> GitHub
              </a>
            )}
            {about.twitter && (
              <a href={about.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-stone-600 hover:text-accent transition-colors">
                <span>𝕏</span> Twitter / X
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────── */}
      {about.skills.length > 0 && (
        <section className="mb-20 border-t border-stone-200 pt-16">
          <h2 className="text-xl font-semibold mb-8">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="border border-stone-200 text-stone-700 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── Contact ───────────────────────────────────────────────── */}
      <section id="contact" className="border-t border-stone-200 pt-16">
        <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
        <p className="text-stone-500 mb-6 max-w-lg">
          Have a project in mind or want to explore a collaboration? I&apos;d love to hear from you.
        </p>
        {about.email ? (
          <a
            href={`mailto:${about.email}`}
            className="inline-block bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            {about.email}
          </a>
        ) : (
          <Link
            href="/services"
            className="inline-block bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            View my services →
          </Link>
        )}
      </section>
    </div>
  )
}
