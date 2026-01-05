'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ImageUpload'
import styles from './page.module.css'

export default function NewProjectPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        longDescription: '',
        imageUrl: '',
        price: '',
        category: '',
        technologies: '',
        demoUrl: '',
        sourceUrl: '',
        status: 'active',
        featured: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                throw new Error('Failed to create project')
            }

            router.push('/admin/projects')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        })
    }

    const categories = [
        'E-Commerce',
        'Dashboard',
        'AI/ML',
        'Portfolio',
        'Productivity',
        'Health & Fitness',
        'Education',
        'Social',
        'Other',
    ]

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Add New Project</h1>
                <p className={styles.subtitle}>Create a new project listing</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    {/* Basic Info */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Basic Information</h2>

                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="E-Commerce Platform"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Short Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-textarea"
                                placeholder="Brief description for the project card..."
                                rows={3}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longDescription" className="form-label">
                                Full Description *
                            </label>
                            <textarea
                                id="longDescription"
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleChange}
                                className="form-textarea"
                                placeholder="Detailed description with features, tech stack, use cases..."
                                rows={8}
                                required
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Project Details</h2>

                        <div className={styles.formRow}>
                            <div className="form-group">
                                <label htmlFor="price" className="form-label">
                                    Price (USD) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="99"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category" className="form-label">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="technologies" className="form-label">
                                Technologies *
                            </label>
                            <input
                                type="text"
                                id="technologies"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="React, Node.js, PostgreSQL"
                                required
                            />
                            <small className={styles.hint}>
                                Comma-separated list of technologies
                            </small>
                        </div>

                        <ImageUpload
                            value={formData.imageUrl}
                            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                            label="Project Image"
                        />

                        <div className={styles.formRow}>
                            <div className="form-group">
                                <label htmlFor="demoUrl" className="form-label">
                                    Demo URL
                                </label>
                                <input
                                    type="url"
                                    id="demoUrl"
                                    name="demoUrl"
                                    value={formData.demoUrl}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="https://demo.example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sourceUrl" className="form-label">
                                    Source Preview URL
                                </label>
                                <input
                                    type="url"
                                    id="sourceUrl"
                                    name="sourceUrl"
                                    value={formData.sourceUrl}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className="form-group">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Featured</label>
                                <div className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="featured">
                                        Show as featured project
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}
