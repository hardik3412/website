import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

async function getStats(userId: string, role: string) {
    try {
        const isUser = role === 'USER'
        const where = isUser ? { userId } : { status: 'active' }

        const [projectCount, messageCount, unreadCount, featuredCount, totalEarnings] = await Promise.all([
            prisma.project.count({ where }),
            role === 'ADMIN' ? prisma.contactMessage.count() : 0,
            role === 'ADMIN' ? prisma.contactMessage.count({ where: { isRead: false } }) : 0,
            prisma.project.count({ where: { ...where, featured: true } }),
            prisma.sale.aggregate({
                where: isUser ? { sellerId: userId } : {},
                _sum: { amount: true }
            })
        ])

        return {
            projectCount,
            messageCount,
            unreadCount,
            featuredCount,
            earnings: totalEarnings._sum.amount || 0
        }
    } catch (error) {
        console.error('Failed to fetch stats:', error)
        return {
            projectCount: 0,
            messageCount: 0,
            unreadCount: 0,
            featuredCount: 0,
            earnings: 0
        }
    }
}

async function getRecentProjects(userId: string, role: string) {
    try {
        const where = role === 'USER' ? { userId } : {}
        return await prisma.project.findMany({
            where,
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, title: true, category: true, price: true, createdAt: true },
        })
    } catch (error) {
        console.error('Failed to fetch recent projects:', error)
        return []
    }
}

async function getRecentMessages() {
    try {
        return await prisma.contactMessage.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, subject: true, isRead: true, createdAt: true },
        })
    } catch (error) {
        console.error('Failed to fetch recent messages:', error)
        return []
    }
}

export default async function AdminDashboard() {
    const cookieStore = cookies()
    const userId = cookieStore.get('session_user_id')
    const username = cookieStore.get('session_username')
    const role = cookieStore.get('session_role')

    if (!userId || !role) {
        console.log('Dashboard: Missing session, redirecting to login')
        redirect('/admin/login')
    }

    console.log('Dashboard: Rendering for user', userId.value, 'with role', role.value)

    const [stats, recentProjects, recentMessages] = await Promise.all([
        getStats(userId.value, role.value),
        getRecentProjects(userId.value, role.value),
        role.value === 'ADMIN' ? getRecentMessages() : []
    ])

    const isAdmin = role.value === 'ADMIN'

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</h1>
                <p className={styles.subtitle}>Welcome back, {username?.value || 'User'}!</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📦</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.projectCount}</span>
                        <span className={styles.statLabel}>{isAdmin ? 'Total Projects' : 'Your Projects'}</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>${stats.earnings}</span>
                        <span className={styles.statLabel}>{isAdmin ? 'Global Earnings' : 'Your Earnings'}</span>
                    </div>
                </div>

                {isAdmin && (
                    <>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>📧</div>
                            <div className={styles.statContent}>
                                <span className={styles.statNumber}>{stats.messageCount}</span>
                                <span className={styles.statLabel}>Total Messages</span>
                            </div>
                        </div>

                        <div className={`${styles.statCard} ${stats.unreadCount > 0 ? styles.highlight : ''}`}>
                            <div className={styles.statIcon}>🔔</div>
                            <div className={styles.statContent}>
                                <span className={styles.statNumber}>{stats.unreadCount}</span>
                                <span className={styles.statLabel}>Unread</span>
                            </div>
                        </div>
                    </>
                )}

                {!isAdmin && (
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⭐</div>
                        <div className={styles.statContent}>
                            <span className={styles.statNumber}>{stats.featuredCount}</span>
                            <span className={styles.statLabel}>Featured Items</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className={styles.actions}>
                <Link href="/admin/projects/new" className="btn btn-primary">
                    + Add New Project
                </Link>
                {isAdmin && (
                    <Link href="/admin/messages" className="btn btn-secondary">
                        View All Messages
                    </Link>
                )}
            </div>

            {/* Content Grid */}
            <div className={styles.contentGrid}>
                {/* Recent Projects */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>{isAdmin ? 'Recent Projects' : 'Your Recent Projects'}</h2>
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

                {/* Recent Messages - Admin Only for now */}
                {isAdmin && (
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
                )}
            </div>
        </div>
    )
}
