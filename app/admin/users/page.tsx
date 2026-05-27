'use client'

import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import Pagination from '@/components/Pagination'

interface User {
  _id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  pincode?: string
  role: string
  createdAt: string
}

const PER_PAGE = 10

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.users || [])
    } catch (err) {
      console.error('Failed to fetch users', err)
    } finally {
      setLoading(false)
    }
  }

  const paginated = users.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Users Management</h1>

      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No users found
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">User</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Phone</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">City</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((user) => (
                    <tr key={user._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                            <FaUser className="text-accent text-sm" />
                          </div>
                          <span className="font-semibold text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.phone || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.city || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-sm text-gray-500 border-t flex items-center justify-between">
              <span>Total Users: {users.length}</span>
              <Pagination current={page} total={users.length} perPage={PER_PAGE} onPage={setPage} />
            </div>
          </div>
          {/* Mobile card view */}
          <div className="md:hidden space-y-3">
            {paginated.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-accent text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 border-t pt-2">
                  <div><span className="text-gray-400">Phone:</span> {user.phone || '-'}</div>
                  <div><span className="text-gray-400">City:</span> {user.city || '-'}</div>
                  <div><span className="text-gray-400">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
            <Pagination current={page} total={users.length} perPage={PER_PAGE} onPage={setPage} />
          </div>
        </>
      )}
    </div>
  )
}
