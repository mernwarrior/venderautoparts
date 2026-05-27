import axiosInstance from '@/config/axios.config'

// ─── Types ───────────────────────────────────────────────────────
export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: { id: string }
}

// ─── Submit contact form ──────────────────────────────────────────
export const submitContact = async (payload: ContactPayload): Promise<ContactResponse> => {
  const response = await axiosInstance.post<ContactResponse>('/contact', payload)
  return response.data
}

// ─── Get all contact messages (admin) ────────────────────────────
export const getAllContacts = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get(`/contact?page=${page}&limit=${limit}`)
  return response.data
}
