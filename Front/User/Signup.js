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
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState(null);
  const [displayValue, setDisplayValue] = useState("");

  const navigation = useNavigation();

const handleSignup = async () => {
  try {
    const response = await axios.post("http://192.168.1.194:8080/signup", {
      user_id: userId,         // 아이디
      password: password,      // 비밀번호
      name: name,              // 이름
      contact: contact,        // 연락처
      email: email,            // 이메일
      birthdate: birthdate,    // 생년월일
      address: address,        // 주소
      gender: gender,          // 성별
    });
    console.log("데이터: ",response.data);
    setDisplayValue(
      `서버 응답: ${response.data}\n` +
      `아이디: ${userId}\n` +
      `비밀번호: ${password}\n`+
      `이름: ${name}\n`+
      `연락처: ${contact}\n`+
      `이메일: ${email}\n`+
      `생년월일: ${birthdate}\n`+
      `주소: ${address}\n`+
      `성별: ${gender}`
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

      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="아이디"
          style={[styles.contactInput, { width: 255 }]}
          value={userId}
          onChangeText={setUserId}
        />
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>중복 확인</Text>
        </TouchableOpacity>
        </View>
        <TextInput
          placeholder="비밀번호 (특수문자 포함, 8자 이상)"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
{/* <Text>{displayValue}</Text>   콘솔 확인용 잠시    */}
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.input}
          secureTextEntry
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
        <View style={{ flexDirection: "row", gap: 15}}>
        <TextInput
          placeholder="이름"
          style={[styles.input, { width: 150 }]}
          value={name}
          onChangeText={setName}
        />
          <TextInput
          placeholder="생년월일 ex)19900101"
          style={[styles.input, { width: 165 }]}
          value={birthdate}
          onChangeText={setBirthdate}
          keyboardType="number-pad"
        />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="연락처"
            style={styles.contactInput}
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>인증</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="이메일"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {/* <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>인증</Text>
          </TouchableOpacity> */}
        </View>
        <TextInput
          placeholder="주소"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
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
       <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
  <Text style={styles.signupButtonText}>회원가입</Text>
</TouchableOpacity>

      </View>

      <View style={styles.loginContainer}>
        <Text>계정이 있으신가요?</Text>
        <Button title="로그인" onPress={() => {navigation.replace("Login")}} color="#1E90FF" />
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
    alignItems: "center",
  },
   contactInput: {
  width: 280,      
  backgroundColor: "#fff",
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderRadius: 8,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#ccc",
  marginRight: 9,
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
  contactButton: {
    borderColor: '#1E90FF',
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 9,
    height: 40,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  signupText: {
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
    alignItems: "center",
  },
  loginContainer: {
    alignItems: "center",
  },
  signupButton: {
  backgroundColor: '#1E90FF',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  width: 330,
},
signupButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});

