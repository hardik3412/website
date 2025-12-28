import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ProjectHub - Premium Digital Projects',
    description: 'Discover and purchase high-quality, ready-to-use digital projects for your next venture.',
    keywords: 'projects, digital products, web development, templates, source code',
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
