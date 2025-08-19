import { ThemedText } from '@/components/ThemedText';
import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface DigitInputFieldProps {
    title?: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
}

const DigitInputField = ({
    title,
    value,
    onChangeText,
    error
}: DigitInputFieldProps) => {
    const inputRefs = useRef<(TextInput | null)[]>([]);
    
    // Split the value into individual digits
    const digits = value.split('').concat(Array(4 - value.length).fill(''));
    digits.length = 6; // Ensure we always have 4 elements

    const handleDigitChange = (text: string, index: number) => {
        const newDigits = [...digits];
        newDigits[index] = text;
        
        // Join the digits and send to parent
        const newValue = newDigits.join('');
        onChangeText(newValue);

        // Move to the next input when a digit is entered
        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (event: { nativeEvent: { key: string } }, index: number) => {
        // Move to the previous input when backspace is pressed and field is empty
        if (event.nativeEvent.key === 'Backspace' && index > 0 && digits[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View>
            {title && (
                <ThemedText type="subtitle" fontSize={12} color='#5D5D5D' fontFamily="poppins">
                    {title}
                </ThemedText>
            )}
            <View style={{ flexDirection: "row", marginVertical: 16 }}>
                {digits.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={[
                            styles.input,
                            error ? styles.errorInput : null
                        ]}
                        keyboardType="number-pad"
                        autoFocus={index === 0 && value.length === 0}
                        maxLength={1}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        onChangeText={(text) => handleDigitChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        value={digit}
                    />
                ))}
            </View>
            {error && (
                <ThemedText type="subtitle" fontSize={12} color='#FF4D4F' fontFamily="poppins">
                    {error}
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: 35,
        height: 42,
        textAlign: 'center',
        fontSize: 16,
        marginRight: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    errorInput: {
        borderColor: '#FF4D4F'
    }
});

export default DigitInputField;