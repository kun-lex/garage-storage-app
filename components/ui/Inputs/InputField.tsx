import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: React.ReactNode; // New icon prop
  keyboardType?: any;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  icon,
  keyboardType,
  error,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const showError = Boolean(error);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View >
      {label ?
        <ThemedText type="default" fontFamily="poppins" color='#5D5D5D' fontSize={12} >
            {label}
        </ThemedText>
        : null
      }
      <View style={[
        styles.container,
        { 
          borderColor: isFocused ? "#FF725E" : "#E0E0E0",
        },
        showError && styles.errorBorder,
      ]}>
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        <TextInput
          style={
            { 
              flex: 1,
              height: 42,
              fontFamily: "Poppins_400Regular",
              fontSize: 14,
              paddingVertical: 0, // Important for Android
              includeFontPadding: false, // Removes extra padding around fonts
              textAlignVertical: 'center',
            }
          }
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)} // Set focus state
          onBlur={() => setIsFocused(false)} // Reset on blur
          placeholderTextColor={'#E0E0E0'}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {showError && 
        <View style={styles.Containers}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      }
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, 
    borderRadius: 20,
    width: '100%',
    borderWidth: 2,
    marginTop: 5,
  },
  eyeIcon: {
      padding: 10,
  },
  Containers:{
      flexDirection: 'row',
      alignItems: 'center',
      // marginBottom:10,
      // marginTop:5,
      marginRight:20
    },
  currencySymbol: {
      color: "black", 
      fontSize: 16, 
      marginRight: 5,
      marginVertical:"auto"
  },
  errorText: {
      color: '#FF4D4F',
      fontSize: 12,
      marginTop: 4,
      fontFamily: "Proxima Nova",
      lineHeight:19,
      marginLeft: 5,
    },
    errorBorder: {
      borderColor: '#FF4D4F',
    },
});