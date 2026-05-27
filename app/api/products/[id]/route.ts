import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/lib/models/Product'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()

    const product = await Product.findById(id)
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 })
    }

    return Response.json({ product })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    await connectDB()

    const product = await Product.findByIdAndUpdate(id, body, { new: true })
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 })
    }

    return Response.json({ message: 'Product updated successfully', product })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()

    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 })
    }

    return Response.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
