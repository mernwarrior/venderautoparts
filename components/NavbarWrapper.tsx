'use client'

import Navbar from '@/components/Navbar'
import { useCart } from '@/components/context/CartContext'

export default function NavbarWrapper() {
  const { cartCount } = useCart()
  return <Navbar cartCount={cartCount} />
}