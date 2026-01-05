'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function CustomProjectForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        features: '',
        references: '',
        additionalNotes: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const response = await fetch('/api/custom-project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to send request')
            }

            setStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                projectType: '',
                budget: '',
                timeline: '',
                description: '',
                features: '',
                references: '',
                additionalNotes: '',
            })
        } catch (error) {
            setStatus('error')
            setErrorMessage('Failed to send request. Please try again.')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (status === 'success') {
        return (
            <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Request Submitted!</h3>
                <p>Thank you for your custom project request. We'll review it and get back to you within 24 hours.</p>
                <button
                    className="btn btn-secondary"
                    onClick={() => setStatus('idle')}
                >
                    Submit Another Request
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* Contact Information */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <div className={styles.formRow}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                        Phone Number (Optional)
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>
            </div>

            {/* Project Details */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Project Details</h2>
                <div className={styles.formRow}>
                    <div className="form-group">
                        <label htmlFor="projectType" className="form-label">
                            Project Type *
                        </label>
                        <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select a type...</option>
                            <option value="website">Website</option>
                            <option value="webapp">Web Application</option>
                            <option value="mobileapp">Mobile App</option>
                            <option value="ecommerce">E-commerce</option>
                            <option value="api">API/Backend</option>
                            <option value="database">Database Design</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="budget" className="form-label">
                            Budget Range *
                        </label>
                        <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="form-input"
                            required
                        >
                            <option value="">Select budget...</option>
                            <option value="under-50k">Under ₹50,000</option>
                            <option value="50k-2l">₹50,000 - ₹2,00,000</option>
                            <option value="2l-5l">₹2,00,000 - ₹5,00,000</option>
                            <option value="5l-10l">₹5,00,000 - ₹10,00,000</option>
                            <option value="10l-plus">₹10,00,000+</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="timeline" className="form-label">
                        Desired Timeline *
                    </label>
                    <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        <option value="">Select timeline...</option>
                        <option value="urgent">ASAP (1-2 weeks)</option>
                        <option value="fast">Fast (2-4 weeks)</option>
                        <option value="normal">Normal (1-2 months)</option>
                        <option value="flexible">Flexible (2+ months)</option>
                    </select>
                </div>
            </div>

            {/* Project Requirements */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Project Requirements</h2>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Project Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-input"
                        rows={5}
                        placeholder="Describe your project, its purpose, and target audience..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="features" className="form-label">
                        Key Features & Functionality *
                    </label>
                    <textarea
                        id="features"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        className="form-input"
                        rows={5}
                        placeholder="List the main features you need (e.g., user authentication, payment processing, real-time chat...)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="references" className="form-label">
                        Design References (Optional)
                    </label>
                    <textarea
                        id="references"
                        name="references"
                        value={formData.references}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="Share links to websites or designs you like..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="additionalNotes" className="form-label">
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="form-input"
                        rows={4}
                        placeholder="Any other details you'd like to share..."
                    />
                </div>
            </div>

            {status === 'error' && (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{ width: '100%' }}
            >
                {status === 'loading' ? 'Sending Request...' : 'Submit Project Request'}
            </button>
        </form>
    )
}
