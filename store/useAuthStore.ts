import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mutate } from 'swr'

type authState = {
  AccessToken: string | null
  setAccessToken: (token: string) => void
  userLogout: () => void
}

export const useAuthStore = create<authState>()(
  persist(
    (set) => ({
      AccessToken: null,
      setAccessToken: (token: string) => {
        set({ AccessToken: token })
      },
      userLogout: () => {
        set({ AccessToken: null })
        mutate('/user/me', null, { revalidate: false })
        mutate(
          (key) =>
            typeof key === 'string' && key.startsWith('/user/me'),
          null,
          { revalidate: false },
        )
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
