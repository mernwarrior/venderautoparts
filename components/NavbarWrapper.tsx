'use client'

import Navbar from '@/components/Navbar'
import { useCart } from '@/components/context/CartContext'
import { useAuth } from '@/components/context/AuthContext'

export default function NavbarWrapper() {
  const { cartCount } = useCart()
  const { user } = useAuth()

  return <Navbar cartCount={cartCount} user={user ? { name: user.name, role: user.role } : null} />
}
