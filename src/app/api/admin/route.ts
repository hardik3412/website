import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// Force dynamic rendering - don't try to build this at build time
export const dynamic = 'force-dynamic'

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.username || !body.password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            )
        }

        const admin = await prisma.admin.findUnique({
            where: { username: body.username },
        })

        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const isValid = await bcrypt.compare(body.password, admin.passwordHash)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Set session cookie
        const cookieStore = cookies()
        cookieStore.set('admin_session', admin.username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
        })

        return NextResponse.json({ message: 'Login successful' })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        )
    }
}

// DELETE /api/admin/login - Admin logout
export async function DELETE() {
    try {
        const cookieStore = cookies()
        cookieStore.delete('admin_session')

        return NextResponse.json({ message: 'Logged out successfully' })
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        )
    }
}

// GET /api/admin/login - Check auth status
export async function GET() {
    try {
        const cookieStore = cookies()
        const session = cookieStore.get('admin_session')

        if (!session) {
            return NextResponse.json({ authenticated: false })
        }

        return NextResponse.json({ authenticated: true, username: session.value })
    } catch (error) {
        return NextResponse.json({ authenticated: false })
    }
}
