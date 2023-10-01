import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/app/components/navbar'
import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tianqi\'s Website',
  description: 'Tools, tutorials, and other resources for making the web.',
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
