import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ConnectedUser } from '@/types'

interface AuthState {
  user: ConnectedUser | null
  isAuthenticated: boolean
  setUser: (user: ConnectedUser | null) => void
  logout: () => void
  hasAuthority: (authority: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      hasAuthority: (authority) => {
        const { user } = get()
        return user?.authorities?.includes(authority) ?? false
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)