import { useProduct } from '@/api/Product/Hooks/useProduct';
import { ThemedText } from '@/components/ThemedText';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');
const IMAGE_HEIGHT = 320;

const ProductDetailsScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const selectedProduct = useProduct((state) => state.selectedProduct);
  const toggleLike = useProduct((state) => state.toggleLike);
  const isLiked = useProduct((state) => 
    selectedProduct ? state.isLiked(selectedProduct.id) : false
  );

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT / 2, IMAGE_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Handle case where no product is selected
  if (!selectedProduct) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText type='title' fontFamily='poppins'>
          Product not found
        </ThemedText>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText type='default' fontFamily='poppins' color='#FF6B6B'>
            Go Back
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  const {
    name,
    rating = 4.0,
    reviewCount = 5,
    priceFrom,
    pricePerAdult = true,
    location,
    imageSource
  } = selectedProduct;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesome key={i} name="star" style={styles.starIcon} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FontAwesome key={i} name="star-half-o" style={styles.starIcon} />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" style={styles.starIcon} />);
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Background Image with fade-out on scroll */}
      <Animated.Image
        source={imageSource}
        style={[styles.backgroundImage, { opacity: imageOpacity }]}
        resizeMode="cover"
      />

      {/* Back Button and Heart */}
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.row]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleLike(selectedProduct)} 
            style={styles.headerButton}
          >
            <AntDesign 
              name={isLiked ? "heart" : "hearto"} 
              size={24} 
              color={isLiked ? "#FF6B6B" : "black"} 
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={[styles.scrollContent]}
        contentContainerStyle={styles.scrollInnerContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContent}>
          {/* Product Name */}
          <ThemedText type='defaultSemiBold' fontSize={24} style={styles.productName}>
            {name}
          </ThemedText>
          
          {/* Location */}
          <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={16} color="#FF6B6B" />
            <ThemedText type='default' fontFamily='poppins' color='#FF6B6B' fontSize={14} style={styles.location}>
              {location}
            </ThemedText>
          </View>

          {/* Rating and Reviews */}
          <View style={styles.ratingContainer}>
            <ThemedText type='default' fontFamily='poppins' fontSize={14} style={styles.rating}>
              {rating.toFixed(1)}
            </ThemedText>
            <View style={styles.starsContainer}>
              {renderStars()}
            </View>
            <ThemedText type='default' fontFamily='poppins' color='#666' fontSize={14}>
              ({reviewCount} reviews)
            </ThemedText>
          </View>

          {/* Description */}
          <ThemedText
            type="default"
            color='#6A6A6A'
            fontSize={14}
            style={styles.description}
          >
            Experience the beauty and wonder of {name} located in {location}. This amazing destination offers unforgettable experiences with a {rating.toFixed(1)} star rating from {reviewCount} satisfied customers.
          </ThemedText>

          {/* Price */}
          <View style={styles.priceContainer}>
            <ThemedText type='defaultSemiBold' fontSize={24} style={styles.price}>
              from {priceFrom}
            </ThemedText>
            <ThemedText type='default' fontFamily='poppins' color='#666' fontSize={14}>
              {pricePerAdult ? 'per day' : ''}
            </ThemedText>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Book Now Button */}
      <View style={styles.bookButtonContainer}>
        <TouchableOpacity style={styles.bookButton}>
          <ThemedText type='default' fontFamily='poppins' color='white' fontSize={18} style={styles.buttonText}>
            Book Now
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: IMAGE_HEIGHT,
    zIndex: 0,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },
  scrollContent: {
    flex: 1,
    zIndex: 1,
  },
  scrollInnerContent: {
    paddingTop: IMAGE_HEIGHT - 40,
    paddingBottom: 100,
  },
  innerContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    minHeight: height + 100,
  },
  headerButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#ffffffaa',
    borderRadius: 20,
    width: 40,
    alignItems: 'center',
  },
  productName: {
    marginBottom: 8,
    color: '#333',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    marginRight: 8,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    color: '#FF6B6B',
    fontSize: 16,
    marginRight: 2,
  },
  description: {
    lineHeight: 22,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    marginRight: 8,
    color: '#333',
  },
  bookButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
});