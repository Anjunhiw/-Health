import { useEffect, useRef, useState} from "react";
import { Text, View, TextInput, Animated, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import userStore from "../Store/userStore";

import Constants from 'expo-constants';

// Google 인증을 위한 라이브러리 임포트 (수정됨)
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// import AsyncStorage from '@react-native-async-storage/async-storage'; // JWT 저장을 위해 필요

export default function Login() {
  const { loginState: { id, password, isChecked }, 
          setLoginField } = userStore();

  const navigation = useNavigation();
  const bounceValue = useRef(new Animated.Value(0)).current;

    // 구글 로그인 에러 상태 추가
  const [googleError, setGoogleError] = useState(null);

    // --- (수정됨) Google Sign-In 설정 ---
  // 컴포넌트 마운트 시 1회 실행하여 Google Sign-In을 설정합니다.
  useEffect(() => {
    GoogleSignin.configure({
      // webClientId는 Google Cloud Console에서 'Web application' 타입으로 생성한 Client ID입니다.
      // 기존 expoClientId와 동일한 값을 사용합니다.
      webClientId: '927294612895-b9kfno3sq4m00dul44l9kg3lsjbrc6d5.apps.googleusercontent.com',
      // androidClientId: '927294612895-bq30q934iifl86qc6vacgkcedvbvq9d1.apps.googleusercontent.com', // 스토어 출시용
      // iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com', // 스토어 출시용
    });
  }, []);

    // --- (신규) idToken을 스프링 서버로 전송하는 함수 ---
  const sendTokenToServer = async (idToken) => {
    try {
      setGoogleError('서버와 통신 중...');
      
      // Spring Boot 서버의 '/auth/google' 엔드포인트로 idToken을 전송합니다.
      const response = await axios.post(`${API_URL}/auth/google`, {
        idToken: idToken,
      });

      // 서버로부터 앱 전용 JWT(access_token)를 받음
      const { access_token } = response.data; 

      if (access_token) {
        // (중요) 서버가 발급한 JWT를 AsyncStorage 등에 저장해야 합니다.
        // await AsyncStorage.setItem('userToken', access_token);
        
        setGoogleError(null);
        console.log('스프링 서버 로그인 성공! JWT:', access_token);

        // 서버 로그인이 최종 성공하면 Home으로 이동
        navigation.replace("Home");

      } else {
        setGoogleError('서버로부터 토큰을 받지 못했습니다.');
      }

    } catch (error) {
      console.error('서버 통신 오류:', error);
      if (error.response) {
        // 서버가 에러 응답을 보낸 경우
        setGoogleError(`서버 오류: ${error.response.data?.message || error.message}`);
      } else {
        // 네트워크 오류 등
        setGoogleError(`서버 연결 실패: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -5, // 올라갔다가
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0, // 원래 위치로
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
  // --- (수정됨) 새 Google 로그인 함수 ---
  const signIn = async () => {
    try {
      // 1. 구글 플레이 서비스가 기기에서 사용 가능한지 확인
      await GoogleSignin.hasPlayServices();
      
      // 2. 로그인 시도 및 사용자 정보 획득
      const user = await GoogleSignin.signIn();
      
      // 3. 획득한 사용자 정보 콘솔에 출력
      setGoogleError(null);
      console.log('Google User Info:', user);
      
      const idToken = user.data.idToken; // <-- 이 토큰을 서버로 보냅니다.

      if (idToken) {
        // 4. (수정) Home으로 바로 이동하는 대신, 서버로 토큰 전송
        await sendTokenToServer(idToken);
      } else {
        setGoogleError('구글로부터 idToken을 받지 못했습니다.');
      }

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setGoogleError('로그인 취소됨');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setGoogleError('로그인 진행 중');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setGoogleError('구글 플레이 서비스를 사용할 수 없습니다');
      } else {
        setGoogleError(`로그인 실패: ${error.message}`);
        console.error(error);
      }
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Animated.Image 
                    source={require('../assets/logo (2).png')} 
                    style={[styles.logo, { transform: [{ translateY: bounceValue }] }]} 
                  />
        <Text style={styles.logoText}>GymSpot</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder="아이디"
        value={id}
        onChangeText={(text) => setLoginField("id", text)}
        style={styles.input} 
        />
        <TextInput 
        value={password}
        onChangeText={(text) => setLoginField("password", text)}
        placeholder="비밀번호" 
        style={styles.input} 
        secureTextEntry 
        />
      </View>
      <View style={styles.subButtonContainer}>
        <View style={styles.Checkbox}>
          <Checkbox value={isChecked}
          onValueChange={(cheked) => setLoginField("isChecked", cheked)}
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
        {/* --- (수정됨) Google 버튼 --- */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={signIn} // 'promptAsync' 대신 'signIn' 함수 호출
        >
          <Image source={require('../assets/google.png')} style={{ width: 24, height: 24 }} />
          <Text>Google로 시작하기</Text>
        </TouchableOpacity>
        
        {/* 구글 로그인 에러 메시지 표시 */}
        {googleError && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>오류: {googleError}</Text>}
      </View>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    marginBottom: 20
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 55,
    marginBottom: 10
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
