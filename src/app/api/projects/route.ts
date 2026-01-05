import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET /api/projects - Get all projects or filter by category/user
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category')
        const featured = searchParams.get('featured')
        const adminView = searchParams.get('adminView') === 'true'

        const cookieStore = cookies()
        const userId = cookieStore.get('session_user_id')?.value
        const role = cookieStore.get('session_role')?.value

        const where: any = { status: 'active' }
        if (category) where.category = category
        if (featured === 'true') where.featured = true

        // If adminView is requested, filter by user if not an admin
        if (adminView && userId) {
            delete where.status // Admins/Users should see all their statuses in dashboard
            if (role === 'USER') {
                where.userId = userId
            }
        }

        const projects = await prisma.project.findMany({
            where,
            orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

// POST /api/projects - Create a new project (Authenticated users)
export async function POST(request: NextRequest) {
    try {
        const cookieStore = cookies()
        const userId = cookieStore.get('session_user_id')?.value

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()

        const project = await prisma.project.create({
            data: {
                title: body.title,
                description: body.description,
                longDescription: body.longDescription,
                imageUrl: body.imageUrl,
                price: parseFloat(body.price),
                category: body.category,
                technologies: body.technologies,
                demoUrl: body.demoUrl || null,
                sourceUrl: body.sourceUrl || null,
                status: body.status || 'active',
                featured: body.featured || false,
                userId: userId,
            },
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        )
    }
}
