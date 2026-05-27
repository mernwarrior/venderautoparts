import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { connectDB } from './mongodb'
import User from './models/User'

const secretKey = process.env.JWT_SECRET || 'fallback-secret-key'

export interface SessionPayload {
  userId: string
  role: 'user' | 'admin'
}

export function encrypt(payload: SessionPayload) {
  return jwt.sign(
    { userId: payload.userId, role: payload.role },
    secretKey,
    { expiresIn: '7d' }
  )
}

export function decrypt(session: string) {
  try {
    return jwt.verify(session, secretKey) as SessionPayload & { iat: number; exp: number }
  } catch {
    return null
  }
}

export async function createSession(userId: string, role: 'user' | 'admin') {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = encrypt({ userId, role })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value
  if (!sessionCookie) return null
  return decrypt(sessionCookie)
}

export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  await connectDB()
  const user = await User.findById(session.userId).select('-password')
  return user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  if (session.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return session
}
