import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { getSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const session = await getSession()

    let orders
    if (session) {
      orders = await Order.find({ userId: session.userId }).sort({ createdAt: -1 })
    } else {
      orders = []
    }

    return Response.json({ orders })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectDB()

    const session = await getSession()

    const order = await Order.create({
      ...body,
      userId: session?.userId || undefined,
      userEmail: session ? undefined : undefined,
      status: 'pending',
    })

    return Response.json({
      message: 'Order placed successfully',
      data: { orderId: order._id, status: order.status },
    }, { status: 201 })
  } catch (error: any) {
    console.error('Order creation error:', error.message, error.stack)
    return Response.json({ message: error.message || 'Something went wrong', error: error.toString() }, { status: 500 })
  }
}
