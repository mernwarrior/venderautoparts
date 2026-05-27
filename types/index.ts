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