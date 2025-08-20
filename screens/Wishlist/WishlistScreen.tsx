import { useAuthStore } from '@/api/Onboarding/Actions/AuthSlice'
import { useProduct } from '@/api/Product/Hooks/useProduct'
import AuthGuard from '@/components/Auth/AuthGuard'
import WishlistItem from '@/components/Product/WishlistItem'
import { ThemedText } from '@/components/ThemedText'
import ThemedButton from '@/components/ui/Button/ThemedButton'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const WishlistScreen = () => {
  const likedProducts = useProduct((s) => s.likedProducts)
  const email = useAuthStore((s) => s.email || s.user?.email) // check both

  if (!email) {
    return (
      <SafeAreaView style={styles.container}>
        <AuthGuard 
          title='Wishlist' 
          subTitle='Log in to view your wishlists' 
          paragraph='You can create and save products' 
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10, marginTop: 10, paddingHorizontal: 16}}>
        <ThemedText type='defaultSemiBold' fontFamily='poppins' fontSize={24} >
          Wishlist
        </ThemedText>
      </View>

      <FlatList
        data={likedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistItem {...item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10,}}>
            <ThemedText type='subtitle' fontFamily='poppins' fontSize={16}>
              You have not added any products to your wishlist
            </ThemedText>
            <ThemedText type='default' fontFamily='poppins' fontSize={12}>
              Browse and tap the heart icon to save them here.
            </ThemedText>
            <ThemedButton title='Start Exploring' onPress={() => router.push('/(tabs)/Explore')}/>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF'
  }
})
