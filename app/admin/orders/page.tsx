'use client'

import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'

interface Order {
  _id: string
  firstName: string
  lastName: string
  address: string
  mobile: string
  city: string
  pincode: string
  items: { title: string; quantity: number; price: number; stockId: string }[]
  totalAmount: number
  shippingCharge: number
  grandTotal: number
  orderDate: string
  status: string
  userEmail?: string
}

const PER_PAGE = 10

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (err) {
      console.error('Failed to fetch orders', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        )
      }
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter)
  const paginated = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Orders Management</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setPage(1) }}
            className={`px-4 py-2 rounded text-sm font-semibold capitalize transition-colors ${
              filter === s ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginated.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">#{order._id.slice(-8)}</span>
                    <span className="ml-3 text-gray-500 text-sm">{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`px-3 py-1 rounded text-sm font-semibold border ${
                      order.status === 'pending' ? 'border-yellow-300 bg-yellow-50' :
                      order.status === 'processing' ? 'border-blue-300 bg-blue-50' :
                      order.status === 'shipped' ? 'border-purple-300 bg-purple-50' :
                      order.status === 'delivered' ? 'border-green-300 bg-green-50' :
                      'border-red-300 bg-red-50'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Customer</h3>
                    <p className="font-semibold">{order.firstName} {order.lastName}</p>
                    <p className="text-sm text-gray-600">{order.mobile}</p>
                    {order.userEmail && <p className="text-sm text-gray-600">{order.userEmail}</p>}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Shipping Address</h3>
                    <p className="text-sm text-gray-600">{order.address}</p>
                    <p className="text-sm text-gray-600">{order.city} - {order.pincode}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-semibold">{item.title}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{order.totalAmount}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>₹{order.shippingCharge}</span></div>
                    <div className="flex justify-between font-bold text-base"><span>Grand Total</span><span>₹{order.grandTotal}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination current={page} total={filteredOrders.length} perPage={PER_PAGE} onPage={setPage} />
        </>
      )}
    </div>
  )
}
