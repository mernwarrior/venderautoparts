export interface Product {
  _id: string
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
  createdAt?: string
  updatedAt?: string
}

export interface ProductResponse {
  statusCode: number
  success: boolean
  message: string
  data: Product[]
  totalItems: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface User {
  _id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  pincode?: string
  role: 'user' | 'admin'
}

export interface Order {
  _id: string
  userId?: string
  userEmail?: string
  firstName: string
  lastName: string
  address: string
  mobile: string
  city: string
  pincode: string
  items: OrderItem[]
  totalAmount: number
  shippingCharge: number
  grandTotal: number
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

export interface OrderItem {
  productId: string
  title: string
  quantity: number
  price: number
  stockId: string
}

export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}
