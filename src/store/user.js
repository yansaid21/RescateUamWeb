import { create } from "zustand";
import UserController from "../api/user";

export const userStore = create((set) => ({
  user: null,
  role: null,
  reloading: false,
  setRole: (newRole) => set({ role: newRole }),
  setUser: (newUser) => set({ user: newUser }),
  removeUser: () => set({ user: null }),
  verifyToken: async (sessionToken) => {
    const { data: user } = await UserController.getProfile(sessionToken);
    if (user) {
      set({ user });
      set({ role: user.role.id });
      return true;
    }
    return false;
  },
  syncUser: async (reload = false) => {
    try {
      if (reload) {
        set({ reloading: true });
      }
      const { data: user } = await UserController.getProfile();
      if (user) {
        set({ user });
        set({ role: user.role.id });
      }
    } catch (error) {
      console.error("Error syncing user", error);
    } finally {
      set({ reloading: false });
    }
  },
}));
