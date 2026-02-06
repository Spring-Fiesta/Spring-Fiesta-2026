import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spring Fiesta 2026 | IIIT Surat',
  description: 'Annual cultural and technical festival of Indian Institute of Information Technology, Surat',
  keywords: ['Spring Fiesta', 'IIIT Surat', 'Cultural Fest', 'Technical Fest', '2026'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
