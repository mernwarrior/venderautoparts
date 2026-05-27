'use client'

import ProductCard from '@/components/ProductCard'
import { useCart } from '@/components/context/CartContext'
import { Product } from '@/types'

interface ProductsClientProps {
  products: Product[]
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const { addToCart } = useCart()

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-400">No Products Found</h2>
        <p className="text-gray-400 mt-2">Backend se data nahi aaya — API check karo</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  )
}