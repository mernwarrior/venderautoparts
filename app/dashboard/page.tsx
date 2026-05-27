'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/context/AuthContext'

interface Order {
  _id: string
  firstName: string
  lastName: string
  items: { title: string; quantity: number; price: number }[]
  totalAmount: number
  grandTotal: number
  status: string
  orderDate: string
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetch('/api/orders')
        .then((res) => res.json())
        .then((data) => setOrders(data.orders || []))
        .finally(() => setOrdersLoading(false))
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-dark text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">Welcome, {user.name}</h1>
              <p className="text-gray-300 mt-1 truncate">{user.email}</p>
            </div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm flex-shrink-0">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Profile Details</h2>
            <div className="space-y-3">
              <div><span className="text-gray-500">Name:</span> <span className="font-semibold">{user.name}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="font-semibold">{user.email}</span></div>
              <div><span className="text-gray-500">Phone:</span> <span className="font-semibold">{user.phone || 'Not provided'}</span></div>
              <div><span className="text-gray-500">Address:</span> <span className="font-semibold">{user.address || 'Not provided'}</span></div>
              <div><span className="text-gray-500">City:</span> <span className="font-semibold">{user.city || 'Not provided'}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Account Summary</h2>
            <div className="space-y-3">
              <div><span className="text-gray-500">Total Orders:</span> <span className="font-semibold text-accent">{orders.length}</span></div>
              <div><span className="text-gray-500">Member Since:</span> <span className="font-semibold">Registered</span></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-primary-dark mb-6">My Orders</h2>
          {ordersLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No orders yet</p>
              <p className="mt-2">Start browsing products and place your first order!</p>
            </div>
          ) : (
            <>
              {/* Desktop table view */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 font-semibold text-gray-600">Order ID</th>
                      <th className="pb-3 font-semibold text-gray-600">Date</th>
                      <th className="pb-3 font-semibold text-gray-600">Items</th>
                      <th className="pb-3 font-semibold text-gray-600">Total</th>
                      <th className="pb-3 font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b last:border-0">
                        <td className="py-4 text-sm font-mono">{order._id.slice(-8)}</td>
                        <td className="py-4 text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td className="py-4 text-sm">{order.items.length} item(s)</td>
                        <td className="py-4 text-sm font-semibold">₹{order.grandTotal}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile card view */}
              <div className="md:hidden space-y-3">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">#{order._id.slice(-8)}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</span>
                      <span className="text-gray-500">{order.items.length} item(s)</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold border-t pt-2">
                      <span>Total</span>
                      <span className="text-accent">₹{order.grandTotal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
