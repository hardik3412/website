import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface RouteParams {
    params: { id: string }
}

// GET /api/projects/[id] - Get a single project
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const project = await prisma.project.findUnique({
            where: { id: params.id },
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

// PUT /api/projects/[id] - Update a project
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const body = await request.json()

        const project = await prisma.project.update({
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
                featured: body.featured,
            },
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error updating project:', error)
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        )
    }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
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
