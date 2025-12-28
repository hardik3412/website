import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/settings - Get all settings
export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany()
        const settingsMap = settings.reduce(
            (acc, s) => ({ ...acc, [s.key]: s.value }),
            {} as Record<string, string>
        )

        return NextResponse.json(settingsMap)
    } catch (error) {
        console.error('Error fetching settings:', error)
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        )
    }
}

// PUT /api/settings - Update settings
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        // Update each setting
        for (const [key, value] of Object.entries(body)) {
            await prisma.siteSetting.upsert({
                where: { key },
                update: { value: value as string },
                create: { key, value: value as string },
            })
        }

        return NextResponse.json({ message: 'Settings updated successfully' })
    } catch (error) {
        console.error('Error updating settings:', error)
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        )
    }
}
