import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from 'expo-blur';
import React, { useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import DatePicker from "./DatePickerModal/DatePicker";

const { height } = Dimensions.get('window');

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch: (searchData: { destination: string }) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");
  const [slideAnim] = useState(new Animated.Value(-height)); // Start from negative height (top)
  const [dateOfBirth, setDateOfBirth] = React.useState<string>('');

  // Sample search results for demonstration
  const searchResults = [
    { id: 1, title: "Paris, France", subtitle: "City of Light" },
    { id: 2, title: "Tokyo, Japan", subtitle: "Modern metropolis" },
    { id: 3, title: "New York, USA", subtitle: "The Big Apple" },
    { id: 4, title: "London, England", subtitle: "Historic capital" },
    { id: 5, title: "Sydney, Australia", subtitle: "Harbor city" },
    { id: 6, title: "Rome, Italy", subtitle: "Eternal city" },
    { id: 7, title: "Barcelona, Spain", subtitle: "Mediterranean beauty" },
    { id: 8, title: "Amsterdam, Netherlands", subtitle: "Canal city" },
  ];

  React.useEffect(() => {
    if (visible) {
      // Slide down animation (from top)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide up animation (to top)
      Animated.timing(slideAnim, {
        toValue: -height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSearch = () => {
    onSearch({ destination: searchText });
    onClose();
  };

  const handleDestinationSelect = (destination: string) => {
    setSearchText(destination);
    onSearch({ destination });
    onClose();
  };

  const clearAll = () => {
    setSearchText("");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      animationType="fade" // Changed from slide to fade since we're handling animation manually
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
        <View style={styles.modalOverlay}>
            <Animated.View 
            style={[
                {
                transform: [{ translateY: slideAnim }]
                }
            ]}
            >
                <BlurView intensity={70} tint="light" style={styles.modalContent}>
                    {/* Header with close button */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <AntDesign name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{ flex: 1 }}
                    >
                        {/* Where Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Where?</Text>
                        <View style={styles.inputContainer}>
                        <AntDesign name="search1" size={18} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search destinations"
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={setSearchText}
                            autoFocus={true}
                        />
                        </View>
                    </View>

                    {/* Search Results - Scrollable */}
                    {searchText.length > 0 && (
                        <View style={styles.searchResultsContainer}>
                        <Text style={styles.resultsTitle}>Popular destinations</Text>
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            {searchResults
                            .filter(result => 
                                result.title.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((result) => (
                                <TouchableOpacity
                                key={result.id}
                                style={styles.resultItem}
                                onPress={() => handleDestinationSelect(result.title)}
                                >
                                <AntDesign name="enviromento" size={20} color="#666" />
                                <View style={styles.resultTextContainer}>
                                    <Text style={styles.resultTitle}>{result.title}</Text>
                                    <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
                                </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        </View>
                    )}
                    <DatePicker
                        onDateSelect={(dateObject, formattedString) => {
                        setDateOfBirth(formattedString);
                        }}
                    />

                    {/* Who Section */}
                    <TouchableOpacity style={[styles.sectionContainer, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }]}>
                        <Text style={styles.sectionTitle}>Who</Text>
                        <View style={styles.sectionContent}>
                        <Text style={styles.sectionPlaceholder}>Add guests</Text>
                        </View>
                    </TouchableOpacity>
                    </View>

                    {/* Bottom Actions */}
                    <View style={styles.bottomActions}>
                        <TouchableOpacity onPress={clearAll}>
                        <Text style={styles.clearAllText}>Clear all</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.searchActionButton} onPress={handleSearch}>
                        <AntDesign name="search1" size={18} color="#fff" />
                        <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </Animated.View>
        </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  inputIcon: {
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 50,
    backgroundColor: 'rgba(255,255,255,0.1)', // Semi-transparent background
  },
  
  modalContent: {
    height: height * 0.85, // Take up most of the screen
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden', // Important for blur effect with rounded corners
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(240,240,240,0.8)',
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_600SemiBold'
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(224,224,224,0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: 'rgba(250,250,250,0.9)',
    marginTop: 10
  },
  
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  
  searchResultsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  
  scrollView: {
    flex: 1,
  },
  
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240,240,240,0.6)',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  
  resultTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  
  sectionContent: {
    height: 48,
    justifyContent: 'center',
  },
  
  sectionPlaceholder: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Poppins_500Medium'
  },
  
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  
  clearAllText: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_600SemiBold'
  },
  
  searchActionButton: {
    backgroundColor: '#E91E63',
    borderRadius: 30,
    paddingHorizontal: 24,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});