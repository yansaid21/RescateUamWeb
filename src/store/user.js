import { create } from "zustand";
import { ENV } from "../utils/constants";
import UserController from "../api/user";

export const userStore = create((set) => ({
  user: null,
  role: null,
  setRole: (newRole) => set({ role: newRole }),
  setUser: (newUser) => set({ user: newUser }),
  removeUser: () => set({ user: null }),
  verifyToken: async (sessionToken) => {
    const { data: user } = await UserController.getProfile(
      sessionToken,
      ENV.INSTITUTION_ID,
    );
    if (user) {
      set({ user });
      set({ role: user.role.id });
      return true;
    }
    return false;
  },
}));
