// src/stores/authActions.ts
import { router } from "expo-router";
import { useAuthStore } from "../Actions/AuthSlice";

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

const generateToken = (email: string) => {
  return `fake-jwt-token-${email}-${Date.now()}`;
};

const mockUsers: UserData[] = [];

export const setUserEmail = async (email: string) => {
  try {
    useAuthStore.getState().setEmail(email);
    return email;
  } catch (error) {
    console.error('Failed to set email', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    const token = generateToken(email);
    
    useAuthStore.getState().setAuthData({
      token,
      user
    });

    router.push('/(tabs)/Explore');
    
    return {
      token,
      userId: user.id,
      email,
    };
  } catch (error: any) {
    console.error('Login error:', error.message);
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async ({
  firstName,
  lastName,
  email,
  dateOfBirth,
  phoneNumber,
}: {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}) => {
  try {
    // Check if user already exists
    const userExists = mockUsers.some(u => u.email === email);
    if (userExists) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: UserData = {
      id: `user-${Date.now()}`,
      first_Name: firstName,
      last_Name: lastName,
      email,
      phone: phoneNumber,
      date_of_birth: dateOfBirth,
      role: 'user',
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);

    const token = generateToken(email);
    
    useAuthStore.getState().setAuthData({
      token,
      user: newUser
    });

    router.push('/(tabs)/Explore');
    
    return {
      success: true,
      message: 'Registration successful',
      data: {
        userId: newUser.id,
        email,
        phoneNumber,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const userExists = mockUsers.some(u => u.email === email);
    if (!userExists) {
      throw new Error('User not found');
    }
    
    return {
      success: true,
      message: 'Password reset email sent (simulated)',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to send password reset email',
    };
  }
};

export const logoutUser = async () => {
  try {
    useAuthStore.getState().logout();
    router.replace('/(tabs)/Explore');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
};

export const initializeAuth = async () => {
  try {
    const { token, user } = useAuthStore.getState();
    
    if (token && user) {
      return { token, user };
    }
    return null;
  } catch (error) {
    console.error('Auth initialization error:', error);
    return null;
  }
};