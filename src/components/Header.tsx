'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ]

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/CraftKaro-removebg-preview.png"
                        alt="CraftKaro"
                        width={450}
                        height={120}
                        className={styles.logoImage}
                        priority
                    />
                </Link>

                <nav className={styles.nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <Link href="/admin" className={styles.adminLink}>
                        Admin
                    </Link>
                </div>

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`} />
                </button>

                {mobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={styles.mobileLink}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/admin"
                            className={styles.mobileLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Admin Panel
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}
