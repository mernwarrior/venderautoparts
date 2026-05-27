import axiosInstance from '@/config/axios.config'
import { ProductResponse, Product } from '@/types'

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<ProductResponse>('/product')

  return response.data.data
}

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  const response = await axiosInstance.get<ProductResponse>('/product')

  const product = response.data.data.find(
    item => item.urlSlug === slug
  )

  return product || null
}