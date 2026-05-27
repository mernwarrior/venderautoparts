import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  category: string
  subCategory: string
  title: string
  description: string
  stockId: string
  amount: number
  saleAmount: number
  image: string
  brandTitle: string
  urlSlug: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stockId: { type: String, required: true },
    amount: { type: Number, required: true },
    saleAmount: { type: Number, required: true },
    image: { type: String, default: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=300&auto=format&fit=crop' },
    brandTitle: { type: String, required: true },
    urlSlug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
