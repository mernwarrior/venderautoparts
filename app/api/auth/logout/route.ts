import { deleteSession } from '@/lib/auth'

export async function POST() {
  try {
    await deleteSession()
    return Response.json({ message: 'Logged out successfully' })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
