import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import axios from "axios";
import { API_URL } from "@env";

export default function Community() {

    const [selectedTag, setSelectedTag] = useState('전체');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const tags = ['전체', '정보', '식단', '할인', '운동인증', '후기'];
    const navigation = useNavigation();

    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_URL}/community/list`);
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

                {/* 게시글 출력 구간 */}
                <View style={styles.listContainer}>
                    {loading ? (
                        <Text>불러오는 중...</Text>
                    ) : posts.length === 0 ? (
                        <Text style={styles.placeholderText}>게시글이 없습니다.</Text>
                    ) : (
                        posts
                            // 선택된 카테고리가 "전체"가 아니면 해당 카테고리만 필터링
                            .filter(post => selectedTag === '전체' || post.category === selectedTag)
                            .map((post, index) => (
                                <View key={index} style={styles.postCard}>
                                    <TouchableOpacity style={styles.rowContainer}
                                    onPress={() => navigation.navigate('Cm_Detail')}>
                                        <View style={styles.postHeader}>
                                            <Text style={styles.postTitle} numberOfLines={1}>{post.title}</Text>
                                            <Text style={styles.categoryLabel}># {post.category}</Text>
                                        </View>
                                        <Text style={styles.postContent} numberOfLines={2}>
                                            {post.content}
                                        </Text>
                                    </TouchableOpacity>
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
        bottom: 120,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
postCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  marginBottom: 15,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
},
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postTitle: {
  fontSize: 17,
  fontWeight: '700',
  color: '#333',
  flex: 1,
  marginRight: 8,
},
  postContent: {
  fontSize: 15,
  color: '#666',
  lineHeight: 22,
},
  categoryLabel: {
  fontSize: 13,
  fontWeight: '600',
  color: '#1E90FF',
  paddingHorizontal: 10,
  paddingVertical: 5,
  },
  placeholderText: {
  textAlign: 'center',
  marginTop: 50,
  fontSize: 16,
  color: '#888',
},
  listContainer: {
  paddingBottom: 80,
},
  rowContainer: {
  },
});
