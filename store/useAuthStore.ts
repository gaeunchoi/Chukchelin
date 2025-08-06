import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type authState = {
  AccessToken: string | null
  setAccessToken: (token: string) => void
  userLogout: () => void
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      AccessToken: null,
      user: null,
      setAccessToken: (token: string) => {
        set({ AccessToken: token })
      },
      userLogout: () => {
        set({ AccessToken: null })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
