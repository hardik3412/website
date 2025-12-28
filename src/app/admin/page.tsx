import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

async function getStats() {
    const [projectCount, messageCount, unreadCount, featuredCount] = await Promise.all([
        prisma.project.count({ where: { status: 'active' } }),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { isRead: false } }),
        prisma.project.count({ where: { featured: true } }),
    ])

    return { projectCount, messageCount, unreadCount, featuredCount }
}

async function getRecentProjects() {
    return prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, category: true, price: true, createdAt: true },
    })
}

async function getRecentMessages() {
    return prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, subject: true, isRead: true, createdAt: true },
    })
}

export default async function AdminDashboard() {
    const cookieStore = cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
        redirect('/admin/login')
    }

    const [stats, recentProjects, recentMessages] = await Promise.all([
        getStats(),
        getRecentProjects(),
        getRecentMessages(),
    ])

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.subtitle}>Welcome back, {session.value}!</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📦</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.projectCount}</span>
                        <span className={styles.statLabel}>Active Projects</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⭐</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.featuredCount}</span>
                        <span className={styles.statLabel}>Featured</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📧</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.messageCount}</span>
                        <span className={styles.statLabel}>Messages</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${stats.unreadCount > 0 ? styles.highlight : ''}`}>
                    <div className={styles.statIcon}>🔔</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.unreadCount}</span>
                        <span className={styles.statLabel}>Unread</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.actions}>
                <Link href="/admin/projects/new" className="btn btn-primary">
                    + Add New Project
                </Link>
                <Link href="/admin/messages" className="btn btn-secondary">
                    View All Messages
                </Link>
            </div>

            {/* Content Grid */}
            <div className={styles.contentGrid}>
                {/* Recent Projects */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Recent Projects</h2>
                        <Link href="/admin/projects" className={styles.cardLink}>
                            View All →
                        </Link>
                    </div>
                    <div className={styles.list}>
                        {recentProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/admin/projects/${project.id}`}
                                className={styles.listItem}
                            >
                                <div className={styles.listContent}>
                                    <span className={styles.listTitle}>{project.title}</span>
                                    <span className={styles.listMeta}>{project.category}</span>
                                </div>
                                <span className={styles.listPrice}>${project.price}</span>
                            </Link>
                        ))}
                        {recentProjects.length === 0 && (
                            <p className={styles.empty}>No projects yet</p>
                        )}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Recent Messages</h2>
                        <Link href="/admin/messages" className={styles.cardLink}>
                            View All →
                        </Link>
                    </div>
                    <div className={styles.list}>
                        {recentMessages.map((message) => (
                            <Link
                                key={message.id}
                                href="/admin/messages"
                                className={`${styles.listItem} ${!message.isRead ? styles.unread : ''}`}
                            >
                                <div className={styles.listContent}>
                                    <span className={styles.listTitle}>{message.name}</span>
                                    <span className={styles.listMeta}>{message.subject}</span>
                                </div>
                                {!message.isRead && <span className={styles.badge}>New</span>}
                            </Link>
                        ))}
                        {recentMessages.length === 0 && (
                            <p className={styles.empty}>No messages yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
