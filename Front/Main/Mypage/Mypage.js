import { useState } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet, ScrollView, TextInput } from "react-native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import { useNavigation } from "@react-navigation/native";

export default function My() {

    const [userInfo, setUserInfo] = useState([
        { label: '이름', key: 'name',  value: '홍길동' },
        { label: '성별', key: 'gender', value: '남' },
        { label: '생년월일', key: 'birthdate', value: '1990-01-01' },
        { label: '연락처',  key: 'contact', value: '010-1234-5678' },
        { label: '이메일', key: 'email', value: 'ddong@gmail.com' },
        { label: '주소', key: 'address', value: '경기도 화성시 병점' },
    ]);
    const [editingField, setEditingField] = useState(false);
    const [tempInfo, setTempInfo] = useState(userInfo.map(item => ({ ...item })));

    const navigation = useNavigation();

    function handleSave() {
        setUserInfo(tempInfo.map(item => ({ ...item })));
        setEditingField(false);
    }

    function handleToggleEditSave() {
        if (editingField) {
            handleSave();
        } else {
            setTempInfo(userInfo.map(item => ({ ...item })));
            setEditingField(true);
        }
    }

    function handleChange(key, text) {
        const updated = tempInfo.map(item => 
            item.key === key ? { ...item, value: text } : item
        );
        setTempInfo(updated);
    }

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>프로필 정보</Text>

                        <TouchableOpacity onPress={handleToggleEditSave}>
                        {editingField ? 
                            <Text style={{color: '#1E90FF', fontWeight: '600'}}>저장</Text> :
                            <Image source={require('../../assets/pencil.png')} style={styles.editIcon} />
                        }
                    </TouchableOpacity>
                    </View>

                    <View style={styles.profileRow}>
                        <View style={styles.profileImage} />
                        <View>
                            <Text style={styles.profileId}>길똥</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoList}>
                        {userInfo.map((item) => (
                            <View key={item.label} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                {editingField ? (
                                    ['email', 'address'].includes(item.key) ? (
                                    <TextInput
                                    style={styles.input}
                                    value={tempInfo.find(t => t.key === item.key)?.value || ''}
                                    onChangeText={(text) => {
                                        handleChange(item.key, text);
                                    }}
                                    />
                                ) : (
                                     <Text style={styles.infoValue}>{item.value}</Text>
                                )
                                ) : (
                                    <Text style={styles.infoValue}>{item.value}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                    <View style={styles.divider} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>앱 정보</Text>
                    <View style={styles.infoList}>
                        <Text style={styles.infoText}>라이선스</Text>
                        <Text style={styles.subText}>일부 아이콘은 Freepik에서 디자인되었습니다.</Text>
                        <Text style={styles.subText}>Some icons are designed by Freepik from the Noun Project.</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}
                onPress={() => {navigation.replace("Login")}}>
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
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
    },
    editIcon: {
        width: 22,
        height: 22,
        tintColor: '#777',
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
