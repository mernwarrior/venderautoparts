import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return Response.json({ message: 'Not authenticated' }, { status: 401 })
    }

    return Response.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
        role: user.role,
      },
    })
  } catch (error) {
    return Response.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
