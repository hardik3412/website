import Link from 'next/link'
import styles from './ProjectCard.module.css'
import { formatPrice } from '@/lib/utils'

interface Project {
    id: string
    title: string
    description: string
    imageUrl: string
    price: number
    category: string
    technologies: string
    featured?: boolean
}

interface ProjectCardProps {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const techList = project.technologies.split(',').map((t) => t.trim()).slice(0, 3)

    return (
        <Link href={`/projects/${project.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={styles.image}
                />
                {project.featured && (
                    <span className={styles.featured}>⭐ Featured</span>
                )}
                <span className={styles.category}>{project.category}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.technologies}>
                    {techList.map((tech, idx) => (
                        <span key={idx} className={styles.tech}>
                            {tech}
                        </span>
                    ))}
                </div>

                <div className={styles.footer}>
                    <span className={styles.price}>{formatPrice(project.price)}</span>
                    <span className={styles.cta}>
                        View Details →
                    </span>
                </div>
            </div>
        </Link>
    )
}
