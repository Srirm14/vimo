import { create } from "zustand";

interface User {
  email: string;
  username: string;
}

interface GlobalStore {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: false, // Initially false

  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useGlobalStore;
