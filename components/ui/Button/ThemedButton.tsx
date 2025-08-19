import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  bgColor?: string;
};

const ThemedButton = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  bgColor = '#FF725E',
}: CustomButtonProps) => {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: bgColor },
        isDisabled && styles.disabled,
      ]}
      onPress={!isDisabled ? onPress : undefined}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && <View style={styles.icon}>{icon}</View>}
          <ThemedText
            type="defaultSemiBold"
            fontFamily="poppins"
            fontSize={14}
            style={{ color: 'white' }}
          >
            {title}
          </ThemedText>
          {icon && iconPosition === 'right' && <View style={styles.icon}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
});
