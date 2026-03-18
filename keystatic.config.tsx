import { config, collection, singleton, fields } from '@keystatic/core'

const isGithubMode =
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET

export default config({
  storage: isGithubMode
    ? {
        kind: 'github',
        repo: { owner: 'nasarioamn', name: 'amandanasario.com' },
        branchPrefix: 'keystatic/',
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Amanda Nasario — CMS' },
  },

  // ─── Singletons ────────────────────────────────────────────────────────────

  singletons: {
    about: singleton({
      label: 'About',
      path: 'content/about',
      format: { data: 'json' },
      schema: {
        name: fields.text({
          label: 'Full Name',
          defaultValue: 'Amanda Nasario',
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: 'Professional Title',
          defaultValue: 'Your Professional Title',
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: 'Tagline (short, displayed on homepage)',
          defaultValue: 'A short, punchy sentence about what you do.',
        }),
        bio: fields.document({
          label: 'Bio / About text',
          formatting: true,
          dividers: true,
          links: true,
        }),
        cvUrl: fields.text({
          label: 'CV / Resume URL (PDF)',
          description: 'Link to your hosted PDF resume, e.g. on Google Drive or Notion',
        }),
        email: fields.text({ label: 'Email' }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
        github: fields.text({ label: 'GitHub URL' }),
        twitter: fields.text({ label: 'Twitter / X URL' }),
        skills: fields.array(
          fields.text({ label: 'Skill' }),
          {
            label: 'Skills',
            description: 'List your key skills',
            itemLabel: (props) => props.fields.value,
          }
        ),
        avatar: fields.image({
          label: 'Profile Photo',
          directory: 'public/images',
          publicPath: '/images',
        }),
      },
    }),

    services: singleton({
      label: 'Services',
      path: 'content/services',
      format: { data: 'json' },
      schema: {
        intro: fields.text({
          label: 'Section Introduction',
          multiline: true,
          defaultValue: 'Here is how I can help you.',
        }),
        items: fields.array(
          fields.object({
            icon: fields.text({ label: 'Icon (emoji)', defaultValue: '✦' }),
            title: fields.text({ label: 'Service Title', validation: { isRequired: true } }),
            description: fields.text({
              label: 'Description',
              multiline: true,
              validation: { isRequired: true },
            }),
            price: fields.text({
              label: 'Starting price (optional)',
              description: 'e.g. "From €500" or "Custom quote"',
            }),
          }),
          {
            label: 'Services',
            itemLabel: (props) => props.fields.title.value || 'Untitled Service',
          }
        ),
        ctaText: fields.text({
          label: 'CTA Button Text',
          defaultValue: 'Get in touch',
        }),
      },
    }),
  },

  // ─── Collections ───────────────────────────────────────────────────────────

  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        publishedAt: fields.date({
          label: 'Published At',
          validation: { isRequired: true },
        }),
        updatedAt: fields.date({ label: 'Last Updated (optional)' }),
        summary: fields.text({
          label: 'Summary',
          multiline: true,
          description: 'Short description shown in article listings and meta tags',
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.fields.value,
          }
        ),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/articles',
          publicPath: '/images/articles',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/articles',
            publicPath: '/images/articles',
          },
        }),
      },
    }),

    projects: collection({
      label: 'Portfolio Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Project Title', validation: { isRequired: true } },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Ongoing', value: 'ongoing' },
            { label: 'Completed', value: 'completed' },
          ],
          defaultValue: 'completed',
        }),
        technologies: fields.array(
          fields.text({ label: 'Technology' }),
          {
            label: 'Technologies Used',
            itemLabel: (props) => props.fields.value,
          }
        ),
        kpis: fields.array(
          fields.object({
            metric: fields.text({ label: 'Metric name', defaultValue: 'Metric' }),
            value: fields.text({ label: 'Value', defaultValue: '0' }),
          }),
          {
            label: 'Success KPIs',
            description: 'Key performance indicators, e.g. "Revenue growth: +40%"',
            itemLabel: (props) =>
              props.fields.metric.value
                ? `${props.fields.metric.value}: ${props.fields.value.value}`
                : 'New KPI',
          }
        ),
        projectUrl: fields.text({ label: 'Project URL (optional)' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
        }),
        startDate: fields.date({ label: 'Start Date' }),
        endDate: fields.date({ label: 'End Date (leave empty if ongoing)' }),
      },
    }),
  },
})
