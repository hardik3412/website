import { cookies } from 'next/headers'
import AdminSidebar from './AdminSidebar'
import styles from './layout.module.css'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = cookies()
    const userId = cookieStore.get('session_user_id')
    const role = cookieStore.get('session_role')?.value || null

    // If no session, show content without sidebar (for login page)
    if (!userId) {
        return <>{children}</>
    }

    // Show sidebar for authenticated users
    return (
        <div className={styles.layout}>
            <AdminSidebar role={role} />
            <main className={styles.main}>{children}</main>
        </div>
    )
}
