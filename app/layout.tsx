import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/context/CartContext'
import { AuthProvider } from '@/components/context/AuthContext'
import { ToastProvider } from '@/components/context/ToastContext'
import NavbarWrapper from '@/components/NavbarWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vender Auto Parts - Quality Three Wheeler Spare Parts',
  description:
    'High quality three wheeler spare parts for TVS and Bajaj auto rickshaws. Genuine parts with warranty.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <NavbarWrapper />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}