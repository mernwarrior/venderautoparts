import { connectDB } from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    await connectDB()

    const orders = await Order.find().sort({ createdAt: -1 })
    return Response.json({ orders })
  } catch (error: any) {
    const status = error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500
    return Response.json({ message: error.message }, { status })
  }
}
