import React, { useState, useEffect } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function My() {

    const [userInfo, setUserInfo] = useState([]);
    const [editingField, setEditingField] = useState(false);
    const [tempInfo, setTempInfo] = useState([]);

    const navigation = useNavigation();


    // ✅ DB에서 유저 정보 불러오기
    useEffect(() => {
        const loadUserId = async () => {
            try {
                // 🔹 로그인 시 저장된 user_id 불러오기
                const storedId = await AsyncStorage.getItem("user_id");
                console.log("📦 저장된 user_id:", storedId);

                if (!storedId) {
                    Alert.alert("오류", "로그인 정보가 없습니다.");
                    navigation.replace("Login");
                    return;
                }

                // 🔹 해당 아이디로 사용자 정보 조회
                const res = await axios.get(`${API_URL}/users/info/${storedId}`);
                const data = res.data;

                const mappedData = [
                    { label: '이름', key: 'name', value: data.name },
                    { label: '성별', key: 'gender', value: data.gender === 'male' ? '남성' : '여성' },
                    { label: '생년월일', key: 'birthdate', value: data.birthdate },
                    { label: '연락처', key: 'contact', value: data.contact },
                    { label: '이메일', key: 'email', value: data.email },
                    { label: '주소', key: 'address', value: data.address },
                ];
                setUserInfo(mappedData);
                setTempInfo(mappedData);
            } catch (err) {
                console.error("❌ 사용자 정보 불러오기 실패:", err);
                Alert.alert("오류", "사용자 정보를 불러오지 못했습니다.");
            }
        };

        loadUserId(); // ✅ 실행
    }, []);

    const handleSave = async () => {
        try {
            // ✅ 로그인한 사용자 아이디 불러오기
            const storedId = await AsyncStorage.getItem("user_id");
            if (!storedId) {
                Alert.alert("오류", "로그인 정보가 없습니다.");
                return;
            }

            // ✅ 수정된 값 객체화
            const updated = tempInfo.reduce((acc, item) => {
                if (item.key === 'gender') {
                    // 화면 값(남성/여성) → DB 코드값(male/female)으로 변환
                    if (item.value === '남성') {
                        acc.gender = 'male';
                    } else if (item.value === '여성') {
                        acc.gender = 'female';
                    }
                    // gender는 수정 화면에서 안 바꾸니까,
                    // 사실상 원래 값 그대로 들어가는 효과
                } else {
                    acc[item.key] = item.value;
                }
                return acc;
            }, {});

            // ✅ 서버로 수정 요청 보내기
            await axios.put(`${API_URL}/users/update/${storedId}`, updated);

            setUserInfo(tempInfo.map(item => ({ ...item })));
            setEditingField(false);
            Alert.alert("성공", "정보가 수정되었습니다!");
        } catch (err) {
            console.error("❌ 수정 실패:", err);
            Alert.alert("오류", "수정 중 문제가 발생했습니다.");
        }
    };


    const handleToggleEditSave = () => {
        if (editingField) {
            handleSave();
        } else {
            setTempInfo(userInfo.map(item => ({ ...item })));
            setEditingField(true);
        }
    };

    const handleChange = (key, text) => {
        const updated = tempInfo.map(item =>
            item.key === key ? { ...item, value: text } : item
        );
        setTempInfo(updated);
    };

    function handleBack() {
        setEditingField(false);
    }

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>프로필 정보</Text>
                        <TouchableOpacity onPress={handleToggleEditSave}>
                            {editingField
                                ? <View style={styles.editButtons}>
                                    <Text 
                                        style={styles.editText}
                                        onPress={handleBack}
                                        >
                                            취소</Text>
                                    <Text style={[styles.editText, { color: '#1E90FF' }]} onPress={handleSave}>저장</Text>
                                    
                                </View>
                                : <Image source={require('../../assets/pencil.png')} style={styles.editIcon} />
                            }
                        </TouchableOpacity>
                    </View>

                    {userInfo.length > 0 ? (
                        <View style={styles.infoList}>
                            {userInfo.map((item) => (
                                <View key={item.key} style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>{item.label}</Text>
                                    {editingField && ['email', 'address'].includes(item.key) ? (
                                        <TextInput
                                            style={styles.input}
                                            value={tempInfo.find(t => t.key === item.key)?.value || ''}
                                            onChangeText={(text) => handleChange(item.key, text)}
                                        />
                                    ) : (
                                        <Text style={styles.infoValue}>{item.value || '-'}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text>불러오는 중...</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Calendar")}>
                        <Text>캘린더</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => navigation.replace("Login")}
                >
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
            </ScrollView>
            <Tab />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
    },
    editIcon: {
        width: 22,
        height: 22,
    },
    editButtons: {
        flexDirection: 'row',
        gap: 25,
    },
    editText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#666',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e0e0e0',
    },
    profileId: {
        fontSize: 17,
        fontWeight: '600',
        color: '#111',
        marginLeft: 15,
    },
    profileSub: {
        marginTop: 10,
        fontSize: 14,
        color: '#777',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    infoList: {
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: 150,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    infoLabel: {
        fontSize: 15,
        color: '#555',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    infoText: {
        marginTop: 10,
    },
    subText: {
        fontSize: 12,
        color: '#666',
    },
    logoutButton: {
        paddingVertical: 12,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        color: 'red',
        fontWeight: '600',
    },
    passwordChangeButton: {
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginTop: 10,
    },
    passwordChangeText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
    },
});
