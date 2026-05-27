import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  try {
    cached.conn = await cached.promise
    try {
      const { default: User } = await import('@/lib/models/User')
      await User.syncIndexes()
      const { default: Order } = await import('@/lib/models/Order')
      await Order.syncIndexes()
    } catch {
    }
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
