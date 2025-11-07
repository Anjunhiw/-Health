import { useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function Login() {
  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isChecked, setChecked ] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!id.trim() || !password.trim()) {
      Alert.alert("입력 오류", "아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, {
        user_id: id,
        password: password,
      });

      console.log("로그인 응답:", res.data);

      if (res.data.success) {
        // ✅ 로그인 성공 시 user_id를 저장 (My.js에서 불러올 수 있게)
        await AsyncStorage.setItem("user_id", id);
        await AsyncStorage.setItem("user_name", res.data.name);

        Alert.alert("로그인 성공", `${id}님 환영합니다!`);
        navigation.replace("Home"); // ✅ Home 페이지로 이동
      } else {
        Alert.alert("로그인 실패", res.data.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
      }

    } catch (err) {
      console.error("로그인 오류:", err);
      Alert.alert("오류", "서버 연결에 실패했습니다. 네트워크 또는 백엔드를 확인하세요.");
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GymSpot</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        style={styles.input} 
        />
        <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호" 
        style={styles.input} 
        secureTextEntry 
        />
      </View>
      <View style={styles.subButtonContainer}>
        <View style={styles.Checkbox}>
          <Checkbox value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#007AFF' : undefined}
          />
          <Text>자동 로그인</Text>
        </View>
         <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {navigation.replace("Id")}}>
            <Text style={styles.findButtonText}>아이디 / 비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
         <View>
        <TouchableOpacity style={styles.signupButton}
        onPress={() => {navigation.replace("Signup")}}>
          <Text style={styles.signupButtonText}>회원가입</Text> 
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.orLineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>또는</Text>
        <View style={styles.line} />
      </View>
      <View>
        <TouchableOpacity style={styles.googleButton}>
          <Image source={require('../assets/google.png')} style={{ width: 24, height: 24 }}/>
          <Text>Google로 시작하기</Text>
        </TouchableOpacity>
      </View>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  subButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: -15,
  marginBottom: 15
},
  Checkbox: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5
  },
  buttonContainer: {
    marginBottom: 20,
    gap: 15,
  },
  
loginButton: {
  backgroundColor: '#1E90FF',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
loginButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
signupButton: {
  backgroundColor: '#fff',
  borderColor: '#1E90FF',
  borderWidth: 1,
   paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
signupButtonText: {
  color: '#1E90FF',
  fontSize: 16,
},
findButtonText: {
  fontSize: 14,
},
  orLineContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
},
line: {
  flex: 1,
  height: 1,
  backgroundColor: '#8b8a8aff',
},
orText: {
  marginHorizontal: 8,
  color: '#8b8a8aff',
},
googleButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 7,
  marginTop: 10
}

});
