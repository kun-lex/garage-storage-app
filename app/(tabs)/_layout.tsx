import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

// ICONS
import AiAssistantIcon from '@/assets/icons/AiAssitantIcon';
import ArtisanIcon from '@/assets/icons/ArtisanIcon';
import ExploreIcon from '@/assets/icons/ExploreIcon';
import HomeIcon from '@/assets/icons/HomeIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Tabs
        screenOptions={() => ({
          tabBarStyle: [
            styles.container,
            Platform.OS === 'android' ? { height: 80 } : null
          ],
          tabBarActiveTintColor: Colors['light'].tint,
          tabBarInactiveTintColor: '#A4A4A4',
          tabBarLabelStyle: styles.label,
          headerShown: false,
          tabBarButton: (props) => {
            const { style, disabled, ...rest } = props;
            return (
              <TouchableOpacity
                {...(props as TouchableOpacityProps)}
                style={[props.style, { backgroundColor: 'transparent' }]}
                activeOpacity={1}
              />
            );
          }
          
        })}
      >
        <Tabs.Screen
          name="Explore/index"
          options={{
            title: 'Explore',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <View style={styles.dot} />
              ) : (
                <Text style={styles.label}>Home</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <HomeIcon width={30} height={30} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />
        <Tabs.Screen
          name="Wishlist/index"
          options={{
            title: 'Wishlist',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <View style={styles.dot} />
              ) : (
                <Text style={styles.label}>Artisan</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <ArtisanIcon width={30} height={30} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />

        <Tabs.Screen
          name="Space/index"
          options={{
            title: 'Space',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <View style={styles.dot} />
              ) : (
                <Text style={styles.label}>Explore</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <ExploreIcon width={30} height={30} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />

        <Tabs.Screen
          name="Messages/index"
          options={{
            title: 'Messages',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <View style={styles.dot} />
              ) : (
                <Text style={styles.label}>Assistant</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <AiAssistantIcon width={30} height={30} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />


        <Tabs.Screen
          name="Login/index"
          options={{
            title: 'Log in',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <View style={styles.dot} />
              ) : (
                <Text style={styles.label}>Profile</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <ProfileIcon width={30} height={30} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />
      </Tabs>      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
    color: '#656565'
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF725E',
    marginTop: 10,
  },  
});