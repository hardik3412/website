import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 10)
    await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            passwordHash,
        },
    })

    // Create site settings
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

    // Create sample projects
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A complete e-commerce solution with payment integration, inventory management, and analytics dashboard.',
            longDescription: `This comprehensive e-commerce platform includes everything you need to start selling online:

**Features:**
- 🛒 Full shopping cart functionality
- 💳 Stripe & PayPal payment integration
- 📦 Inventory management system
- 📊 Real-time analytics dashboard
- 👥 Customer management
- 📧 Automated email notifications
- 🔐 Secure authentication
- 📱 Fully responsive design

**Tech Stack:** Next.js, TypeScript, Prisma, PostgreSQL, Stripe API

Perfect for entrepreneurs looking to launch their online store quickly with a professional, scalable solution.`,
            imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
            price: 299,
            category: 'E-Commerce',
            technologies: 'Next.js, TypeScript, Prisma, Stripe',
            demoUrl: 'https://demo.example.com/ecommerce',
            status: 'active',
            featured: true,
        },
        {
            title: 'SaaS Dashboard Template',
            description: 'Modern admin dashboard with charts, tables, user management, and dark mode support.',
            longDescription: `A beautifully designed SaaS dashboard template ready for your next project:

**Features:**
- 📈 Interactive charts and graphs
- 📋 Data tables with sorting & filtering
- 👤 User management system
- 🌙 Dark/Light mode toggle
- 🔔 Notification system
- ⚙️ Settings panel
- 📱 Mobile-responsive layout
- 🎨 Customizable color themes

**Tech Stack:** React, TypeScript, Tailwind CSS, Recharts

Ideal for startups and businesses needing a professional admin interface.`,
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            price: 199,
            category: 'Dashboard',
            technologies: 'React, TypeScript, Tailwind CSS',
            demoUrl: 'https://demo.example.com/dashboard',
            status: 'active',
            featured: true,
        },
        {
            title: 'AI Chat Application',
            description: 'Real-time chat application with AI-powered responses and conversation history.',
            longDescription: `Build intelligent conversational experiences with this AI chat application:

**Features:**
- 🤖 OpenAI GPT integration
- 💬 Real-time messaging
- 📝 Conversation history
- 🔍 Search functionality
- 📎 File attachments
- 🎤 Voice input support
- 👥 Multi-user support
- 🔐 End-to-end encryption

**Tech Stack:** Next.js, Socket.io, OpenAI API, MongoDB

Perfect for building customer support bots, virtual assistants, or AI-powered applications.`,
            imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            price: 349,
            category: 'AI/ML',
            technologies: 'Next.js, Socket.io, OpenAI, MongoDB',
            demoUrl: 'https://demo.example.com/ai-chat',
            status: 'active',
            featured: false,
        },
        {
            title: 'Portfolio Website',
            description: 'Stunning portfolio template with animations, project showcase, and contact form.',
            longDescription: `Showcase your work with this stunning portfolio template:

**Features:**
- ✨ Smooth scroll animations
- 🖼️ Project gallery with filters
- 📝 Blog section
- 📧 Contact form with validation
- 🔗 Social media integration
- 📊 Skills visualization
- 🎨 Easy customization
- ⚡ Fast performance

**Tech Stack:** Next.js, Framer Motion, CSS Modules

Ideal for developers, designers, and creatives looking to make an impression.`,
            imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
            price: 79,
            category: 'Portfolio',
            technologies: 'Next.js, Framer Motion, CSS',
            demoUrl: 'https://demo.example.com/portfolio',
            status: 'active',
            featured: false,
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
            demoUrl: 'https://demo.example.com/taskmanager',
            status: 'active',
            featured: true,
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
            demoUrl: 'https://demo.example.com/fitness',
            status: 'active',
            featured: false,
        },
    ]

    for (const project of projects) {
        await prisma.project.create({
            data: project,
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
