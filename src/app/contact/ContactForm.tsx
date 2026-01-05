'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            setStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            setStatus('error')
            setErrorMessage('Failed to send message. Please try again.')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (status === 'success') {
        return (
            <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
                <button
                    className="btn btn-secondary"
                    onClick={() => setStatus('idle')}
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Your Name
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
                        Email Address
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
                <label htmlFor="subject" className="form-label">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="How can we help you?"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us more about your project or question..."
                    rows={6}
                    required
                />
            </div>

            {status === 'error' && (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={status === 'loading'}
                style={{ width: '100%' }}
            >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
