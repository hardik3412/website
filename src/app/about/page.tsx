import { prisma } from '@/lib/prisma'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn more about ProjectHub, our mission, values, and the team behind these premium digital solutions.',
}

async function getSettings() {
    const settings = await prisma.siteSetting.findMany()
    return settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>)
}

export default async function AboutPage() {
    const settings = await getSettings()

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <h1 className={styles.title}>
                        About <span className="gradient-text">ProjectHub</span>
                    </h1>
                    <p className={styles.subtitle}>
                        We're passionate about creating high-quality digital solutions that help developers and businesses succeed.
                    </p>
                </section>

                {/* Story Section */}
                <section className={styles.section}>
                    <div className={styles.content}>
                        <h2 className={styles.sectionTitle}>Our Story</h2>
                        <p className={styles.text}>
                            {settings.aboutContent || 'We are a team of passionate developers creating premium digital solutions. Our projects are built with the latest technologies and best practices to ensure quality and maintainability.'}
                        </p>
                        <p className={styles.text}>
                            Founded with a simple mission: to provide developers and businesses with production-ready, high-quality code that saves time and accelerates their projects. We believe that great software should be accessible to everyone.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Our Values</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>🎯</div>
                            <h3 className={styles.valueTitle}>Quality First</h3>
                            <p className={styles.valueText}>
                                Every project is built with clean code, best practices, and thorough documentation.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>🚀</div>
                            <h3 className={styles.valueTitle}>Performance</h3>
                            <p className={styles.valueText}>
                                Optimized for speed and efficiency, our solutions are built to scale.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>🛡️</div>
                            <h3 className={styles.valueTitle}>Security</h3>
                            <p className={styles.valueText}>
                                Security is baked in from the start, following industry standards and best practices.
                            </p>
                        </div>
                        <div className={styles.valueCard}>
                            <div className={styles.valueIcon}>💬</div>
                            <h3 className={styles.valueTitle}>Support</h3>
                            <p className={styles.valueText}>
                                We're here to help. Get dedicated support for all your questions and needs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Meet the Team</h2>
                    <div className={styles.teamGrid}>
                        <div className={styles.teamCard}>
                            <div className={styles.teamAvatar}>👨‍💻</div>
                            <h3 className={styles.teamName}>Alex Johnson</h3>
                            <p className={styles.teamRole}>Founder & Lead Developer</p>
                            <p className={styles.teamBio}>
                                10+ years of experience in full-stack development. Passionate about clean architecture.
                            </p>
                        </div>
                        <div className={styles.teamCard}>
                            <div className={styles.teamAvatar}>👩‍💻</div>
                            <h3 className={styles.teamName}>Sarah Chen</h3>
                            <p className={styles.teamRole}>UI/UX Designer</p>
                            <p className={styles.teamBio}>
                                Creates beautiful, intuitive interfaces that users love. Design system enthusiast.
                            </p>
                        </div>
                        <div className={styles.teamCard}>
                            <div className={styles.teamAvatar}>🧑‍💻</div>
                            <h3 className={styles.teamName}>Mike Williams</h3>
                            <p className={styles.teamRole}>Backend Developer</p>
                            <p className={styles.teamBio}>
                                Expert in scalable architectures and database optimization. Performance perfectionist.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>50+</span>
                        <span className={styles.statLabel}>Projects Delivered</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1000+</span>
                        <span className={styles.statLabel}>Happy Customers</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>5⭐</span>
                        <span className={styles.statLabel}>Average Rating</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>24/7</span>
                        <span className={styles.statLabel}>Support Available</span>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.cta}>
                    <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
                    <p className={styles.ctaText}>
                        Browse our collection of premium projects or reach out for custom solutions.
                    </p>
                    <div className={styles.ctaButtons}>
                        <a href="/" className="btn btn-primary btn-lg">
                            Browse Projects
                        </a>
                        <a href="/contact" className="btn btn-secondary btn-lg">
                            Contact Us
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}
