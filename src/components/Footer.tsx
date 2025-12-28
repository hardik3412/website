import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>⚡</span>
                            <span className={styles.logoText}>ProjectHub</span>
                        </Link>
                        <p className={styles.tagline}>
                            Premium digital projects for developers and businesses.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <h4 className={styles.linksTitle}>Quick Links</h4>
                        <nav className={styles.linksNav}>
                            <Link href="/">Home</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact</Link>
                        </nav>
                    </div>

                    <div className={styles.links}>
                        <h4 className={styles.linksTitle}>Categories</h4>
                        <nav className={styles.linksNav}>
                            <Link href="/?category=E-Commerce">E-Commerce</Link>
                            <Link href="/?category=Dashboard">Dashboard</Link>
                            <Link href="/?category=AI/ML">AI/ML</Link>
                            <Link href="/?category=Portfolio">Portfolio</Link>
                        </nav>
                    </div>

                    <div className={styles.newsletter}>
                        <h4 className={styles.linksTitle}>Stay Updated</h4>
                        <p className={styles.newsletterText}>
                            Get notified about new projects and updates.
                        </p>
                        <form className={styles.form}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={styles.input}
                            />
                            <button type="submit" className={styles.submitBtn}>
                                →
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} ProjectHub. All rights reserved.
                    </p>
                    <div className={styles.socials}>
                        <a href="#" aria-label="Twitter" className={styles.social}>
                            𝕏
                        </a>
                        <a href="#" aria-label="GitHub" className={styles.social}>
                            ⌘
                        </a>
                        <a href="#" aria-label="LinkedIn" className={styles.social}>
                            in
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
