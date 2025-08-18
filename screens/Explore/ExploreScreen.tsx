import HeaderNavWithSearchComponent from '@/components/Headers/HeaderNavWithSearchComponent'
import Spaces from '@/components/SpacesComponent/Spaces'
import React, { useRef, useState } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ExploreScreen = () => {
  const [activeTab, setActiveTab] = useState("Spaces")
  const scrollY = useRef(new Animated.Value(0)).current

  // Animate only the tab row (not search)
  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50], // adjust height of tab row
    extrapolate: 'clamp',
  })

  const renderContent = () => {
    switch (activeTab) {
      case "Spaces":
        return <Spaces />
      case "Experiences":
        return <Text style={styles.content}>🎈 Experiences Component</Text>
      case "Services":
        return <Text style={styles.content}>🛎️ Services Component</Text>
      default:
        return <Text style={styles.content}>Default Component</Text>
    }
  }

  return (
    <SafeAreaView>
      <HeaderNavWithSearchComponent
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      {/* <Animated.View style={{ transform: [{ translateY }] }}>
        
      </Animated.View> */}

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style= {styles.container}
      >
        {renderContent()}
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingHorizontal: 16
    },
  content: {
    fontSize: 20,
    padding: 20,
  },
  placeholder: {
    height: 1000,
    fontSize: 16,
    padding: 20,
  },
})
