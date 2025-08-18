import { logoutUser } from '@/api/Onboarding/Hooks/useAuth';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const handleLogout = () => {
    try {
      logoutUser();      
    } catch (error) {
      console.error('Logout failed:', error);
      // Show error message to user
      Alert.alert(
        'Logout Failed',
        'Something went wrong. Please try again.',
        [{ text: 'OK' }]
      );
      
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={[styles.row, { paddingHorizontal: 16, paddingBottom: 10 }]}>
        <ThemedText type='defaultSemiBold' fontFamily='poppins' fontSize={16}>
          Profile
        </ThemedText>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FF725E" />
        </TouchableOpacity>
        
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text>ProfileScreen</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'column',
    height: '100%',
    gap: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
})