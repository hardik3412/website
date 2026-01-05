const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
    try {
        const users = await prisma.user.findMany()
        console.log('Users found:', users.length)
        if (users.length > 0) {
            console.log('First user:', users[0].username, 'Role:', users[0].role)
        }

        const projects = await prisma.project.findMany({ take: 1 })
        console.log('Project sample:', JSON.stringify(projects[0], null, 2))

        console.log('✅ Database check passed')
    } catch (e) {
        console.error('❌ Database check failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

test()
