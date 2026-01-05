import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'ProjectHub - Premium Digital Projects',
        template: '%s | ProjectHub'
    },
    description: 'Discover and purchase high-quality, ready-to-use digital projects for your next venture. Full source code, documentation, and support included.',
    keywords: ['projects', 'digital products', 'web development', 'templates', 'source code', 'React', 'Next.js', 'software selling'],
    authors: [{ name: 'ProjectHub Team' }],
    creator: 'ProjectHub',
    publisher: 'ProjectHub',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://projecthub.example.com'), // Replace with actual production URL
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'ProjectHub - Premium Digital Projects',
        description: 'Discover and purchase high-quality, ready-to-use digital projects.',
        url: 'https://projecthub.example.com',
        siteName: 'ProjectHub',
        images: [
            {
                url: '/CraftKaro-removebg-preview.png', // Fallback image
                width: 1200,
                height: 630,
                alt: 'ProjectHub - Premium Digital Projects',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ProjectHub - Premium Digital Projects',
        description: 'Discover and purchase high-quality, ready-to-use digital projects.',
        images: ['/CraftKaro-removebg-preview.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
