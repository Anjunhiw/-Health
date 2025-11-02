import { useState, useEffect } from "react"; 
import { Text, View, Button, TextInput, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';

// Google 인증을 위한 라이브러리 임포트
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// WebBrowser가 인증 세션
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  // Google useAuthRequest 
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '927294612895-b9kfno3sq4m00dul44l9kg3lsjbrc6d5.apps.googleusercontent.com',
    // iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com', // 스토어 출시용
    // androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com', // 스토어 출시용
  });

  // Google 로그인 응답(response) 처리
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // authentication.accessToken
      getUserInfo(authentication.accessToken);
    } else if (response?.type === 'error') {
      console.log("Google Auth Error:", response.error);
      // 로그인 실패 또는 취소
    }
  }, [response]);

  // Access Token Google 사용자 정보 
  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.log('Google User Info:', user);
      // user.email, user.name, user.picture 등으로 앱의 로그인 처리

      navigation.replace("Home");

    } catch (error) {
      console.log("Error fetching user info:", error);
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
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { navigation.replace("Id") }}>
            <Text style={styles.findButtonText}>아이디 / 비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.replace("Home") }}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.signupButton}
            onPress={() => { navigation.replace("Signup") }}>
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
        {/*Google 버튼에 onPress 및 disabled 속성 추가 */}
        <TouchableOpacity
          style={styles.googleButton}
          disabled={!request} // Google 인증 준비가 안됐으면 버튼 비활성화
          onPress={() => {
            promptAsync(); // Google 로그인 창 띄우기
          }}
        >
          <Image source={require('../assets/google.png')} style={{ width: 24, height: 24 }} />
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
    marginTop: 10,
    
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
  }

});
