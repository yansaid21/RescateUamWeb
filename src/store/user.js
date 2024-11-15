import { create } from 'zustand'

export const userStore = create((set) => ({
  user: null,
  role: null,
  setRole: (newRole) => set(() => ({ role: newRole })),
  setUser: (newUser) => set(() => ({ user: newUser })),
  removeUser: () => set({ user: null })
}))