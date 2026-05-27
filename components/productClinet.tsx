'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'
import { useCart } from '@/components/context/CartContext'
import { Product } from '@/types'

interface ProductsClientProps {
  products: Product[]
}

const PER_PAGE = 20

export default function ProductsClient({ products }: ProductsClientProps) {
  const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = products.filter((p) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.stockId.toLowerCase().includes(q) ||
      p.brandTitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q)
    )
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const safePage = Math.min(page, Math.max(totalPages, 1))
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  return (
    <div>
      <div className="mb-8 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search products by name, brand, category, or stock ID..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-400">
            {search ? 'No products match your search' : 'No Products Found'}
          </h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
          <Pagination current={safePage} total={filtered.length} perPage={PER_PAGE} onPage={setPage} />
        </>
      )}
    </div>
  )
}