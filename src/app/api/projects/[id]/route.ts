import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

interface RouteParams {
    params: { id: string }
}

async function getAuthContext() {
    const cookieStore = cookies()
    const userId = cookieStore.get('session_user_id')?.value
    const role = cookieStore.get('session_role')?.value
    return { userId, role }
}

// GET /api/projects/[id] - Get a single project
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const project = await prisma.project.findUnique({
            where: { id: params.id },
            include: { user: { select: { username: true, role: true } } }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

// PUT /api/projects/[id] - Update a project (Owner or Admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { userId, role } = await getAuthContext()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const project = await prisma.project.findUnique({
            where: { id: params.id },
        })

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        // Check ownership
        if (role !== 'ADMIN' && project.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await request.json()

        const updatedProject = await prisma.project.update({
            where: { id: params.id },
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
                status: body.status,
                featured: role === 'ADMIN' ? body.featured : project.featured, // Only admin can change featured status
            },
        })

        return NextResponse.json(updatedProject)
    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        )
    }
}

// DELETE /api/projects/[id] - Delete a project (Owner or Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { userId, role } = await getAuthContext()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const project = await prisma.project.findUnique({
            where: { id: params.id },
        })

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        // Check ownership
        if (role !== 'ADMIN' && project.userId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        await prisma.project.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Project deleted successfully' })
    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        )
    }
}
