'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

interface Project {
    id: string
    title: string
    description: string
    imageUrl: string
    price: number
    category: string
    status: string
    featured: boolean
    createdAt: string
}

export default function AdminProjectsPage() {
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState<string | null>(null)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects')
            const data = await res.json()
            setProjects(data)
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        setDeleting(id)
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id))
            }
        } catch (error) {
            console.error('Failed to delete project:', error)
        } finally {
            setDeleting(null)
        }
    }

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>Loading projects...</div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Projects</h1>
                    <p className={styles.subtitle}>Manage your project listings</p>
                </div>
                <Link href="/admin/projects/new" className="btn btn-primary">
                    + Add New Project
                </Link>
            </div>

            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <span className={styles.colImage}>Image</span>
                    <span className={styles.colTitle}>Title</span>
                    <span className={styles.colCategory}>Category</span>
                    <span className={styles.colPrice}>Price</span>
                    <span className={styles.colStatus}>Status</span>
                    <span className={styles.colActions}>Actions</span>
                </div>

                {projects.map((project) => (
                    <div key={project.id} className={styles.tableRow}>
                        <div className={styles.colImage}>
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className={styles.projectImage}
                            />
                        </div>
                        <div className={styles.colTitle}>
                            <span className={styles.projectTitle}>{project.title}</span>
                            {project.featured && (
                                <span className={styles.featuredBadge}>⭐ Featured</span>
                            )}
                        </div>
                        <span className={styles.colCategory}>{project.category}</span>
                        <span className={styles.colPrice}>${project.price}</span>
                        <span className={styles.colStatus}>
                            <span className={`${styles.statusBadge} ${styles[project.status]}`}>
                                {project.status}
                            </span>
                        </span>
                        <div className={styles.colActions}>
                            <Link
                                href={`/admin/projects/${project.id}`}
                                className={styles.actionBtn}
                            >
                                ✏️
                            </Link>
                            <Link
                                href={`/projects/${project.id}`}
                                target="_blank"
                                className={styles.actionBtn}
                            >
                                👁️
                            </Link>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                disabled={deleting === project.id}
                            >
                                {deleting === project.id ? '...' : '🗑️'}
                            </button>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className={styles.empty}>
                        <p>No projects found.</p>
                        <Link href="/admin/projects/new" className="btn btn-primary">
                            Add Your First Project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
