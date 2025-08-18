// src/stores/authActions.ts
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const setUserEmail = async (email: string) => {
    try {
        console.log('Setting email to:', email);
        useAuthStore.getState().setEmail(email);
        console.log('Email set successfully');
        return email;
    } catch (error) {
        console.error('Failed to set email', error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
  try {
      const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
      });

      if (error) {
          throw new Error(error.message);
      }

      if (data.user && data.session) {
          console.log('Login console from useAuth successful:', data);

          // Get user data from your custom users table using the auth user ID
          const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id) // Use auth_user_id instead of email
              .single();

          if (userError || !userData) {
              console.error('User profile error:', userError);
              throw new Error('User profile not found');
          }

          const userInfo: UserData = {
              id: userData.id,
              first_Name: userData.first_Name,
              last_Name: userData.last_Name,
              email: userData.email,
              phone: userData.phone,
              date_of_birth: userData.date_of_birth,
              address: userData.address,
              role: userData.role,
              created_at: userData.created_at
          };

          // Update Zustand store
          useAuthStore.getState().setAuthData({
              token: data.session.access_token,
              user: userInfo,
          });

          // Redirect
          router.push('/(tabs)/Home');

          return {
              token: data.session.access_token,
              userId: userData.id,
              authUserId: data.user.id,
              email,
          };
      } else {
          throw new Error('Login failed: Missing user or session data');
      }
  } catch (error: any) {
      console.error('Login error:', error.message);
      throw new Error(error.message || 'Login failed');
  }
};

// Note: For PIN auth with your custom users table, you'll need to add a pin_hash column
export const loginUserWithPin = async (email: string, pin: string) => {
    try {
        // First, verify the PIN against your users table
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError || !user) {
            throw new Error('User not found');
        }

        // You'll need to implement PIN verification logic here
        // For now, this is a placeholder - you'll need to add pin_hash to your users table
        // and implement proper PIN hashing/verification
        
        // Example if you add pin_hash column:
        // if (user.pin_hash !== hashPin(pin)) {
        //     throw new Error('Invalid PIN');
        // }

        // For now, let's assume PIN is valid and create a session
        // You might need to handle this differently based on your PIN implementation
        
        const userData: UserData = {
            id: user.id,
            first_Name: user.first_Name,
            last_Name: user.last_Name,
            email: user.email,
            phone: user.phone,
            date_of_birth: user.date_of_birth,
            address: user.address,
            role: user.role,
            created_at: user.created_at,
            
        };

        // For PIN login, you might not have a Supabase session
        // You'll need to decide how to handle authentication state
        useAuthStore.getState().setAuthData({
            token: `custom_pin_token_${user.id}`, // Custom token for PIN auth
            user: userData,
        });

        router.push("/(tabs)/Home");

        return {
            token: `custom_pin_token_${user.id}`,
            userId: user.id,
            data: userData
        };
    } catch (error: any) {
        console.error('PIN Login error:', error);
        throw new Error(error.message || 'PIN Login failed');
    }
};

export const loginWithToken = async (token: string) => {
    try {
        // For custom tokens (like PIN auth), you might need different logic
        if (token.startsWith('custom_pin_token_')) {
            const userId = token.replace('custom_pin_token_', '');
            
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error || !user) {
                throw new Error('User not found');
            }

            const userData: UserData = {
                id: user.id,
                first_Name: user.first_Name,
                last_Name: user.last_Name,
                email: user.email,
                phone: user.phone,
                date_of_birth: user.date_of_birth,
                address: user.address,
                role: user.role,
                created_at: user.created_at,
                
            };

            useAuthStore.getState().setAuthData({
                token: token,
                user: userData,
            });

            router.push("/(tabs)/Home");
            return { token, user: userData };
        }

        // For regular Supabase tokens
        const { data, error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: '', // You'll need to store refresh token too
        });

        if (error) {
            throw new Error(error.message);
        }

        const authUser = data.user;
        if (authUser) {
            // Get user data from your custom users table
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('email', authUser.email)
                .single();

            if (userError || !userData) {
                throw new Error('User profile not found');
            }

            const userInfo: UserData = {
                id: userData.id,
                first_Name: userData.first_Name,
                last_Name: userData.last_Name,
                email: userData.email,
                phone: userData.phone,
                date_of_birth: userData.date_of_birth,
                address: userData.address,
                role: userData.role,
                created_at: userData.created_at,
            };

            useAuthStore.getState().setAuthData({
                token: data.session?.access_token || token,
                user: userInfo,
            });

            router.push("/(tabs)/Home");
            return { token, user: userInfo };
        } else {
            throw new Error("User not found in token login response");
        }
    } catch (error: any) {
        console.error("Token login error:", error);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
            throw new Error('No authenticated user found');
        }

        // Get user data from your custom users table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single();

        if (userError || !userData) {
            throw new Error('User profile not found in users table');
        }

        return {
            id: userData.id,
            full_name: userData.full_name,
            email: userData.email,
            phone: userData.phone,
            date_of_birth: userData.date_of_birth,
            address: userData.address,
            role: userData.role,
            created_at: userData.created_at,
            isEmailVerified: user.email_confirmed_at !== null,
        };
    } catch (error: any) {
        console.error('Failed to get user:', error);
        throw new Error(error.message || 'Failed to get user');
    }
};

