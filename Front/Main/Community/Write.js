import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🔹 추가

export default function Write() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [userid, setUserid] = useState(""); // 🔹 writer로 보낼 값 저장

  const tags = ["전체", "정보", "식단", "할인", "운동인증", "후기"];

  // 🔹 로그인한 user_id 불러오기
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem("user_id");
        console.log("🧪 저장된 user_id:", storedId);
        if (storedId) setUserid(storedId);
      } catch (e) {
        console.error("user_id 로드 실패:", e);
      }
    };
    loadUserId();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("오류", "제목과 내용을 모두 입력해주세요!");
      return;
    }
    if (!selectedTag) {
      Alert.alert("오류", "카테고리를 선택해주세요!");
      return;
    }
    if (!userid) {
      Alert.alert("오류", "로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      console.log("🧪 글쓰기 요청 직전 userid:", userid);

      const response = await axios.post(`${API_URL}/write`, {
        title: title,
        content: content,
        writer: userid, // ✅ 로그인한 아이디 전달
        category: selectedTag || "전체",
      });

      if (response.status === 200) {
        Alert.alert("성공", "게시글이 등록되었습니다!");
        navigation.navigate("Community");
      } else {
        Alert.alert("실패", "게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("❌ 게시글 등록 실패:", error);
      Alert.alert("오류", "서버 연결에 실패했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>게시글 작성</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tagContainer}
            >
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagButton,
                    selectedTag === tag && styles.activeTagButton,
                  ]}
                  onPress={() => setSelectedTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedTag === tag && styles.activeTagText,
                    ]}
                  >
                    # {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View>
            <TextInput
              style={styles.input}
              placeholder="제목"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="내용"
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Tab />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: -20,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  textarea: {
    height: 150,
  },
  tagContainer: {
    flexGrow: 0,
    marginBottom: 25,
  },
  tagButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeTagButton: {
    borderColor: "#1E90FF",
    backgroundColor: "#fff",
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  activeTagText: {
    color: "#1E90FF",
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
