import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'OOH Charger',
  description: 'OOH Info, details, metrics and pics',
}

export default async function RootLayout({ children }) {

  return (
    
    <html lang="en">
      <body className={`h-screen ${inter.className}`}>{children}</body>
    </html>
  )
}
