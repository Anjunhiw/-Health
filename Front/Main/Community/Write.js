import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";
import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
export default function Write() {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert("오류", "제목과 내용을 모두 입력해주세요!");
            return;
        }
        try {
            // 👉 백엔드에 게시글 등록 요청 (IP와 포트는 너 프로젝트에 맞게 바꿔!)
            const response = await axios.post("http://192.168.219.101:8080/write", {
                title: title,
                content: content,
                writer: "user01"
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
        <View style={styles.container}>
            <Header />
            
            <View style={styles.content}>
                <Text style={styles.title}>게시글 작성</Text>

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
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
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
});
