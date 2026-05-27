import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin()
    await connectDB()

    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 })

    return Response.json({ users })
  } catch (error: any) {
    const status = error.message === 'Unauthorized' ? 401 : error.message === 'Forbidden' ? 403 : 500
    return Response.json({ message: error.message }, { status })
  }
}
