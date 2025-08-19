import { useAuthStore } from '@/api/Onboarding/Actions/AuthSlice'
import { useProduct } from '@/api/Product/Hooks/useProduct'
import AuthGuard from '@/components/Auth/AuthGuard'
import WishlistItem from '@/components/Product/WishlistItem'
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
      <FlatList
        data={likedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistItem {...item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <AuthGuard 
              title='No Wishlists Yet' 
              subTitle='You have not added any products to your wishlist' 
              paragraph='Browse and tap the heart icon to save them here.'
            />
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
