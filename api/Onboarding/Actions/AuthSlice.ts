// src/stores/authStore.ts (Enhanced version with loading states and hydration)
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
    role: string;
    created_at: string;
}

interface AuthState {
    _id: string;
    name: string;
    email: string;
    token: string | null;
    userData: UserData | null;
    phoneNumber?: string;
    lastLogin: number | null;
    // Loading states
    isLoading: boolean;
    isLoginLoading: boolean;
    isRegisterLoading: boolean;
    isVerificationLoading: boolean;
    error: string | null;
    // Hydration state
    _hasHydrated: boolean;
}

interface AuthActions {
    setEmail: (email: string) => void;
    setAuthData: (data: { token: string; user: UserData }) => void;
    setUserData: (data: {user: UserData}) => void;
    clearAuthData: () => void;
    updateUserData: (updates: Partial<UserData>) => void;
    logout: () => void;
    // Loading actions
    setLoading: (loading: boolean) => void;
    setLoginLoading: (loading: boolean) => void;
    setRegisterLoading: (loading: boolean) => void;
    setVerificationLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    // Hydration action
    setHasHydrated: (hasHydrated: boolean) => void;
}

const initialState: AuthState = {
    _id: '',
    name: '',
    email: '',
    token: null,
    userData: null,
    lastLogin: null,
    isLoading: false,
    isLoginLoading: false,
    isRegisterLoading: false,
    isVerificationLoading: false,
    error: null,
    _hasHydrated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            // Initial state
            ...initialState,
            
            // Actions
            setEmail: (email: string) => {
                set({ email });
            },
            
            setAuthData: (data: { token: string; user: UserData }) => {
                set({
                    token: data.token,
                    userData: data.user,
                    email: data.user.email,
                    lastLogin: Date.now(),
                    error: null,
                });
            },
            
            setUserData: (data: {user: UserData}) => {
                set({
                    userData: data.user,
                    email: data.user.email,
                    _id: data.user.id,
                })
            },
            
            clearAuthData: () => {
                set({
                    ...initialState,
                    _hasHydrated: true, // Keep hydrated state
                    isLoading: false,
                    isLoginLoading: false,
                    isRegisterLoading: false,
                    isVerificationLoading: false,
                });
            },
            
            updateUserData: (updates: Partial<UserData>) => {
                const { userData } = get();
                if (userData) {
                    const updatedUserData = { ...userData };
                    
                    // Update specific fields
                    if (updates.first_Name !== undefined) updatedUserData.first_Name = updates.first_Name;
                    if (updates.last_Name !== undefined) updatedUserData.last_Name = updates.last_Name;
                    if (updates.phone !== undefined) updatedUserData.phone = updates.phone;
                    if (updates.email !== undefined) {
                        updatedUserData.email = updates.email;
                        set({ email: updates.email }); // Keep both in sync
                    }
                    
                    set({ userData: updatedUserData });
                }
            },
            
            logout: () => {
                set({
                    token: null,
                    userData: null,
                    lastLogin: null,
                    email: '',
                    name: '',
                    error: null,
                });
            },
            
            // Loading actions
            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },
            
            setLoginLoading: (loading: boolean) => {
                set({ isLoginLoading: loading });
            },
            
            setRegisterLoading: (loading: boolean) => {
                set({ isRegisterLoading: loading });
            },
            
            setVerificationLoading: (loading: boolean) => {
                set({ isVerificationLoading: loading });
            },
            
            setError: (error: string | null) => {
                set({ error });
            },
            
            clearError: () => {
                set({ error: null });
            },

            // Hydration action
            setHasHydrated: (hasHydrated: boolean) => {
                set({ _hasHydrated: hasHydrated });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                token: state.token,
                userData: state.userData,
                lastLogin: state.lastLogin,
                email: state.email,
                name: state.name,
                // Don't persist loading states, errors, or hydration state
            }),
            onRehydrateStorage: () => (state) => {
                // Set hydrated to true when rehydration is complete
                if (state) {
                    state._hasHydrated = true;
                }
            },
        }
    )
);

// Custom hooks for easier usage
export const useAuth = () => {
    const { token, userData, isLoading, error, _hasHydrated } = useAuthStore((state) => ({
        token: state.token,
        userData: state.userData,
        isLoading: state.isLoading,
        error: state.error,
        _hasHydrated: state._hasHydrated,
    }));
    
    return {
        isAuthenticated: !!token,
        userData,
        isLoading,
        error,
        hasHydrated: _hasHydrated,
    };
};

export const useAuthLoading = () => {
    const { isLoginLoading, isRegisterLoading, isVerificationLoading, isLoading } = useAuthStore((state) => ({
        isLoginLoading: state.isLoginLoading,
        isRegisterLoading: state.isRegisterLoading,
        isVerificationLoading: state.isVerificationLoading,
        isLoading: state.isLoading,
    }));
    
    return {
        isLoginLoading,
        isRegisterLoading,
        isVerificationLoading,
        isLoading,
    };
};