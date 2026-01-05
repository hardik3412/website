import { NextRequest, NextResponse } from 'next/server'
import { sendCustomProjectEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate required fields
        const requiredFields = ['name', 'email', 'projectType', 'budget', 'timeline', 'description', 'features']
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                )
            }
        }

        // Send email notification
        await sendCustomProjectEmail(body)

        return NextResponse.json({ 
            message: 'Custom project request received successfully' 
        })
    } catch (error) {
        console.error('Custom project request error:', error)
        return NextResponse.json(
            { error: 'Failed to submit request' },
            { status: 500 }
        )
    }
}
