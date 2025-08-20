import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

// ICONS
import { useAuthStore } from '@/api/Onboarding/Actions/AuthSlice';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const { token } = useAuthStore(state => state);
  const isAuthenticated = !!token;

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
                <Text style={styles.foucedLabel}>Explore</Text>
              ) : (
                <Text style={styles.label}>Explore</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <AntDesign name="search1" size={24} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />

        <Tabs.Screen
          name="Wishlist/index"
          options={{
            title: 'Wishlist',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={styles.foucedLabel}>Wishlist</Text>
              ) : (
                <Text style={styles.label}>Wishlist</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <AntDesign name="hearto" size={24} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />

        <Tabs.Screen
          name="Space/index"
          options={{
            title: 'Space',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={styles.foucedLabel}>Space</Text>
              ) : (
                <Text style={styles.label}>Space</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="garage" size={30} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />

        <Tabs.Screen
          name="Messages/index"
          options={{
            title: 'Messages',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={styles.foucedLabel}>Messages</Text>
              ) : (
                <Text style={styles.label}>Messages</Text>
              ),
            tabBarIcon: ({ focused }) => (
              <AntDesign name="message1" size={24} color={focused ? "#FF725E" : "#656565"} />
            ),
          }}
        />

        <Tabs.Screen
          name="Login/index"
          options={{
            title: isAuthenticated ? 'Profile' : 'Log in',
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={styles.foucedLabel}>
                  {isAuthenticated ? 'Profile' : 'Log in'}
                </Text>
              ) : (
                <Text style={styles.label}>
                  {isAuthenticated ? 'Profile' : 'Log in'}
                </Text>
              ),
            tabBarIcon: ({ focused }) =>
              isAuthenticated ? (
                <AntDesign name="user" size={24} color={focused ? "#FF725E" : "#656565"} />
              ) : (
                <AntDesign name="login" size={24} color={focused ? "#FF725E" : "#656565"} />
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
  foucedLabel: {
    textTransform: 'capitalize',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
    color: '#FF725E'
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF725E',
    marginTop: 10,
  },
});
