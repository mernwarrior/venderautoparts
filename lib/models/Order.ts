import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
  productId: string
  title: string
  quantity: number
  price: number
  stockId: string
}

export interface IOrder extends Document {
  userId?: string
  userEmail?: string
  firstName: string
  lastName: string
  address: string
  mobile: string
  city: string
  pincode: string
  items: IOrderItem[]
  totalAmount: number
  shippingCharge: number
  grandTotal: number
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    stockId: { type: String, required: true },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String },
    userEmail: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    orderDate: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)
