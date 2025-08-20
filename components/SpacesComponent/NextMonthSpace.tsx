import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { ScrollView, View } from 'react-native';
import SpaceCard from '../ui/Card/SpaceCards';

type NextMonthSpaceListProps = {
  title: string;
  data: {
    id: string;
    name: string;
    rating?: number;
    reviewCount?: number;
    priceFrom: string;
    pricePerAdult?: boolean;
    location: string;
    imageSource: { uri: string };
    onPress?: () => void;
  }[];
};

const NextMonthSpaceList: React.FC<NextMonthSpaceListProps> = ({ title, data }) => {
  return (
    <View>
      <ThemedText
        type="subtitle"
        fontFamily="poppins"
        fontSize={16}
        style={{ marginBottom: 4 }}
      >
        {title}
      </ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <SpaceCard
            key={item.id}
            id={item.id}
            name={item.name}
            rating={item.rating}
            reviewCount={item.reviewCount}
            priceFrom={item.priceFrom}
            pricePerAdult={item.pricePerAdult}
            location={item.location}
            imageSource={item.imageSource}
            showPopularTag={false}
            onPress={item.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default NextMonthSpaceList;
