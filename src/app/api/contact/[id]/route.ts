import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface RouteParams {
    params: { id: string }
}

// PUT /api/contact/[id] - Mark message as read
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const body = await request.json()

        const message = await prisma.contactMessage.update({
            where: { id: params.id },
            data: { isRead: body.isRead },
        })

        return NextResponse.json(message)
    } catch (error) {
        console.error('Error updating message:', error)
        return NextResponse.json(
            { error: 'Failed to update message' },
            { status: 500 }
        )
    }
}

// DELETE /api/contact/[id] - Delete a message
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await prisma.contactMessage.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Message deleted successfully' })
    } catch (error) {
        console.error('Error deleting message:', error)
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        )
    }
}
