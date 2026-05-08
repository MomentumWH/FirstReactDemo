import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  user: string
}

type AuthState = {
  isAuthenticated: boolean
  userInfo: AuthUser | null
  login: (userInfo: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userInfo: null,
      login: (userInfo) => set({
        isAuthenticated: true,
        userInfo,
      }),
      logout: () => set({
        isAuthenticated: false,
        userInfo: null,
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userInfo: state.userInfo,
      }),
    },
  ),
)
