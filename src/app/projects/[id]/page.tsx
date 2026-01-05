import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatPrice, formatDate } from '@/lib/utils'
import styles from './page.module.css'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

async function getProject(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
        })
        return project
    } catch (error) {
        console.error('Failed to fetch project:', error)
        return null
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const project = await getProject(params.id)
    if (!project) return { title: 'Project Not Found' }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [project.imageUrl],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: [project.imageUrl],
        },
    }
}

async function getRelatedProjects(category: string, excludeId: string) {
    try {
        return await prisma.project.findMany({
            where: {
                category,
                id: { not: excludeId },
                status: 'active',
            },
            take: 3,
        })
    } catch (error) {
        console.error('Failed to fetch related projects:', error)
        return []
    }
}

interface ProjectPageProps {
    params: { id: string }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProject(params.id)

    if (!project) {
        notFound()
    }

    const relatedProjects = await getRelatedProjects(project.category, project.id)
    const techList = project.technologies.split(',').map((t) => t.trim())

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href={`/?category=${encodeURIComponent(project.category)}`}>
                        {project.category}
                    </Link>
                    <span>/</span>
                    <span>{project.title}</span>
                </nav>

                <div className={styles.layout}>
                    {/* Main Content */}
                    <div className={styles.main}>
                        {/* Project Image */}
                        <div className={styles.imageWrapper}>
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className={styles.image}
                            />
                            {project.featured && (
                                <span className={styles.featured}>⭐ Featured Project</span>
                            )}
                        </div>

                        {/* Project Info */}
                        <div className={styles.content}>
                            <div className={styles.header}>
                                <span className={styles.category}>{project.category}</span>
                                <h1 className={styles.title}>{project.title}</h1>
                                <p className={styles.description}>{project.description}</p>
                            </div>

                            {/* Technologies */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Technologies Used</h3>
                                <div className={styles.technologies}>
                                    {techList.map((tech, idx) => (
                                        <span key={idx} className={styles.tech}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Long Description */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>About This Project</h3>
                                <div className={styles.longDescription}>
                                    {project.longDescription.split('\n').map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            {(project.demoUrl || project.sourceUrl) && (
                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>Project Links</h3>
                                    <div className={styles.links}>
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-secondary"
                                            >
                                                🔗 Live Demo
                                            </a>
                                        )}
                                        {project.sourceUrl && (
                                            <a
                                                href={project.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-ghost"
                                            >
                                                📁 Source Preview
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.purchaseCard}>
                            <div className={styles.priceWrapper}>
                                <span className={styles.priceLabel}>Price</span>
                                <span className={styles.price}>{formatPrice(project.price)}</span>
                            </div>

                            <ul className={styles.features}>
                                <li>✓ Full source code</li>
                                <li>✓ Documentation included</li>
                                <li>✓ Free updates</li>
                                <li>✓ 30-day support</li>
                                <li>✓ Commercial license</li>
                            </ul>

                            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                Purchase Now
                            </button>

                            <p className={styles.guarantee}>
                                🛡️ 30-day money-back guarantee
                            </p>
                        </div>

                        <div className={styles.metaCard}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Last Updated</span>
                                <span className={styles.metaValue}>
                                    {formatDate(project.updatedAt)}
                                </span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Category</span>
                                <span className={styles.metaValue}>{project.category}</span>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <section className={styles.related}>
                        <h2 className={styles.relatedTitle}>Related Projects</h2>
                        <div className={styles.relatedGrid}>
                            {relatedProjects.map((p) => (
                                <Link key={p.id} href={`/projects/${p.id}`} className={styles.relatedCard}>
                                    <img
                                        src={p.imageUrl}
                                        alt={p.title}
                                        className={styles.relatedImage}
                                    />
                                    <div className={styles.relatedContent}>
                                        <h4 className={styles.relatedCardTitle}>{p.title}</h4>
                                        <span className={styles.relatedPrice}>
                                            {formatPrice(p.price)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
