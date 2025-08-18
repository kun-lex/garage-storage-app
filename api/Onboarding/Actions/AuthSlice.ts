// src/stores/authStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserData {
  id: string;
  first_Name: string;
  last_Name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address?: string;
  role: 'user' | 'artisan' | 'admin' | 'business';
  created_at: string;
}

interface AuthState {
  token: string | null;
  user: UserData | null;
  email: string | null;
  isAuthenticated: boolean;
  setAuthData: (data: { token: string; user: UserData }) => void;
  setEmail: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      email: null,
      isAuthenticated: false,
      setAuthData: (data) => set({ 
        token: data.token, 
        user: data.user, 
        isAuthenticated: true 
      }),
      setEmail: (email) => set({ email }),
      logout: () => set({ 
        token: null, 
        user: null, 
        isAuthenticated: false,
        email: null 
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);