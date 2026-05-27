import { connectDB } from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import Contact from '@/lib/models/Contact'
import Product from '@/lib/models/Product'
import User from '@/lib/models/User'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    await connectDB()

    const [totalOrders, totalProducts, totalContacts, totalUsers, recentOrders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    ])

    return Response.json({
      stats: { totalOrders, totalProducts, totalContacts, totalUsers },
      recentOrders,
    })
  } catch (error: any) {
    const status = error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500
    return Response.json({ message: error.message }, { status })
  }
}
