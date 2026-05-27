import { connectDB } from './mongodb'
import Product from './models/Product'

export async function getProducts() {
  await connectDB()
  const products = await Product.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(products))
}

export async function getProductById(id: string) {
  await connectDB()
  const product = await Product.findById(id).lean()
  if (!product) return null
  return JSON.parse(JSON.stringify(product))
}

export async function getProductBySlug(slug: string) {
  await connectDB()
  const product = await Product.findOne({ urlSlug: slug }).lean()
  if (!product) return null
  return JSON.parse(JSON.stringify(product))
}
