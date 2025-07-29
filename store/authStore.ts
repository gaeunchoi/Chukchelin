import { User } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type authState = {
  AccessToken: string | null
  user: User | null
  userLogin: (token: string, user: User) => void
  userLogout: () => void
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      AccessToken: null,
      user: null,
      userLogin: (token: string, user: User) => {
        set({ AccessToken: token, user })
      },
      userLogout: () => {
        set({ AccessToken: null, user: null })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
