import { useAuthStore } from '@/api/Onboarding/Actions/AuthSlice';
import SplashLogo from '@/assets/images/splash-icon.svg';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

type ValidRoute = '/(tabs)/Explore';

export default function index() {
    const [initialRoute, setInitialRoute] = useState<ValidRoute | null>(null);
    const [isReady, setIsReady] = useState(false);
    
    const userEmail = useAuthStore((state) => state.email);
    const hasHydrated = useAuthStore((state) => state._hasHydrated);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        const determineInitialRoute = async () => {
            try {
                console.log('=== Route Determination Debug ===');
                console.log('Platform:', Platform.OS);
                console.log('Has hydrated:', hasHydrated);
                console.log('User email:', userEmail);
                console.log('Token:', token ? 'exists' : 'null');
                console.log('=================================');

                // Wait for store to hydrate
                if (!hasHydrated) {
                    console.log('Store not hydrated yet, waiting...');
                    return;
                }

                // Add platform-specific delay for Android
                if (Platform.OS === 'android') {
                    console.log('Android detected, adding delay...');
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                // Determine route based on auth state
                // Check both email and token for better reliability
                const isAuthenticated = (userEmail && userEmail.trim() !== '') || token;
                
                if (isAuthenticated) {
                    console.log('User authenticated, navigating to Home');
                    setInitialRoute('/(tabs)/Explore');
                }
                
                setIsReady(true);
            } catch (error) {
                console.error('Error determining route:', error);
                // Fallback to onboarding on error
                setInitialRoute('/(tabs)/Explore');
                setIsReady(true);
            }
        };

        determineInitialRoute();
    }, [userEmail, hasHydrated, token]);

    // Show loading screen while determining route
    if (!hasHydrated || !initialRoute || !isReady) {
        return (
            <View style={{ 
                flex: 1, 
                backgroundColor: '#FB5E39', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <SplashLogo width={200} height={70} />
                <ActivityIndicator 
                    size="large" 
                    color="#FFFFFF" 
                    style={{ marginTop: 20 }} 
                />
            </View>
        );
    }

    console.log('Redirecting to:', initialRoute);
    return <Redirect href={initialRoute} />;
}