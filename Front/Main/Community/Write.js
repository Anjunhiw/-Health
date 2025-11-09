import { Text, View, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
//--------------------------------------------------------------             npm install react-native-picker-select 설치해야함
export default function Write() {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);

    const tags = ['전체', '정보', '식단', '할인', '운동인증', '후기'];

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert("오류", "제목과 내용을 모두 입력해주세요!");
            return;
        }
        if (!selectedTag) {
            Alert.alert("오류", "카테고리를 선택해주세요!");
            return;
        }

        try {
            // 👉 백엔드에 게시글 등록 요청 (IP와 포트는 너 프로젝트에 맞게 바꿔!)
            const response = await axios.post(`${API_URL}/write`, {
                title: title,
                content: content,
                writer: "user01",
                category: selectedTag || "전체",
            });

            if (response.status === 200) {
                Alert.alert("성공", "게시글이 등록되었습니다!");
                navigation.navigate("Community");
            } else {
                Alert.alert("실패", "게시글 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("오류", "서버 연결에 실패했습니다.");
        }
    };

    return(
        <KeyboardAvoidingView style={styles.container}>
            <Header />

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
             <View style={styles.content}>
            {/* ✅ 제목 + 드롭다운을 한 줄에 가로 배치 */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>게시글 작성</Text>

                {/* ✅ 여기에 드롭다운 추가 */}
                {/* <RNPickerSelect
                    onValueChange={(value) => setSelectedTag(value)}
                    items={[
                        { label: '전체', value: '전체' },
                        { label: '정보', value: '정보' },
                        { label: '식단', value: '식단' },
                        { label: '할인', value: '할인' },
                        { label: '운동인증', value: '운동인증' },
                        { label: '후기', value: '후기' },
                    ]}
                    placeholder={{ label: '카테고리 선택', value: null }}
                    style={{
                        inputIOS: styles.dropdown,
                        inputAndroid: styles.dropdown,
                    }}
                /> */}

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
                    value={title}                // ✅ state 값 표시
                    onChangeText={setTitle}      // ✅ 입력값 업데이트
                />

                <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="내용"
                    placeholderTextColor="#999"
                    multiline
                    textAlignVertical="top"
                    value={content}              // ✅ state 값 표시
                    onChangeText={setContent}    // ✅ 입력값 업데이트
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>등록</Text>
                </TouchableOpacity>
            
            </View>
            </View>
            </TouchableWithoutFeedback>
            <Tab />
        </KeyboardAvoidingView>
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
    marginBottom: 10,
    },
    title: {

        fontSize: 24,
        fontWeight: '700',
        marginTop: -20,
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
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
        backgroundColor: '#f9f9f9',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    activeTagButton: {
        borderColor: '#1E90FF',
        backgroundColor: '#fff',
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    activeTagText: {
        color: '#1E90FF',
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    dropdown: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#f9f9f9',
        width: 150,
    },
});
