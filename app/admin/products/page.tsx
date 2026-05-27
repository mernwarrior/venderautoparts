'use client'

import { useState, useEffect, useCallback } from 'react'
import Pagination from '@/components/Pagination'

interface Product {
  _id: string
  title: string
  description: string
  stockId: string
  category: string
  subCategory: string
  brandTitle: string
  amount: number
  saleAmount: number
  image: string
  urlSlug: string
}

const PER_PAGE = 10

function makeSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const [form, setForm] = useState({
    title: '', description: '', stockId: '', category: '', subCategory: '',
    brandTitle: '', amount: 0, saleAmount: 0, image: '', urlSlug: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (err) {
      console.error('Failed to fetch products', err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ title: '', description: '', stockId: '', category: '', subCategory: '', brandTitle: '', amount: 0, saleAmount: 0, image: '', urlSlug: '' })
    setEditing(null)
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setForm({
      title: product.title,
      description: product.description,
      stockId: product.stockId,
      category: product.category,
      subCategory: product.subCategory,
      brandTitle: product.brandTitle,
      amount: product.amount,
      saleAmount: product.saleAmount,
      image: product.image,
      urlSlug: product.urlSlug,
    })
    setEditing(product)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editing ? `/api/products/${editing._id}` : '/api/admin/products'
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, urlSlug: form.urlSlug || makeSlug(form.title) }),
      })
      if (res.ok) {
        resetForm()
        fetchProducts()
      }
    } catch (err) {
      console.error('Failed to save product', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) fetchProducts()
    } catch (err) {
      console.error('Failed to delete product', err)
    }
  }

  const paginated = products.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary-dark">Products Management</h1>
        <button onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="btn-primary">
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">{editing ? 'Edit Product' : 'Add New Product'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <input type="text" value={form.title} onChange={(e) => {
                const t = e.target.value
                setForm({ ...form, title: t, urlSlug: editing ? form.urlSlug : makeSlug(t) })
              }} required
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Stock ID</label>
              <input type="text" value={form.stockId} onChange={(e) => setForm({ ...form, stockId: e.target.value })} required
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required
                className="w-full px-3 py-2 border rounded-md text-sm">
                <option value="">Select</option>
                <option value="TVS">TVS</option>
                <option value="Bajaj">Bajaj</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sub Category</label>
              <input type="text" value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} required
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Brand Title</label>
              <input type="text" value={form.brandTitle} onChange={(e) => setForm({ ...form, brandTitle: e.target.value })} required
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (Original Price)</label>
              <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} required
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sale Amount</label>
              <input type="number" value={form.saleAmount} onChange={(e) => setForm({ ...form, saleAmount: Number(e.target.value) })} required
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
              <div className="flex gap-3 items-start">
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Image URL" className="flex-1 px-3 py-2 border rounded-md text-sm" />
                <label className="btn-secondary cursor-pointer text-sm px-4 py-2 rounded-md whitespace-nowrap">
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const fd = new FormData()
                    fd.append('file', file)
                    try {
                      const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd })
                      const data = await res.json()
                      if (res.ok) setForm({ ...form, image: data.url })
                      else alert(data.message)
                    } catch { alert('Upload failed') }
                  }} />
                </label>
              </div>
              {form.image && (
                <img src={form.image} alt="preview" className="mt-2 h-20 w-20 object-cover rounded border" />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3}
                className="w-full px-3 py-2 border rounded-md text-sm" />
            </div>
          </div>
          <button type="submit" className="btn-primary mt-6">
            {editing ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">No products found</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Brand</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Stock ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Sale Price</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold">{product.title}</td>
                    <td className="px-4 py-3 text-sm">{product.brandTitle}</td>
                    <td className="px-4 py-3 text-sm font-mono">{product.stockId}</td>
                    <td className="px-4 py-3 text-sm line-through text-gray-400">₹{product.amount}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-accent">₹{product.saleAmount}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Edit</button>
                        <button onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination current={page} total={products.length} perPage={PER_PAGE} onPage={setPage} />
        </div>
      )}
    </div>
  )
}
