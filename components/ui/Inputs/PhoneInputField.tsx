import { ThemedText } from '@/components/ThemedText';
import { CountryCodeAndFlag } from '@/constants/CountryCodeAndFlag';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const PhoneInputField = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(CountryCodeAndFlag[157]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredCountries = CountryCodeAndFlag.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
    );

    const selectCountry = (country: typeof CountryCodeAndFlag[0]) => {
        setSelectedCountry(country);
        setModalVisible(false);
        setSearchQuery(''); // Clear search when modal closes
    };

  return (
    <View>
        <ThemedText type="default" fontFamily="poppins" color='#5D5D5D' fontSize={12} >
            Phone Number
        </ThemedText>
        <View style={styles.row}>
            <TouchableOpacity
            style={styles.flagBox}
            onPress={() => setModalVisible(true)}
            >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <AntDesign name="down" size={12} color="black" />
            </TouchableOpacity>
            <TextInput
                style={[
                    styles.phoneInput,
                    { 
                        borderColor: isFocused ? "#FF725E" : "#E0E0E0",
                    },
                ]}
                placeholder="Enter phone number"
                value={searchQuery}
                onChangeText={setSearchQuery}
                keyboardType='phone-pad'
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setIsFocused(true)} // Set focus state
                onBlur={() => setIsFocused(false)} // Reset on blur
                placeholderTextColor={'#E0E0E0'}
            />
        </View>

        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                <ThemedText type="defaultSemiBold" fontFamily="poppins" fontSize={16}>Select your country</ThemedText>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <FlatList
                    data={filteredCountries}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    renderItem={({ item }) => (
                    <Pressable style={styles.countryItem} onPress={() => selectCountry(item)}>
                        <Text style={styles.flag}>{item.flag}</Text>
                        <ThemedText type="default" fontFamily="poppins" fontSize={12}>
                        {item.name} ({item.code})
                        </ThemedText>
                    </Pressable>
                    )}
                />
            </View>
        </Modal>
    </View>
  );
};

export default PhoneInputField;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  flagBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: 60,
    height: 45,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#E0E0E0",
  },
  flag: {
    fontSize: 16,
  },
  input: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '60%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  searchContainer: {
    marginVertical: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
});