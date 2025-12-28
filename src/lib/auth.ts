import { cookies } from 'next/headers'

const ADMIN_SESSION_COOKIE = 'admin_session'

export function setAdminSession(username: string): void {
    const cookieStore = cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
    })
}

export function getAdminSession(): string | undefined {
    const cookieStore = cookies()
    return cookieStore.get(ADMIN_SESSION_COOKIE)?.value
}

export function clearAdminSession(): void {
    const cookieStore = cookies()
    cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export function isAuthenticated(): boolean {
    return !!getAdminSession()
}
