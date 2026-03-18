import type { Metadata } from 'next'
import Link from 'next/link'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services offered by Amanda Nasario.',
}

const reader = createReader(process.cwd(), keystaticConfig)

export default async function ServicesPage() {
  const services = await reader.singletons.services.read()
  const about = await reader.singletons.about.read()

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <section className="mb-20">
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">Services</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How I can help</h1>
        {services?.intro && (
          <p className="text-lg text-stone-500 max-w-2xl">{services.intro}</p>
        )}
      </section>

      {/* Services grid */}
      {services && services.items.length > 0 && (
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.items.map((item, i) => (
              <div
                key={i}
                className="border border-stone-200 rounded-2xl p-8 hover:border-accent/50 hover:shadow-sm transition-all"
              >
                {item.icon && (
                  <span className="text-3xl block mb-5">{item.icon}</span>
                )}
                <h2 className="text-lg font-semibold text-stone-900 mb-3">{item.title}</h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-5">{item.description}</p>
                {item.price && (
                  <p className="text-sm font-medium text-accent">{item.price}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process section */}
      <section className="mb-20 border-t border-stone-200 pt-16">
        <h2 className="text-xl font-semibold mb-10">How I work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Discovery call',
              desc: 'We talk through your needs, goals, and constraints to see if we are a good fit.',
            },
            {
              step: '02',
              title: 'Proposal',
              desc: 'I put together a tailored scope of work with timeline and investment.',
            },
            {
              step: '03',
              title: 'Delivery',
              desc: 'I execute with clear communication and deliver measurable outcomes.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <span className="text-2xl font-bold text-stone-200 shrink-0">{step}</span>
              <div>
                <h3 className="font-medium text-stone-900 mb-1">{title}</h3>
                <p className="text-sm text-stone-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-white rounded-3xl p-10 md:p-14 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-stone-400 mb-8 max-w-md mx-auto">
          Let&apos;s talk about your project. I respond to all inquiries within 24 hours.
        </p>
        {about?.email ? (
          <a
            href={`mailto:${about.email}`}
            className="inline-block bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            {services?.ctaText ?? 'Get in touch'}
          </a>
        ) : (
          <Link
            href="/about#contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            {services?.ctaText ?? 'Get in touch'}
          </Link>
        )}
      </section>
    </div>
  )
}
