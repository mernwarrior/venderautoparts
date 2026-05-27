import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Order from '@/lib/models/Order'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()

    const order = await Order.findById(id)
    if (!order) {
      return Response.json({ message: 'Order not found' }, { status: 404 })
    }

    return Response.json({ order })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    await connectDB()

    const order = await Order.findByIdAndUpdate(id, { status: body.status }, { new: true })
    if (!order) {
      return Response.json({ message: 'Order not found' }, { status: 404 })
    }

    return Response.json({ message: 'Order updated successfully', order })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
