import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/projects - Get all projects or filter by category
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const category = searchParams.get('category')
        const featured = searchParams.get('featured')

        const where: any = { status: 'active' }
        if (category) where.category = category
        if (featured === 'true') where.featured = true

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

// POST /api/projects - Create a new project (Admin only)
export async function POST(request: NextRequest) {
    try {
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
