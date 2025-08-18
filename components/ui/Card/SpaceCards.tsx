import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type SpaceCardProps = {
    name: string;
    rating?: number;
    reviewCount?: number;
    priceFrom: string;
    pricePerAdult?: boolean;
    location: string;
    imageSource: { uri: string };
    onPress?: () => void;
    containerStyle?: object;
    imageStyle?: object;
};

const SpaceCard = ({
  name,
  rating = 4.0,
  reviewCount = 5,
  priceFrom,
  pricePerAdult = true,
  location,
  imageSource,
  onPress,
  containerStyle,
  imageStyle
}: SpaceCardProps) => {
  // Generate star rating display
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
        onPress={onPress}
        activeOpacity={0.8}
    >
        {/* Image */}
        <Image 
            source={imageSource} 
            style={[styles.image, imageStyle]}
            resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
            {/* Restaurant Name */}
            <ThemedText type='defaultSemiBold' fontFamily='poppins' fontSize={14}>
            {name}
            </ThemedText>
            
            {/* Rating */}
            <View style={styles.ratingContainer}>
              <ThemedText type='default' fontFamily='poppins' fontSize={12}>
                {rating.toFixed(1)}
              </ThemedText>

              <View style={{flexDirection: 'row'}}>
                {renderStars()}
              </View>

              <ThemedText type='default' fontFamily='poppins' color = '#666' fontSize={12}>
                ({reviewCount})
              </ThemedText>
            </View>
            
            {/* Price */}
            <ThemedText type='default' fontFamily='poppins' fontSize={12}>
            from {priceFrom}{pricePerAdult ? ' per adult' : ''}
            </ThemedText>
            
            {/* Location */}
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
    image: {
      width: 160,
      height: 120,
      borderRadius: 10,
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
      color: '#FF6B6B', // Orange/red color to match the design
      fontWeight: '400',
    },
  });