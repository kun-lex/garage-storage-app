import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get('window');

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

  const handleSearch = () => {
    onSearch({ destination: searchText });
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
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header with close button */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

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

          {/* When Section */}
          <TouchableOpacity style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>When</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionPlaceholder}>Add dates</Text>
            </View>
          </TouchableOpacity>

          {/* Who Section */}
          <TouchableOpacity style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Who</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionPlaceholder}>Add guests</Text>
            </View>
          </TouchableOpacity>

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
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    minHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionContent: {
    paddingVertical: 5,
  },
  sectionPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  clearAllText: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
  },
  searchActionButton: {
    backgroundColor: '#E91E63',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});