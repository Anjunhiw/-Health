import { useState } from "react";
import { Text, View, Button, TextInput, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';

export default function Login() {
  const [ id, setId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isChecked, setChecked ] = useState(false);

  const navigation = useNavigation();

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
        <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.replace("Home")}}>
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
