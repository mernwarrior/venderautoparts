import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()

    await Contact.findByIdAndDelete(id)
    return Response.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
