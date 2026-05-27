'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaTachometerAlt, FaShoppingCart, FaBox, FaEnvelope, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { useAuth } from '@/components/context/AuthContext'

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

  return (
    <aside className="w-64 bg-primary-dark min-h-screen p-4 flex flex-col">
      <div className="text-white text-xl font-bold mb-8 px-4 pt-4">
        Admin Panel
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
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
      <div className="border-t border-gray-700 pt-4">
        <Link
          href="/"
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
    </aside>
  )
}
