import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    await connectDB()

    const products = await Product.find().sort({ createdAt: -1 })
    return Response.json({ products })
  } catch (error: any) {
    const status = error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500
    return Response.json({ message: error.message }, { status })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin()
    const body = await req.json()
    await connectDB()

    const product = await Product.create(body)
    return Response.json({ message: 'Product created successfully', product }, { status: 201 })
  } catch (error: any) {
    const status = error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500
    return Response.json({ message: error.message }, { status })
  }
}
