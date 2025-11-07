import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import axios from "axios";

export default function Community() {

    const [selectedTag, setSelectedTag] = useState('전체');
    const [posts, setPosts] = useState([]);     // 게시글 리스트
    const [loading, setLoading] = useState(true); // 로딩 상태
    const tags = ['전체', '정보', '식단', '할인', '운동인증', '후기'];
    const navigation = useNavigation();

    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://192.168.219.101:8080/community/list");
                setPosts(response.data);
            } catch (error) {
                console.error("❌ 게시글 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

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

                {/* ✅ 게시글 출력 구간 */}
                <View style={styles.listContainer}>
                    {loading ? (
                        <Text>불러오는 중...</Text>
                    ) : posts.length === 0 ? (
                        <Text style={styles.placeholderText}>게시글이 없습니다.</Text>
                    ) : (
                        posts
                            // ✅ 선택된 카테고리가 "전체"가 아니면 해당 카테고리만 필터링
                            .filter(post => selectedTag === '전체' || post.category === selectedTag)
                            .map((post, index) => (
                                <View key={index} style={styles.postCard}>
                                    {/* ✅ 제목과 내용을 가로로 배치 */}
                                    <View style={styles.rowContainer}
                                    onPress={() => navigation.navigate('Detail')}>
                                        <Text style={styles.postTitle}>{post.title}</Text>
                                        <Text style={styles.postContent} numberOfLines={1}>
                                            {post.content}
                                        </Text>
                                    </View>

                                    {/* ✅ 카테고리 표시 */}
                                    <Text style={styles.categoryLabel}># {post.category}</Text>
                                </View>
                            ))
                    )}
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
rowContainer: {
    flexDirection: 'row',           // 👉 제목 / 내용 가로 배치
    alignItems: 'center',
    justifyContent: 'space-between',// 👉 좌우 정렬
},

postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,                        // 👉 제목이 일정 공간 차지
    marginRight: 10,                // 👉 내용과 간격
},

postContent: {
    flex: 2,                        // 👉 내용이 더 넓게
    fontSize: 14,
    color: '#555',
},
categoryLabel: {
    marginTop: 1,
    fontSize: 10,
    color: '#1E90FF',
    alignSelf: 'flex-end',
},
});
