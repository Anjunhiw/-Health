import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from 'react-native-calendars';
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";

export default function MyCalendar() { // App.js에서 Calendar로 사용하고 있으므로 이름 통일
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로
  const [selectedDate, setSelectedDate] = useState(today);

  // 날짜가 선택되면 setSelectedDate 호출
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // react-native-calendars의 테마 설정
  const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#1E90FF',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#1E90FF',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#1E90FF',
    selectedDotColor: '#ffffff',
    arrowColor: '#1E90FF',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#1E90FF',
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>운동 캘린더</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            current={today}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: '#1E90FF' },
            }}
            theme={calendarTheme}
          />
        </View>

        {selectedDate && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              선택된 날짜: {selectedDate}
            </Text>
            {/* TODO: 해당 날짜의 운동 기록을 여기에 표시 */}
          </View>
        )}
      </View>
      <Tab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: -30,
    paddingVertical: 10,
  },
  calendarContainer: {
    borderRadius: 12,
    overflow: 'hidden', // borderRadius를 적용하기 위해 필요
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  infoBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
});
