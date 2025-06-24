import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (publicId: string) => void
  removeItem: (publicId: string) => void
  updateQuantity: (publicId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (publicId) => {
        const { items } = get()
        const existingItem = items.find(item => item.publicId === publicId)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.publicId === publicId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ items: [...items, { publicId, quantity: 1 }] })
        }
      },
      removeItem: (publicId) => {
        set({ items: get().items.filter(item => item.publicId !== publicId) })
      },
      updateQuantity: (publicId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(publicId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.publicId === publicId
              ? { ...item, quantity }
              : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)