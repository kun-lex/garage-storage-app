import SplashLogo from '@/assets/images/splash-icon.svg';
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 1000); 

        return () => clearTimeout(timer);
    }, []);

    if (!isReady) {
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

    return <Redirect href="/(tabs)/Explore" />;
}