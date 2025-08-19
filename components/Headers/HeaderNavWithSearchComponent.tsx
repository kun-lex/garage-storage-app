import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchModal from "../Modals/SearchModal";
import { ThemedText } from "../ThemedText";

interface HeaderNavWithSearchProps {
    activeTab: string;
    onTabPress: (tab: string) => void;
}

const HeaderNavWithSearchComponent: React.FC<HeaderNavWithSearchProps> = ({
  activeTab,
  onTabPress,
}) => {
  const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleTextLayout = (event: any, tabName: string) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prev) => ({ ...prev, [tabName]: width }));
  };

  const openModal = () => {
    // Add scale animation when pressed
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSearch = (searchData: { destination: string }) => {
    // Handle search logic here
    console.log("Searching for:", searchData);
    // You can pass this data to parent component or handle it here
  };

  return (
    <>
      <View style={styles.container}>
        {/* Search Bar */}
        <Animated.View
          style={[
            styles.searchButtonContainer,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={openModal}
            activeOpacity={0.8}
          >
            <AntDesign name="search1" size={16} color="#656565" />
            <ThemedText
              type="subtitle"
              fontFamily="poppins"
              fontSize={14}
              color="#656565"
            >
              Start your search
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {/* Spaces */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => onTabPress("Spaces")}
          >
            <Text style={styles.emoji}>🏠</Text>
            <Text
              style={[
                styles.tabText,
                activeTab === "Spaces" && styles.activeText,
              ]}
              onLayout={(e) => handleTextLayout(e, "Spaces")}
            >
              Spaces
            </Text>
            {activeTab === "Spaces" && (
              <View
                style={[
                  styles.activeIndicator,
                  { width: tabWidths["Spaces"] || 20 },
                ]}
              />
            )}
          </TouchableOpacity>

          {/* Experiences */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => onTabPress("Experiences")}
          >
            <Text style={styles.emoji}>🎈</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "Experiences" && styles.activeText,
              ]}
              onLayout={(e) => handleTextLayout(e, "Experiences")}
            >
              Experiences
            </Text>
            {activeTab === "Experiences" && (
              <View
                style={[
                  styles.activeIndicator,
                  { width: tabWidths["Experiences"] || 20 },
                ]}
              />
            )}
          </TouchableOpacity>

          {/* Services */}
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => onTabPress("Services")}
          >
            <Text style={styles.emoji}>🛎️</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "Services" && styles.activeText,
              ]}
              onLayout={(e) => handleTextLayout(e, "Services")}
            >
              Services
            </Text>
            {activeTab === "Services" && (
              <View
                style={[
                  styles.activeIndicator,
                  { width: tabWidths["Services"] || 20 },
                ]}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Modal */}
      <SearchModal
        visible={modalVisible}
        onClose={closeModal}
        onSearch={handleSearch}
      />
    </>
  );
};

export default HeaderNavWithSearchComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    zIndex: 2,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonContainer: {
    width: "90%",
  },
  searchButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: "100%",
    borderRadius: 20,
    height: 45,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: "center",
    marginHorizontal: 20,
    paddingTop: 5,
  },
  emoji: {
    fontSize: 26,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  newBadge: {
    position: "absolute",
    top: 0,
    right: -16,
    backgroundColor: "#FF725E",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  activeText: {
    fontWeight: "600",
    color: "#000",
  },
  activeIndicator: {
    height: 3,
    backgroundColor: "#000",
    borderRadius: 2,
    marginTop: 4,
  },
});