import styles from './page.module.css'
import ContactForm from './ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the ProjectHub team for questions, custom projects, or support.',
}

export default function ContactPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <h1 className={styles.title}>
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Have a question or want to work together? We'd love to hear from you.
                    </p>
                </section>

                <div className={styles.layout}>
                    {/* Contact Form */}
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Send us a Message</h2>
                        <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>Contact Information</h2>

                        <div className={styles.infoCards}>
                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>📧</div>
                                <h3 className={styles.infoTitle}>Email</h3>
                                <p className={styles.infoText}>hardik3412@gmail.com</p>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>📍</div>
                                <h3 className={styles.infoTitle}>Address</h3>
                                <p className={styles.infoText}>123 Tech Street, Silicon Valley, CA 94025</p>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>📞</div>
                                <h3 className={styles.infoTitle}>Phone</h3>
                                <p className={styles.infoText}>+91 8882316778</p>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>🕒</div>
                                <h3 className={styles.infoTitle}>Business Hours</h3>
                                <p className={styles.infoText}>Mon - Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>

                        <div className={styles.social}>
                            <h3 className={styles.socialTitle}>Follow Us</h3>
                            <div className={styles.socialLinks}>
                                <a href="#" className={styles.socialLink}>𝕏</a>
                                <a href="#" className={styles.socialLink}>⌘</a>
                                <a href="#" className={styles.socialLink}>in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
