import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastState {
  toasts: Toast[]
  addToast: (message: string, type: ToastType) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast = { id, message, type }
    
    set({ toasts: [...get().toasts, toast] })
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      get().removeToast(id)
    }, 5000)
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(toast => toast.id !== id) })
  },
}))