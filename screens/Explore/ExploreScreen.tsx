import { useAuthStore } from '@/api/Onboarding/Actions/AuthSlice'
import { loginUser } from '@/api/Onboarding/Hooks/useAuth'
import HeaderNavWithSearchComponent from '@/components/Headers/HeaderNavWithSearchComponent'
import Spaces from '@/components/SpacesComponent/Spaces'
import { ThemedText } from '@/components/ThemedText'
import ThemedButton from '@/components/ui/Button/ThemedButton'
import InputField from '@/components/ui/Inputs/InputField'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler'
import AnimatedReanimated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const ExploreScreen = () => {
    const [activeTab, setActiveTab] = useState('Spaces')
    const { token, user } = useAuthStore(state => state);
    const isAuthenticated = !!token;
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setUserEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  
    const handleLogin = async () => {
      if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password');
          return;
      }
  
      setIsSubmitting(true);
      try {
        const result = await loginUser(email.trim().toLowerCase(), password);
        console.log('Login successful:', result);
      } catch (error: any) {
          console.error('Login failed:', error);
          Alert.alert(
            'Login Failed', 
            error.message || 'Something went wrong. Please try again.',
            [{ text: 'OK' }]
          );
      } finally {
        setIsSubmitting(false);
      }
    };
    const handleForgotPassword = () => {
      // Navigate to forgot password screen or implement forgot password logic
      router.push('/(tabs)/Explore'); // Adjust route as needed
      // Or implement inline forgot password
      // Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
    };
  
    const handleGoogleLogin = async () => {
      router.push('/(tabs)/Explore');
    };
  
    const handleAppleLogin = async () => {
      router.push('/(tabs)/Explore');
    };

  const scrollY = useRef(new Animated.Value(0)).current

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  })

  // Modal animation
  const translateYModal = useSharedValue(SCREEN_HEIGHT)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(true)
      translateYModal.value = withSpring(0, { damping: 20 }) // slide up
    }
  }, [isAuthenticated])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYModal.value }],
  }))

  // Gesture for swiping down to close
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateYModal.value = event.translationY
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        translateYModal.value = withTiming(SCREEN_HEIGHT, { duration: 300 })
        runOnJS(setShowModal)(false)
      } else {
        translateYModal.value = withSpring(0, { damping: 20 })
      }
    })

  const renderContent = () => {
    switch (activeTab) {
      case 'Spaces':
        return <Spaces />
      case 'Experiences':
        return <Text style={styles.content}>🎈 Experiences Component</Text>
      case 'Services':
        return <Text style={styles.content}>🛎️ Services Component</Text>
      default:
        return <Text style={styles.content}>Default Component</Text>
    }
  }

  return (
    <GestureHandlerRootView style={{ height: '100%' }}>
      <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%'}}>
        <HeaderNavWithSearchComponent
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={styles.container}
        >
          {renderContent()}
        </Animated.ScrollView>

        {showModal && (
          <GestureDetector gesture={panGesture}>
            <AnimatedReanimated.View style={[styles.modal, animatedStyle]}>
                <View style={styles.handle} />
                <ThemedText
                  type='title'
                  fontSize={16}
                  fontFamily='poppins'
                  textAlign='center'
                >
                  Login or Signup
                </ThemedText>

                <InputField
                  label="Email"
                  placeholder="Enter email"
                  value={email}
                  onChangeText={setUserEmail}
                  keyboardType={"email-address"}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <InputField
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  secureTextEntry={true}
                />
                <View style={styles.forgotPassword}>
                  <TouchableOpacity onPress={handleForgotPassword} >
                      <ThemedText type="subtitle" fontFamily="poppins" fontSize={14} >
                          Forgot Password
                      </ThemedText>
                  </TouchableOpacity>
                </View>

                <ThemedButton
                  onPress={handleLogin}
                  title="Sign In"
                  loading={isSubmitting}
                  disabled={!email || !password}
                />

                <View style={styles.row}>
                  <ThemedText type="subtitle" fontFamily="poppins" fontSize={14} >
                    Don’t have an account, 
                  </ThemedText>
                  <TouchableOpacity
                    onPress={() => router.push('/(tabs)/Explore')
                    }
                  >
                      <ThemedText type="defaultSemiBold" fontFamily="poppins" fontSize={14} color='#FF725E'>
                        Sign up
                      </ThemedText>
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <View style={ styles.horizontalLine } />
                  <ThemedText type="subtitle" fontFamily="poppins" fontSize={14} style={{ marginHorizontal: 10 }} >
                    Or
                  </ThemedText>
                  <View style={ styles.horizontalLine } />
                </View>
                <ThemedButton
                  title="Sign Up With Apple"
                  onPress={handleAppleLogin}
                  icon={<AntDesign name="apple1" size={16} color="white" />}
                  iconPosition="left"
                  loading={isSubmitting}
                />
                <ThemedButton
                  title="Sign Up With Google"
                  onPress={handleGoogleLogin}
                  icon={<AntDesign name="google" size={16} color="white" />}
                  iconPosition="left"
                  bgColor="#000000"
                  loading={isSubmitting}
                />
            </AnimatedReanimated.View>
          </GestureDetector>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 16,
    height: '100%'
  },
  content: {
    fontSize: 20,
    padding: 20,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 0.85,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    zIndex: 4,
    flexDirection: 'column',
    gap: 16
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  closeBtn: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  horizontalLine: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: 'gray'
  },
  spacedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
})
