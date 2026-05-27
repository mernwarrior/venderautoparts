import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return Response.json({ contacts })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectDB()

    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
    })

    return Response.json({
      success: true,
      message: 'Message sent successfully',
      data: { id: contact._id },
    }, { status: 201 })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
