import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Menu/Header";
import Tab from "../../Menu/Bottom_Tab";

export default function Write() {

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Header />
            
            <View style={styles.content}>
                <Text style={styles.title}>게시글 작성</Text>

                <TextInput 
                    style={styles.input} 
                    placeholder="제목" 
                    placeholderTextColor="#999"
                />
                <TextInput 
                    style={[styles.input, styles.textarea]} 
                    placeholder="내용" 
                    placeholderTextColor="#999"
                    multiline               // 여러 줄 입력 가능
                    textAlignVertical="top" // 텍스트를 위쪽부터 시작
                />

                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
