'use client'

import { useState, useEffect } from 'react'
import { FaShoppingCart, FaBox, FaEnvelope, FaUsers } from 'react-icons/fa'

interface Stats {
  totalOrders: number
  totalProducts: number
  totalContacts: number
  totalUsers: number
}

interface RecentOrder {
  _id: string
  firstName: string
  lastName: string
  grandTotal: number
  status: string
  orderDate: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats)
        setRecentOrders(data.recentOrders || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { label: 'Total Orders', value: stats.totalOrders, icon: FaShoppingCart, color: 'bg-blue-500' },
    { label: 'Total Products', value: stats.totalProducts, icon: FaBox, color: 'bg-green-500' },
    { label: 'Total Contacts', value: stats.totalContacts, icon: FaEnvelope, color: 'bg-purple-500' },
    { label: 'Total Users', value: stats.totalUsers, icon: FaUsers, color: 'bg-orange-500' },
  ] : []

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card) => (
              <div key={card.label} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
                <div className={`${card.color} p-4 rounded-lg text-white`}>
                  <card.icon className="text-2xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <p className="text-2xl font-bold text-primary-dark">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-dark mb-6">Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders yet</p>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 font-semibold text-gray-600">Order ID</th>
                        <th className="pb-3 font-semibold text-gray-600">Customer</th>
                        <th className="pb-3 font-semibold text-gray-600">Amount</th>
                        <th className="pb-3 font-semibold text-gray-600">Status</th>
                        <th className="pb-3 font-semibold text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id} className="border-b last:border-0">
                          <td className="py-4 text-sm font-mono">{order._id.slice(-8)}</td>
                          <td className="py-4 text-sm">{order.firstName} {order.lastName}</td>
                          <td className="py-4 text-sm font-semibold">₹{order.grandTotal}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile card view */}
                <div className="md:hidden space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order._id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">#{order._id.slice(-8)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{order.firstName} {order.lastName}</span>
                        <span className="text-accent font-bold">₹{order.grandTotal}</span>
                      </div>
                      <div className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
