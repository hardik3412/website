'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Settings {
    siteName: string
    heroTitle: string
    heroSubtitle: string
    aboutTitle: string
    aboutContent: string
    contactEmail: string
    contactPhone: string
    contactAddress: string
}

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [settings, setSettings] = useState<Settings>({
        siteName: '',
        heroTitle: '',
        heroSubtitle: '',
        aboutTitle: '',
        aboutContent: '',
        contactEmail: '',
        contactPhone: '',
        contactAddress: '',
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            const data = await res.json()
            setSettings({ ...settings, ...data })
        } catch (error) {
            console.error('Failed to fetch settings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setSuccess(false)

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            })

            if (res.ok) {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            }
        } catch (error) {
            console.error('Failed to save settings:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSettings({ ...settings, [e.target.name]: e.target.value })
    }

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>Loading settings...</div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Site Settings</h1>
                <p className={styles.subtitle}>Customize your website content</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* General Settings */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>General</h2>

                    <div className="form-group">
                        <label htmlFor="siteName" className="form-label">
                            Site Name
                        </label>
                        <input
                            type="text"
                            id="siteName"
                            name="siteName"
                            value={settings.siteName}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="ProjectHub"
                        />
                    </div>
                </div>

                {/* Hero Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Homepage Hero</h2>

                    <div className="form-group">
                        <label htmlFor="heroTitle" className="form-label">
                            Hero Title
                        </label>
                        <input
                            type="text"
                            id="heroTitle"
                            name="heroTitle"
                            value={settings.heroTitle}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Premium Digital Projects"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="heroSubtitle" className="form-label">
                            Hero Subtitle
                        </label>
                        <textarea
                            id="heroSubtitle"
                            name="heroSubtitle"
                            value={settings.heroSubtitle}
                            onChange={handleChange}
                            className="form-textarea"
                            rows={2}
                            placeholder="Discover high-quality, ready-to-use projects..."
                        />
                    </div>
                </div>

                {/* About Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>About Page</h2>

                    <div className="form-group">
                        <label htmlFor="aboutTitle" className="form-label">
                            About Title
                        </label>
                        <input
                            type="text"
                            id="aboutTitle"
                            name="aboutTitle"
                            value={settings.aboutTitle}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="About Us"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="aboutContent" className="form-label">
                            About Content
                        </label>
                        <textarea
                            id="aboutContent"
                            name="aboutContent"
                            value={settings.aboutContent}
                            onChange={handleChange}
                            className="form-textarea"
                            rows={5}
                            placeholder="Tell your story..."
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Information</h2>

                    <div className={styles.formRow}>
                        <div className="form-group">
                            <label htmlFor="contactEmail" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="contactEmail"
                                name="contactEmail"
                                value={settings.contactEmail}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="contact@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contactPhone" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="contactPhone"
                                name="contactPhone"
                                value={settings.contactPhone}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            id="contactAddress"
                            name="contactAddress"
                            value={settings.contactAddress}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="123 Tech Street, Silicon Valley, CA"
                        />
                    </div>
                </div>

                {success && (
                    <div className={styles.success}>
                        ✓ Settings saved successfully!
                    </div>
                )}

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    )
}
