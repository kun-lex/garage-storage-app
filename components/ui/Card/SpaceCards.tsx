import { Product } from '@/api/Product/Actions/ProductSlice';
import { useProduct } from '@/api/Product/Hooks/useProduct';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type SpaceCardProps = Product & {
  onPress?: () => void;
  containerStyle?: object;
  imageStyle?: object;
  showPopularTag?: boolean;
};

const SpaceCard = (props: SpaceCardProps) => {
  const { 
    id, 
    name, 
    rating = 4.0, 
    reviewCount = 5, 
    priceFrom, 
    pricePerAdult = true, 
    location, 
    imageSource, 
    onPress, 
    containerStyle, 
    imageStyle, 
    showPopularTag = false 
  } = props;

  const router = useRouter();
  const toggleLike = useProduct((state) => state.toggleLike);
  const setSelectedProduct = useProduct((state) => state.setSelectedProduct);
  const isLiked = useProduct((state) => state.isLiked(id));

  const handleCardPress = () => {
    // Set the selected product in the store
    setSelectedProduct(props);
    
    // Navigate to product details screen
    router.push('/(routes)/Product/ProductDetails');
    
    // Call custom onPress if provided
    if (onPress) {
      onPress();
    }
  };

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
    <TouchableOpacity 
      style={[styles.container, containerStyle]} 
      onPress={handleCardPress}
      activeOpacity={0.8}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource} 
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
        
        {/* Popular tag */}
        {showPopularTag && (
          <View style={styles.popularTag}>
            <ThemedText type='default' fontFamily='poppins' fontSize={12} color='#FF6B6B'>
              Popular
            </ThemedText>
          </View>
        )}

        {/* Heart Icon */}
        <TouchableOpacity 
          style={styles.heartContainer}
          onPress={() => toggleLike(props)}
          activeOpacity={0.7}
        >
          <FontAwesome 
            name={isLiked ? "heart" : "heart-o"} 
            style={[styles.heartIcon, { color: isLiked ? '#FF6B6B' : '#999' }]} 
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ThemedText type='subtitle' fontFamily='poppins' fontSize={14}>
          {name}
        </ThemedText>
        
        <View style={styles.ratingContainer}>
          <ThemedText type='default' fontFamily='poppins' fontSize={12}>
            {rating.toFixed(1)}
          </ThemedText>
          <View style={{flexDirection: 'row'}}>{renderStars()}</View>
          <ThemedText type='default' fontFamily='poppins' color = '#666' fontSize={12}>
            ({reviewCount})
          </ThemedText>
        </View>
        
        <ThemedText type='default' fontFamily='poppins' fontSize={12}>
          from {priceFrom}{pricePerAdult ? ' per day' : ''}
        </ThemedText>
        
        <ThemedText type='default' fontFamily='poppins' color='#FF6B6B' fontSize={12}>
          {location}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default SpaceCard;

const styles = StyleSheet.create({
    container: {
      marginRight: 8,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden',
      width: 160,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: 160,
      height: 120,
      borderRadius: 10,
    },
    popularTag: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    heartContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartIcon: {
      color: '#FF6B6B',
      fontSize: 16,
    },
    content: {
      paddingTop: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    rating: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
      marginRight: 4,
    },
    starIcon: {
      color: '#FF6B6B',
      fontSize: 16,
      marginRight: 4,
    },
    reviewCount: {
      fontSize: 14,
      color: '#666',
    },
    price: {
      fontSize: 14,
      color: '#333',
      marginBottom: 4,
    },
    location: {
      fontSize: 14,
      color: '#FF6B6B',
      fontWeight: '400',
    },
});