import { connectDB } from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    await connectDB()

    const contacts = await Contact.find().sort({ createdAt: -1 })
    return Response.json({ contacts })
  } catch (error: any) {
    const status = error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500
    return Response.json({ message: error.message }, { status })
  }
}
