import { prisma } from '@/lib/prisma'
import ProjectCard from '@/components/ProjectCard'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Explore Projects',
    description: 'Browse our extensive collection of premium digital projects, templates, and source code.',
}

async function getProjects(category?: string) {
    const where = category ? { category, status: 'active' } : { status: 'active' }
    return prisma.project.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })
}

async function getCategories() {
    const projects = await prisma.project.findMany({
        where: { status: 'active' },
        select: { category: true },
        distinct: ['category'],
    })
    return projects.map((p) => p.category)
}

async function getSettings() {
    const settings = await prisma.siteSetting.findMany()
    return settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>)
}

interface HomePageProps {
    searchParams: { category?: string }
}

export default async function HomePage({ searchParams }: HomePageProps) {
    const [projects, categories, settings] = await Promise.all([
        getProjects(searchParams.category),
        getCategories(),
        getSettings(),
    ])

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        {settings.heroTitle || 'Premium Digital Projects'}
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {settings.heroSubtitle || 'Discover high-quality, ready-to-use projects for your next venture'}
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{projects.length}+</span>
                            <span className={styles.statLabel}>Projects</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Source Code</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>24/7</span>
                            <span className={styles.statLabel}>Support</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroGlow} />
            </section>

            {/* Projects Section */}
            <section className={styles.projects}>
                <div className={styles.projectsHeader}>
                    <h2 className={styles.sectionTitle}>
                        <span className="gradient-text">Explore</span> Our Projects
                    </h2>

                    {/* Category Filters */}
                    <div className={styles.filters}>
                        <a
                            href="/"
                            className={`${styles.filterBtn} ${!searchParams.category ? styles.active : ''}`}
                        >
                            All
                        </a>
                        {categories.map((cat) => (
                            <a
                                key={cat}
                                href={`/?category=${encodeURIComponent(cat)}`}
                                className={`${styles.filterBtn} ${searchParams.category === cat ? styles.active : ''}`}
                            >
                                {cat}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className={styles.grid}>
                    {projects.map((project, idx) => (
                        <div
                            key={project.id}
                            className={styles.gridItem}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className={styles.empty}>
                        <p>No projects found in this category.</p>
                        <a href="/" className="btn btn-secondary">
                            View All Projects
                        </a>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>Have a Custom Project in Mind?</h2>
                    <p className={styles.ctaText}>
                        We can build custom solutions tailored to your specific needs.
                    </p>
                    <a href="/contact" className="btn btn-primary btn-lg">
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    )
}
