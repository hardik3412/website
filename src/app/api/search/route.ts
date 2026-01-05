import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/search?q=query - Search projects
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('q')

        if (!query || query.length < 2) {
            return NextResponse.json([])
        }

        const projects = await prisma.project.findMany({
            where: {
                status: 'active',
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                    { technologies: { contains: query } },
                    { category: { contains: query } },
                ],
            },
            take: 8,
            select: {
                id: true,
                title: true,
                category: true,
                price: true,
                imageUrl: true,
            },
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json(
            { error: 'Failed to search projects' },
            { status: 500 }
        )
    }
}
