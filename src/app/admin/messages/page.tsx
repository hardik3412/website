'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import { formatDate } from '@/lib/utils'

interface Message {
    id: string
    name: string
    email: string
    subject: string
    message: string
    isRead: boolean
    createdAt: string
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact')
            const data = await res.json()
            setMessages(data)
        } catch (error) {
            console.error('Failed to fetch messages:', error)
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (id: string) => {
        try {
            await fetch(`/api/contact/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: true }),
            })
            setMessages(
                messages.map((m) =>
                    m.id === id ? { ...m, isRead: true } : m
                )
            )
        } catch (error) {
            console.error('Failed to update message:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            await fetch(`/api/contact/${id}`, { method: 'DELETE' })
            setMessages(messages.filter((m) => m.id !== id))
            if (selectedMessage?.id === id) {
                setSelectedMessage(null)
            }
        } catch (error) {
            console.error('Failed to delete message:', error)
        }
    }

    const openMessage = (message: Message) => {
        setSelectedMessage(message)
        if (!message.isRead) {
            markAsRead(message.id)
        }
    }

    const unreadCount = messages.filter((m) => !m.isRead).length

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>Loading messages...</div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Messages</h1>
                    <p className={styles.subtitle}>
                        {unreadCount > 0
                            ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
                            : 'All messages read'}
                    </p>
                </div>
            </div>

            <div className={styles.layout}>
                {/* Message List */}
                <div className={styles.list}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.listItem} ${!message.isRead ? styles.unread : ''} ${selectedMessage?.id === message.id ? styles.active : ''
                                }`}
                            onClick={() => openMessage(message)}
                        >
                            <div className={styles.listHeader}>
                                <span className={styles.listName}>{message.name}</span>
                                <span className={styles.listDate}>
                                    {formatDate(message.createdAt)}
                                </span>
                            </div>
                            <span className={styles.listSubject}>{message.subject}</span>
                            <span className={styles.listPreview}>
                                {message.message.slice(0, 80)}...
                            </span>
                            {!message.isRead && <span className={styles.unreadDot} />}
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div className={styles.empty}>
                            <p>No messages yet</p>
                        </div>
                    )}
                </div>

                {/* Message Detail */}
                <div className={styles.detail}>
                    {selectedMessage ? (
                        <>
                            <div className={styles.detailHeader}>
                                <div>
                                    <h2 className={styles.detailSubject}>
                                        {selectedMessage.subject}
                                    </h2>
                                    <p className={styles.detailMeta}>
                                        From <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
                                    </p>
                                    <p className={styles.detailDate}>
                                        {formatDate(selectedMessage.createdAt)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className={styles.detailBody}>
                                {selectedMessage.message.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            <div className={styles.detailActions}>
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="btn btn-primary"
                                >
                                    📧 Reply via Email
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className={styles.detailEmpty}>
                            <p>Select a message to view</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
