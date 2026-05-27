import axiosInstance from '@/config/axios.config'

// ─── Types ───────────────────────────────────────────────────────
export interface OrderItem {
  productId: string
  title: string
  quantity: number
  price: number
  stockId: string
}

export interface OrderPayload {
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
}

export interface OrderResponse {
  success: boolean
  message: string
  data?: {
    orderId: string
    status: string
  }
}

// ─── Place a new order ────────────────────────────────────────────
export const placeOrder = async (payload: OrderPayload): Promise<OrderResponse> => {
  const response = await axiosInstance.post<OrderResponse>('/orders', payload)
  return response.data
}

// ─── Get all orders (admin) ───────────────────────────────────────
export const getAllOrders = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`)
  return response.data
}

// ─── Get single order by ID ───────────────────────────────────────
export const getOrderById = async (id: string) => {
  const response = await axiosInstance.get(`/orders/${id}`)
  return response.data
}
