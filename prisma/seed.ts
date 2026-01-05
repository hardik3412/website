import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // 1. Create site settings
    const settings = [
        { key: 'siteName', value: 'ProjectHub' },
        { key: 'heroTitle', value: 'Premium Digital Projects' },
        { key: 'heroSubtitle', value: 'Discover high-quality, ready-to-use projects for your next venture' },
        { key: 'aboutTitle', value: 'About Us' },
        { key: 'aboutContent', value: 'We are a team of passionate developers creating premium digital solutions. Our projects are built with the latest technologies and best practices to ensure quality and maintainability.' },
        { key: 'contactEmail', value: 'contact@projecthub.com' },
        { key: 'contactPhone', value: '+1 (555) 123-4567' },
        { key: 'contactAddress', value: '123 Tech Street, Silicon Valley, CA 94025' },
    ]

    for (const setting of settings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: setting,
        })
    }

    // 2. Create users
    const commonPasswordHash = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            passwordHash: commonPasswordHash,
            role: 'ADMIN',
        },
    })

    const user1 = await prisma.user.upsert({
        where: { username: 'user1' },
        update: {},
        create: {
            username: 'user1',
            passwordHash: commonPasswordHash,
            role: 'USER',
        },
    })

    // 3. Create sample projects
    const adminProjects = [
        {
            title: 'E-Commerce Platform',
            description: 'A complete e-commerce solution with payment integration, inventory management, and analytics dashboard.',
            longDescription: 'Full e-commerce platform with Next.js, Stripe, and PostgreSQL.',
            imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
            price: 299,
            category: 'E-Commerce',
            technologies: 'Next.js, TypeScript, Prisma, Stripe',
            status: 'active',
            featured: true,
            userId: admin.id,
        },
        {
            title: 'AI Chat Application',
            description: 'Real-time chat application with AI-powered responses and conversation history.',
            longDescription: 'Intelligent conversational experiences with GPT integration.',
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            price: 349,
            category: 'AI/ML',
            technologies: 'Next.js, Socket.io, OpenAI, MongoDB',
            status: 'active',
            featured: false,
            userId: admin.id,
        },
    ]

    const userProjects = [
        {
            title: 'SaaS Dashboard Template',
            description: 'Modern admin dashboard with charts, tables, user management, and dark mode support.',
            longDescription: 'Beautifully designed SaaS dashboard template ready for your next project.',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            price: 199,
            category: 'Dashboard',
            technologies: 'React, TypeScript, Tailwind CSS',
            status: 'active',
            featured: true,
            userId: user1.id,
        },
        {
            title: 'Portfolio Website',
            description: 'Stunning portfolio template with animations, project showcase, and contact form.',
            longDescription: 'Showcase your work with this stunning portfolio template.',
            imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
            price: 79,
            category: 'Portfolio',
            technologies: 'Next.js, Framer Motion, CSS',
            status: 'active',
            featured: false,
            userId: user1.id,
        },
        {
            title: 'Task Management System',
            description: 'Kanban-style project management tool with team collaboration features.',
            longDescription: `Boost your team's productivity with this task management system:

**Features:**
- 📋 Kanban board interface
- 👥 Team collaboration
- 📅 Due date tracking
- 🏷️ Labels and tags
- 📎 File attachments
- 💬 Task comments
- 📊 Progress tracking
- 🔔 Email notifications

**Tech Stack:** React, Node.js, PostgreSQL, Socket.io

Perfect for teams looking to streamline their workflow and improve productivity.`,
            imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
            price: 249,
            category: 'Productivity',
            technologies: 'React, Node.js, PostgreSQL',
            status: 'active',
            featured: true,
            userId: user1.id,
        },
        {
            title: 'Fitness Tracker App',
            description: 'Mobile-first fitness application with workout plans, progress tracking, and nutrition logging.',
            longDescription: `Help users achieve their fitness goals with this comprehensive tracker:

**Features:**
- 🏋️ Workout library
- 📈 Progress charts
- 🍎 Nutrition tracking
- 🎯 Goal setting
- 📅 Workout scheduler
- 🏆 Achievement badges
- 👥 Community features
- 📱 PWA support

**Tech Stack:** React Native, Firebase, Node.js

Ideal for fitness enthusiasts and gym owners looking for a branded app solution.`,
            imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
            price: 399,
            category: 'Health & Fitness',
            technologies: 'React Native, Firebase, Node.js',
            status: 'active',
            featured: false,
            userId: user1.id,
        },
    ]

    for (const p of [...adminProjects, ...userProjects]) {
        await prisma.project.create({ data: p })
    }

    // 4. Create sample sales for stats
    const projects = await prisma.project.findMany()
    for (const p of projects) {
        // Create 2 random sales for each project
        await prisma.sale.createMany({
            data: [
                { projectId: p.id, sellerId: p.userId!, amount: p.price },
                { projectId: p.id, sellerId: p.userId!, amount: p.price },
            ]
        })
    }

    console.log('✅ Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
