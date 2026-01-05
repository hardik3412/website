'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

interface User {
    id: string
    username: string
    role: string
    createdAt: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users')
            if (!res.ok) throw new Error('Failed to fetch users')
            const data = await res.json()
            setUsers(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string, username: string) => {
        if (!confirm(`Are you sure you want to delete user "${username}"?`)) return

        try {
            const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Delete failed')
            }
            setUsers(users.filter(u => u.id !== id))
        } catch (err: any) {
            alert(err.message)
        }
    }

    if (loading) return <div className={styles.loading}>Loading users...</div>

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>User Management</h1>
                    <p className={styles.subtitle}>Manage system users and access levels</p>
                </div>
                <Link href="/admin/users/new" className="btn btn-primary">
                    + Add New User
                </Link>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <span>Username</span>
                    <span>Role</span>
                    <span>Created</span>
                    <span>Actions</span>
                </div>

                {users.map(user => (
                    <div key={user.id} className={styles.tableRow}>
                        <span className={styles.username}>{user.username}</span>
                        <span>
                            <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase()]}`}>
                                {user.role}
                            </span>
                        </span>
                        <span className={styles.date}>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                        <div className={styles.actions}>
                            <button
                                onClick={() => handleDelete(user.id, user.username)}
                                className={styles.deleteBtn}
                                title="Delete User"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}

                {users.length === 0 && (
                    <div className={styles.empty}>No users found.</div>
                )}
            </div>
        </div>
    )
}
