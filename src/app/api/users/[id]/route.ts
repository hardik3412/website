import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// DELETE /api/users/[id] - Delete a user (Admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const cookieStore = cookies()
        const role = cookieStore.get('session_role')?.value
        const currentUserId = cookieStore.get('session_user_id')?.value

        if (role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        if (params.id === currentUserId) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
        }

        await prisma.user.delete({
            where: { id: params.id }
        })

        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
