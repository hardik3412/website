import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if accessing admin area (except login page)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const sessionUserId = request.cookies.get('session_user_id')
        const sessionRole = request.cookies.get('session_role')

        // If not authenticated, redirect to login
        if (!sessionUserId || !sessionRole) {
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    // If authenticated and trying to access login page, redirect to dashboard
    if (pathname === '/admin/login') {
        const sessionUserId = request.cookies.get('session_user_id')
        if (sessionUserId) {
            const dashboardUrl = new URL('/admin', request.url)
            return NextResponse.redirect(dashboardUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
    ]
}
