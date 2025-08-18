import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type TextProps,
} from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  fontFamily?: 'poppins' | 'inter';
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  showExpandToggle?: boolean;
  initialLines?: number;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  fontFamily = 'poppins',
  fontSize = 12,
  textAlign = 'left',
  color = '#000000',
  showExpandToggle = false,
  initialLines,
  children,
  ...rest
}: ThemedTextProps) {
  const [expanded, setExpanded] = useState(false);

  const getFontFamily = () => {
    if (fontFamily === 'inter') {
      switch (type) {
        case 'title':
          return 'Inter_700Bold';
        case 'defaultSemiBold':
          return 'Inter_600SemiBold';
        case 'subtitle':
          return 'Inter_500Medium';
        case 'link':
          return 'Inter_500Medium';
        default:
          return 'Inter_400Regular';
      }
    } else {
      switch (type) {
        case 'title':
          return 'Poppins_700Bold';
        case 'defaultSemiBold':
          return 'Poppins_600SemiBold';
        case 'subtitle':
          return 'Poppins_500Medium';
        case 'link':
          return 'Poppins_300Light';
        default:
          return 'Poppins_400Regular';
      }
    }
  };

  if (!showExpandToggle) {
    return (
      <Text
        numberOfLines={initialLines}
        style={[
          {
            color,
            fontFamily: getFontFamily(),
            fontSize,
            textAlign
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
  }

  return (
    <View>
      <Text
        numberOfLines={expanded ? undefined : initialLines}
        style={[
          {
            color,
            fontFamily: getFontFamily(),
            fontSize,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={[styles.toggleText, { fontSize: fontSize * 0.9 }]}>
          {expanded ? 'Show less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleText: {
    color: '#FF725E',
    marginTop: 2,
    fontFamily: 'Poppins_500Medium',
  },
});
