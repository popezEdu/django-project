import create from "zustand";
import { mountStoreDevtools } from "simple-zustand-devtools ";

const useAuthStore = create((set, get) => ({
  allUserData: null,
  loading: false,

  user: () => ({
    user_id: get().allUserData?.user_id || null,
    username: get().allUserData?.username || null,

    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    setLoggedIn: () => get().allUserData !== null,
  }),
}));

// import.meta.env is a special object provided by modern build tools like Vite that exposes environment variables at build time and runtime within your JavaScript module.
// import.meta.env.DEV is a built-in boolean variable indicating whether the app is running in development mode (true during development, false in production)

if (import.meta.env.DEV) {
  mountStoreDevtools("Store", useAuthStore);
}
