'use client'

import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'
import ConfirmModal from '@/components/ConfirmModal'
import { useToast } from '@/components/context/ToastContext'

interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

const PER_PAGE = 10

export default function AdminContacts() {
  const { showToast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin/contacts')
      const data = await res.json()
      setContacts(data.contacts || [])
    } catch (err) {
      console.error('Failed to fetch contacts', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      const res = await fetch(`/api/contacts/${deleteTarget._id}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c._id !== deleteTarget._id))
        showToast('Contact query deleted', 'success')
      } else {
        showToast('Failed to delete', 'error')
      }
    } catch (err) {
      showToast('Something went wrong', 'error')
    } finally {
      setDeleteTarget(null)
    }
  }

  const paginated = contacts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Contact Queries</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">No contact queries yet</div>
      ) : (
        <>
          <div className="space-y-4">
            {paginated.map((contact) => (
              <div key={contact._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-primary-dark text-base sm:text-lg truncate">{contact.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{contact.email}</p>
                    {contact.phone && <p className="text-xs sm:text-sm text-gray-500">{contact.phone}</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(contact.createdAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setDeleteTarget(contact)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold flex-shrink-0 ml-2">Delete</button>
                </div>
                <div className="bg-gray-50 rounded p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-gray-700">{contact.message}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination current={page} total={contacts.length} perPage={PER_PAGE} onPage={setPage} />
        </>
      )}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Contact Query"
        message={`Are you sure you want to delete the query from "${deleteTarget?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
