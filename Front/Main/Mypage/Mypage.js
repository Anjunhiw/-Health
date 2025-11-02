import { Text, Image, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";

export default function My() {

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* 프로필 정보 */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>프로필 정보</Text>
                        <TouchableOpacity>
                            <Image source={require('../../assets/pencil.png')} style={styles.editIcon} />
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
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>이름</Text>
                            <Text style={styles.infoValue}>홍길동</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>성별</Text>
                            <Text style={styles.infoValue}>남</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>생년월일</Text>
                            <Text style={styles.infoValue}>1990-01-01</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>연락처</Text>
                            <Text style={styles.infoValue}>010-1234-5678</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>이메일</Text>
                            <Text style={styles.infoValue}>ddong@gmail.com</Text>
                        </View>
                    </View>
                </View>

                {/* 앱 정보 */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>앱 정보</Text>
                    <View style={styles.infoList}>
                        <Text style={styles.infoText}>라이선스</Text>
                        <Text style={styles.subText}>일부 아이콘은 Freepik에서 디자인되었습니다.</Text>
                        <Text style={styles.subText}>Some icons are designed by Freepik from the Noun Project.</Text>
                    </View>
                </View>

                {/* 로그아웃 */}
                <TouchableOpacity style={styles.logoutButton}>
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
        backgroundColor: '#ff4d4f',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});
