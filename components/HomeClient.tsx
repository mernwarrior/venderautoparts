'use client'

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import { useCart } from '@/components/context/CartContext'
import Link from 'next/link'

interface HomeClientProps {
  products: Product[]
}

export default function HomeClient({ products }: HomeClientProps) {
  const { addToCart } = useCart()

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Products Found
            </h2>
          </div>
        )}
      </div>

      <div className="text-center">
        <Link href="/products" className="btn-primary inline-block">
          Explore More
        </Link>
      </div>
    </>
  )
}