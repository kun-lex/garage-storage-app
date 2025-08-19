import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

interface DatePickerProps {
    label?: string;
    placeholder?: string;
    onDateSelect?: (dateObject: Date, formattedString: string) => void;
    error?: string;
}

interface Month {
    name: string;
    value: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
    placeholder = "Add date",
    onDateSelect,
    error = ""
}) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    // Generate arrays for date selection
    const days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
    const months: Month[] = [
        { name: 'January', value: 1 },
        { name: 'February', value: 2 },
        { name: 'March', value: 3 },
        { name: 'April', value: 4 },
        { name: 'May', value: 5 },
        { name: 'June', value: 6 },
        { name: 'July', value: 7 },
        { name: 'August', value: 8 },
        { name: 'September', value: 9 },
        { name: 'October', value: 10 },
        { name: 'November', value: 11 },
        { name: 'December', value: 12 }
    ];
    
    const currentYear: number = new Date().getFullYear();
    const years: number[] = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const formatDate = (day: number, month: number, year: number): string | null => {
        if (!day || !month || !year) return null;
        const monthName = months.find(m => m.value === month)?.name;
        return `${day} ${monthName} ${year}`;
    };

    const handleDateConfirm = (): void => {
        if (selectedDay && selectedMonth && selectedYear) {
            const formattedDate = formatDate(selectedDay, selectedMonth, selectedYear);
            if (formattedDate) {
                setSelectedDate(formattedDate);
                
                // Create a proper date object for parent component
                const dateObject = new Date(selectedYear, selectedMonth - 1, selectedDay);
                onDateSelect?.(dateObject, formattedDate);
                
                setModalVisible(false);
            }
        }
    };

    const resetSelections = (): void => {
        setSelectedDay(null);
        setSelectedMonth(null);
        setSelectedYear(null);
    };

    return (
        <View>
            
            <TouchableOpacity
                style={[styles.sectionContainer, error && styles.dateInputError, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.sectionTitle}>When</Text>
                <Text style={[styles.dateText, !selectedDate && styles.placeholderText]}>
                    {selectedDate || placeholder}
                </Text>
            </TouchableOpacity>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

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
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Date</Text>
                        <TouchableOpacity onPress={resetSelections}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.datePickerContainer}>
                        {/* Day Picker */}
                        <View style={styles.pickerColumn}>
                            <Text style={styles.pickerLabel}>Day</Text>
                            <ScrollView 
                                style={styles.pickerScroll} 
                                showsVerticalScrollIndicator={false}
                            >
                                {days.map((day) => (
                                    <Pressable
                                        key={day}
                                        style={[
                                            styles.pickerItem,
                                            selectedDay === day && styles.selectedPickerItem
                                        ]}
                                        onPress={() => setSelectedDay(day)}
                                    >
                                        <Text style={[
                                            styles.pickerItemText,
                                            selectedDay === day && styles.selectedPickerItemText
                                        ]}>
                                            {day}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Month Picker */}
                        <View style={styles.pickerColumn}>
                            <Text style={styles.pickerLabel}>Month</Text>
                            <ScrollView 
                                style={styles.pickerScroll} 
                                showsVerticalScrollIndicator={false}
                            >
                                {months.map((month) => (
                                    <Pressable
                                        key={month.value}
                                        style={[
                                            styles.pickerItem,
                                            selectedMonth === month.value && styles.selectedPickerItem
                                        ]}
                                        onPress={() => setSelectedMonth(month.value)}
                                    >
                                        <Text style={[
                                            styles.pickerItemText,
                                            selectedMonth === month.value && styles.selectedPickerItemText
                                        ]}>
                                            {month.name}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Year Picker */}
                        <View style={styles.pickerColumn}>
                            <Text style={styles.pickerLabel}>Year</Text>
                            <ScrollView 
                                style={styles.pickerScroll} 
                                showsVerticalScrollIndicator={false}
                            >
                                {years.map((year) => (
                                    <Pressable
                                        key={year}
                                        style={[
                                            styles.pickerItem,
                                            selectedYear === year && styles.selectedPickerItem
                                        ]}
                                        onPress={() => setSelectedYear(year)}
                                    >
                                        <Text style={[
                                            styles.pickerItemText,
                                            selectedYear === year && styles.selectedPickerItemText
                                        ]}>
                                            {year}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[
                                styles.confirmButton,
                                (!selectedDay || !selectedMonth || !selectedYear) && styles.disabledButton
                            ]}
                            onPress={handleDateConfirm}
                            disabled={!selectedDay || !selectedMonth || !selectedYear}
                        >
                            <Text style={[
                                styles.confirmButtonText,
                                (!selectedDay || !selectedMonth || !selectedYear) && styles.disabledButtonText
                            ]}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DatePicker;

const styles = StyleSheet.create({
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderRadius: 20,
        backgroundColor: '#fff',
        marginTop: 4,
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
    dateInputError: {
        borderColor: '#ff4444',
    },
    dateText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'Poppins_500Medium'
    },
    placeholderText: {
        color: '#999',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000088',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingBottom: 24,
        paddingHorizontal: 20,
        maxHeight: '70%',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    resetText: {
        fontSize: 16,
        color: '#FF725E',
    },
    datePickerContainer: {
        flexDirection: 'row',
        height: 200,
        marginBottom: 20,
    },
    pickerColumn: {
        flex: 1,
        marginHorizontal: 4,
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    pickerScroll: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    pickerItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    selectedPickerItem: {
        backgroundColor: '#FF725E',
    },
    pickerItemText: {
        fontSize: 16,
        color: '#333',
    },
    selectedPickerItemText: {
        color: '#fff',
        fontWeight: '600',
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 14,
        backgroundColor: '#FF725E',
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    disabledButtonText: {
        color: '#999',
    },
});