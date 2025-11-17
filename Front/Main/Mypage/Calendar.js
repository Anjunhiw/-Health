import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert, FlatList, ScrollView } from "react-native";
import { Calendar } from 'react-native-calendars';
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CalendarComponent() { 
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로
  const [selectedDate, setSelectedDate] = useState(today);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlan, setNewPlan] = useState(''); 
  const [plans, setPlans] = useState({});
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
  const loadAccountAndPlans = async () => {
    try {
      const id = await AsyncStorage.getItem("user_id");
      if (id) {
        setAccountId(id);
        const savedPlans = await AsyncStorage.getItem(`plans_${id}`);
        if (savedPlans) setPlans(JSON.parse(savedPlans));
      }
    } catch (error) {
      console.log("저장된 스케줄 불러오기 실패", error);
    }
  };
  loadAccountAndPlans();
}, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

const addPlan = async () => {
  if (!newPlan.trim()) {
    Alert.alert("입력 오류", "스케줄을 입력하세요.");
    return;
  }
  const updatedPlans = { ...plans };
  if (!updatedPlans[selectedDate]) {
    updatedPlans[selectedDate] = [];
  }
  updatedPlans[selectedDate].push(newPlan);
  setPlans(updatedPlans);
  setNewPlan(''); 
  setModalVisible(false);

  try {
    await AsyncStorage.setItem(`plans_${accountId}`, JSON.stringify(updatedPlans));
  } catch (error) {
    console.log('스케줄 저장 실패', error);
  }
}

const deletePlan = (planToDelete) => {
  if (!selectedDate) return; 

  Alert.alert(
    "삭제 확인",
    `"${planToDelete}" 을(를) 삭제하시겠습니까?`,
    [
      {
        text: "아니오",
        style: "cancel",
      },
      {
        text: "예",
        onPress: async () => {
          const updatedPlans = { ...plans };
          updatedPlans[selectedDate] = updatedPlans[selectedDate].filter(plan => plan !== item);
          setPlans(updatedPlans);

          try {
            await AsyncStorage.setItem(`plans_${accountId}`, JSON.stringify(updatedPlans));
          } catch (error) {
            console.log('삭제 후 저장 실패', error);
          }
        },
      },
    ],
    { cancelable: true }
  );
};


  const getMarkedDates = () => {
    const marked = {};
    // 스케줄이 있는 날짜에 점 표시
    for (const date in plans) {
      if (plans[date].length > 0) {
        marked[date] = { marked: true, dotColor: '#1E90FF' };
      }
    }
    // 선택된 날짜 스타일 적용
    marked[selectedDate] = { ...marked[selectedDate], selected: true, selectedColor: '#1E90FF' };
    return marked;
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
      <ScrollView style={styles.content}>
        <Text style={styles.title}>운동 캘린더</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            current={today}
            onDayPress={handleDayPress}
            markedDates={getMarkedDates()}
            theme={calendarTheme}
          />
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>스케줄 추가</Text>
              <Text style={styles.modalDate}>{selectedDate}</Text>
              <TextInput
                placeholder="운동 스케줄을 입력하세요"
                value={newPlan}
                onChangeText={setNewPlan}
                style={styles.modalInput}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={[styles.modalButton, styles.modalCloseButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={addPlan}>
                  <Text style={[styles.modalButtonText, { color: '#fff' }]}>추가</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.infoBox}>
          <View style={styles.infoBoxHeader}>
            <Text style={styles.infoText}>{selectedDate}</Text>
            <TouchableOpacity style={styles.addPlanButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addPlanButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={plans[selectedDate] || []}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.planBox}>
            <Text style={styles.planItem}>- {item}</Text>
          <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePlan(item)}>
            <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>)}
            ListEmptyComponent={<Text style={styles.emptyPlanText}>등록된 스케줄이 없습니다.</Text>}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
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
    marginTop:-20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // marginTop 제거
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
    marginTop: 20,
    marginBottom: 20,
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
  infoBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  addPlanButton: {
    backgroundColor: '#1E90FF',
    width: 30,
    height: 30,
    position: 'absolute',
    left: 100,
    bottom: 3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlanButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  planBox: {
    flexDirection: 'row'
  },
  planItem: {
    fontSize: 15,
    color: '#333',
    paddingVertical: 5,
  },
  emptyPlanText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  deleteButton: {
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  marginLeft: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
deleteButtonText: {
  color: '#FF6B6B',
  fontWeight: '600',
  fontSize: 14,
},
 // Modal Styles (업데이트)
modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // 살짝 더 어둡게
},
modalContent: {
  width: '85%',
  backgroundColor: '#fefefe', // 화이트 톤 조금 부드럽게
  borderRadius: 16, // 더 둥글게
  padding: 25,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 10,
},
modalTitle: {
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 10,
  color: '#1E90FF',
},
modalDate: {
  fontSize: 16,
  color: '#555',
  marginBottom: 20,
},
modalInput: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 12,
  borderRadius: 12,
  marginBottom: 25,
  fontSize: 16,
  backgroundColor: '#fafafa',
},
modalButtonContainer: {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  gap: 15
},
modalButton: {
  flex: 1,
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginHorizontal: 5,
  backgroundColor: '#1E90FF',
},
modalCloseButton: {
  backgroundColor: '#fff',
  borderColor: '#ccc',
  borderWidth: 1
},
modalButtonText: {
  fontWeight: '700',
  fontSize: 16,
},

});
