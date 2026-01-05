import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

async function getAuth() {
    const cookieStore = cookies()
    const role = cookieStore.get('session_role')?.value
    const userId = cookieStore.get('session_user_id')?.value
    return { role, userId }
}

// GET /api/users - List all users (Admin only)
export async function GET() {
    try {
        const { role } = await getAuth()
        if (role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true,
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

// POST /api/users - Create a new user (Admin only)
export async function POST(request: NextRequest) {
    try {
        const { role } = await getAuth()
        if (role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await request.json()
        if (!body.username || !body.password || !body.role) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
        }

        // Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { username: body.username }
        })

        if (existing) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 400 })
        }

        const passwordHash = await bcrypt.hash(body.password, 10)

        const user = await prisma.user.create({
            data: {
                username: body.username,
                passwordHash,
                role: body.role,
            },
            select: {
                id: true,
                username: true,
                role: true,
            }
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}