export const initializeAuth = async (): Promise<{ token: string; user: UserData } | null> => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
            return null;
        }

        // Get user data from your custom users table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .single();

        if (userError || !userData) {
            console.warn('User profile not found in users table');
            return null;
        }

        const userInfo: UserData = {
            id: userData.id,
            first_Name: userData.first_Name,
            last_Name: userData.last_Name,
            email: userData.email,
            phone: userData.phone,
            date_of_birth: userData.date_of_birth,
            address: userData.address,
            role: userData.role,
            created_at: userData.created_at,
            
        };

        return {
            token: session.access_token,
            user: userInfo,
        };
    } catch (error) {
        console.error('Auth initialization error:', error);
        return null;
    }
};

export const sendVerificationCode = async (
  email: string
): Promise<{
  success: boolean;
  data?: any;
  message: string;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke("send-otp", {
      body: { email },
    });

    if (error) {
      return {
        success: false,
        message: error.message || "Failed to send verification code",
      };
    }

    return {
      success: true,
      data,
      message: "Verification code sent successfully",
    };
  } catch (error: any) {
    console.error("[SEND VERIFICATION CODE ERROR]", error);
    return {
      success: false,
      message: "Something went wrong while sending verification code",
    };
  }
};


export const verifyEmail = async (email: string, otp: string): Promise<{
    success: boolean;
    message: string;
}> => {
    try {
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'signup',
        });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: 'Email verified successfully',
        };
    } catch (error: any) {
        console.error('[VERIFY EMAIL ERROR]', error);
        return {
            success: false,
            message: 'Email verification failed',
        };
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
}): Promise<{
    success: boolean;
    message: string;
    data?: {
        userId: string;
        email: string;
        phoneNumber: string;
    };
}> => {
    try {
        // First, sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password: 'temp_password_' + Math.random().toString(36), // Generate temporary password
        });

        if (authError) {
            return {
                success: false,
                message: authError.message,
            };
        }

        if (authData.user) {
            // Insert user data into your custom users table
            const { data: userData, error: userError } = await supabase
                .from('users')
                .insert({
                    full_name: `${firstName} ${lastName}`,
                    email,
                    phone: phoneNumber,
                    date_of_birth: dateOfBirth,
                    role: 'user', // default role
                })
                .select()
                .single();

            if (userError) {
                console.error('User table insertion error:', userError);
                return {
                    success: false,
                    message: 'Failed to create user profile: ' + userError.message,
                };
            }

            // Update Zustand store if we have a session
            if (authData.session && userData) {
                const userInfo: UserData = {
                    id: userData.id,
                    first_Name: userData.first_Name,
                    last_Name: userData.last_Name,
                    email: userData.email,
                    phone: userData.phone,
                    date_of_birth: userData.date_of_birth,
                    address: userData.address,
                    role: userData.role,
                    created_at: userData.created_at,
                };

                useAuthStore.getState().setAuthData({
                    token: authData.session.access_token,
                    user: userInfo,
                });
            }

            return {
                success: true,
                message: 'Registration successful',
                data: {
                    userId: userData.id,
                    email,
                    phoneNumber,
                },
            };
        } else {
            return {
                success: false,
                message: 'Registration failed: No user data returned',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Registration failed',
        };
    }
};

export const setPasswordUser = async (userId: string, password: string) => {
    try {
        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: 'Password set successfully',
        };
    } catch (error: any) {
        console.error('Set password error:', error);
        return {
            success: false,
            message: error.message || 'Password creation failed',
        };
    }
};

export const logoutUser = async () => {
    try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Supabase logout error:', error);
        }

        // Clear AsyncStorage (if you're storing additional data)
        await AsyncStorage.clear();
        
        // Clear Zustand store
        useAuthStore.getState().logout();

        // Redirect to login
        router.replace('/(routes)/Login');
        
        return null;
    } catch (error) {
        console.error('Logout error:', error);
        // Still clear local data even if something fails
        useAuthStore.getState().logout();
        router.replace('/(routes)/Login');
        throw new Error('Failed to logout');
    }
};

// Additional Supabase-specific helper functions

export const getCurrentSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

export const resetPassword = async (email: string) => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: 'Password reset email sent',
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to send password reset email',
        };
    }
};