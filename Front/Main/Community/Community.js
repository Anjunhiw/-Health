import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";

export default function Community() {

    const [selectedTag, setSelectedTag] = useState('전체');
    const navigation = useNavigation();
    const tags = ['전체', '정보', '식단', '할인', '운동인증', '후기'];

    return(
        <View style={styles.container}>
            <Header />

            <ScrollView style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>게시판</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
                    {tags.map(tag => (
                        <TouchableOpacity 
                            key={tag} 
                            style={[styles.tagButton, selectedTag === tag && styles.activeTagButton]}
                            onPress={() => setSelectedTag(tag)}
                        >
                            <Text style={[styles.tagText, selectedTag === tag && styles.activeTagText]}># {tag}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.divider} />

                <View style={styles.listContainer}>
                    {/* 게시글 목록이 여기에 표시됩니다. */}
                    <Text style={styles.placeholderText}>게시글이 없습니다.</Text>
                </View>

            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Write")}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <Tab />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: -30,
        paddingVertical: 10,
    },
    tagContainer: {
        flexGrow: 0,
        marginBottom: 15,
    },
    tagButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    activeTagButton: {
        backgroundColor: '#1E90FF',
        borderColor: '#1E90FF',
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    activeTagText: {
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#1E90FF',
        position: 'absolute',
        right: 20,
        bottom: 120, // Tab Bar 위에 위치하도록 조정
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // Android 그림자
        shadowColor: '#000', // iOS 그림자
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
    },
});
