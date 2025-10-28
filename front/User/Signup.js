import React, { useState } from "react";
import axios from "axios";
import {
  TextInput,
  Text,
  View,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Signup() {
  const [gender, setGender] = useState(null); // 남/여 선택 상태

  const navigation = useNavigation();
  const [displayValue, setDisplayValue] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");








const handleSignup = async () => {
  try {
    const response = await axios.post("http://192.168.219.101:8080/signup", {
      user_id: userId,         // 아이디
      password: password,      // 비밀번호
    });
    console.log(response.data);
    setDisplayValue(
      `서버 응답: ${response.data}\n` +
      `아이디: ${userId}\n` +
      `비밀번호: ${password}\n`
    );
  } catch (error) {
    setDisplayValue(`에러 발생: ${error.message}`);
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




<Text style={styles.output}>{displayValue}</Text>




      
      <View style={styles.inputContainer}>
        <TextInput placeholder="아이디" value={userId} onChangeText={setUserId} style={styles.input}/>
        <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <TextInput placeholder="이름" style={styles.input} />
        <TextInput placeholder="전화번호" style={styles.input} />
        <TextInput placeholder="이메일" style={styles.input} />
        <TextInput placeholder="생년월일 (YYYY-MM-DD)" style={styles.input} />
        <TextInput placeholder="성별 (male/female)" style={styles.input} />

        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === "male" && styles.genderSelected]}
            onPress={() => setGender("male")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "male" && styles.genderTextSelected,
              ]}
            >
              남
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.genderButton, gender === "female" && styles.genderSelected]}
            onPress={() => setGender("female")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "female" && styles.genderTextSelected,
              ]}
            >
              여
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="회원가입" onPress={handleSignup} color="#1E90FF" />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>계정이 있으신가요?</Text>
        <Button title="로그인" onPress={() => {navigation.navigate("Login")}} color="#32CD32" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
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
    alignItems: "center",
  },
  input: {
    width: 330,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  genderButton: {
    width: 150,
    marginHorizontal: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  genderSelected: {
    backgroundColor: "#1E90FF",
    borderColor: "#1E90FF",
  },
  genderText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  buttonContainer: {
    marginBottom: 20,
  },
  loginContainer: {
    alignItems: "center",
  },
  signupText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
});
