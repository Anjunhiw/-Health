import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';
import Header from '../../Menu/Header';
import Tab from '../../Menu/Bottom_Tab';

export default function Cm_Detail() {
  const route = useRoute();
  const { postId } = route.params; // Community.js에서 넘겨준 postId 받기

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) {
        Alert.alert("오류", "게시글 ID가 없습니다.");
        setLoading(false);
        return;
      }

    //   try {
    //     // 🚨 백엔드에 게시글 상세 정보를 가져오는 API 엔드포인트가 필요합니다.
    //     //    예시: /community/{postId}
    //     const response = await axios.get(`${API_URL}/community/${postId}`);
    //     setPost(response.data);
    //     setError(null);
    //   } catch (err) {
    //     console.error("게시글 상세 정보 로딩 실패:", err);
    //     setError("게시글을 불러오는 데 실패했습니다.");
    //     Alert.alert("오류", "게시글을 불러오는 중 문제가 발생했습니다.");
    //   } finally {
    //     setLoading(false);
    //   }
    };

    fetchPostDetail();
  }, [postId]); // postId가 변경될 때마다 데이터를 다시 불러옵니다.

  // 로딩 중일 때 표시할 화면
//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#1E90FF" />
//         <Text style={styles.loadingText}>게시글을 불러오는 중...</Text>
//       </View>
//     );
//   }

  // 에러 발생 시 표시할 화면
//   if (error || !post) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorText}>{error || "게시글 정보를 찾을 수 없습니다."}</Text>
//       </View>
//     );
//   }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>제목</Text>
          <View style={styles.subContainer}>
          <Text>작성자</Text>
          <Text>작성일</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.body}>내용</Text>
      </ScrollView>
      <Tab />
    </View>
  );
}

// 해당 게시글 불러왔을 시 스타일 다시 조정

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subContainer: {
    justifyContent: 'fixed-end',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});