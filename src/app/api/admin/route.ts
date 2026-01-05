import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

// Force dynamic rendering - don't try to build this at build time
export const dynamic = 'force-dynamic'

// POST /api/admin - User login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        if (!body.username || !body.password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { username: body.username },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const isValid = await bcrypt.compare(body.password, user.passwordHash)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Set session cookies
        const cookieStore = cookies()
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            maxAge: 60 * 60 * 24, // 24 hours
        }

        cookieStore.set('session_user_id', user.id, cookieOptions)
        cookieStore.set('session_username', user.username, cookieOptions)
        cookieStore.set('session_role', user.role, cookieOptions)

        return NextResponse.json({ message: 'Login successful' })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        )
    }
}

// DELETE /api/admin - User logout
export async function DELETE() {
    try {
        const cookieStore = cookies()
        cookieStore.delete('session_user_id')
        cookieStore.delete('session_username')
        cookieStore.delete('session_role')

        return NextResponse.json({ message: 'Logged out successfully' })
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        )
    }
}

// GET /api/admin - Check auth status
export async function GET() {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('session_user_id')
        const username = cookieStore.get('session_username')
        const role = cookieStore.get('session_role')

        if (!userId) {
            return NextResponse.json({ authenticated: false })
        }

        return NextResponse.json({
            authenticated: true,
            userId: userId.value,
            username: username?.value,
            role: role?.value
        })
    } catch (error) {
        return NextResponse.json({ authenticated: false })
    }
}
