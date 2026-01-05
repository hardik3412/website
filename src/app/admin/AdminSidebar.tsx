'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './layout.module.css'

interface AdminSidebarProps {
    role: string | null
}

export default function AdminSidebar({ role }: AdminSidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/projects', label: 'Projects', icon: '📦' },
        ...(role === 'ADMIN' ? [
            { href: '/admin/users', label: 'Users', icon: '👥' },
            { href: '/admin/messages', label: 'Messages', icon: '📧' },
            { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
        ] : []),
    ]

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin'
        return pathname.startsWith(href)
    }

    const handleLogout = async () => {
        if (isLoggingOut) return
        
        setIsLoggingOut(true)
        try {
            await fetch('/api/admin', { method: 'DELETE' })
            router.push('/admin/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
            setIsLoggingOut(false)
        }
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <Link href="/admin" className={styles.logo}>
                    <span className={styles.logoIcon}>⚡</span>
                    <span className={styles.logoText}>Admin</span>
                </Link>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.sidebarFooter}>
                <Link href="/" className={styles.navItem}>
                    <span className={styles.navIcon}>🌐</span>
                    <span>View Site</span>
                </Link>
                <button 
                    onClick={handleLogout} 
                    className={styles.logoutBtn}
                    disabled={isLoggingOut}
                >
                    <span className={styles.navIcon}>🚪</span>
                    <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
            </div>
        </aside>
    )
}
