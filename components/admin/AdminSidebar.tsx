'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaTachometerAlt, FaShoppingCart, FaBox, FaEnvelope, FaSignOutAlt, FaUsers, FaTimes, FaBars } from 'react-icons/fa'
import { useAuth } from '@/components/context/AuthContext'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
  { href: '/admin/orders', label: 'Orders', icon: FaShoppingCart },
  { href: '/admin/products', label: 'Products', icon: FaBox },
  { href: '/admin/users', label: 'Users', icon: FaUsers },
  { href: '/admin/contacts', label: 'Contacts', icon: FaEnvelope },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-4 pt-4 mb-8">
        <div className="text-white text-xl font-bold">Admin Panel</div>
        <button onClick={() => setIsOpen(false)} className="text-white text-xl lg:hidden hover:text-accent">
          <FaTimes />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                isActive ? 'bg-accent text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-700 pt-4 px-2">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors"
        >
          <FaBox />
          <span>View Site</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors w-full"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary-dark text-white p-3 rounded-md shadow-lg hover:bg-gray-800 transition"
      >
        <FaBars />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar (overlay) */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-primary-dark p-4 flex flex-col z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar (always visible) */}
      <aside className="hidden lg:flex w-64 bg-primary-dark min-h-screen p-4 flex-col flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  )
}
