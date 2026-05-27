'use client'

interface PaginationProps {
  current: number
  total: number
  perPage: number
  onPage: (page: number) => void
}

export default function Pagination({ current, total, perPage, onPage }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPage(current - 1)}
        disabled={current <= 1}
        className="px-4 py-2 rounded text-sm font-semibold border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === totalPages || Math.abs(p - current) <= 1)
        .map((p, idx, arr) => (
          <span key={p} className="flex items-center gap-1">
            {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-gray-400">...</span>}
            <button
              onClick={() => onPage(p)}
              className={`w-10 h-10 rounded text-sm font-semibold ${
                p === current ? 'bg-accent text-white' : 'border hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          </span>
        ))}
      <button
        onClick={() => onPage(current + 1)}
        disabled={current >= totalPages}
        className="px-4 py-2 rounded text-sm font-semibold border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  )
}
