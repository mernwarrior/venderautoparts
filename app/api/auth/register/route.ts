import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'
import { createSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, address, city, pincode } = await req.json()

    if (!name || !email || !password) {
      return Response.json({ message: 'All fields are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return Response.json({ message: 'Password must be at least 6 characters' }, { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return Response.json({ message: 'Email already registered' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || undefined,
      address: address || undefined,
      city: city || undefined,
      pincode: pincode || undefined,
      role: 'user',
    })

    await createSession(user._id.toString(), 'user')

    return Response.json({
      message: 'Registration successful',
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
    }, { status: 201 })
  } catch (error: any) {
    console.error('Register error:', error.message, error.stack)
    return Response.json({ message: error.message || 'Something went wrong' }, { status: 500 })
  }
}
