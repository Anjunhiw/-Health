import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import {
  TextInput,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import userStore from "../Store/userStore";

export default function Signup() {
  const {
    signupState: {
    userId, password, passwordConfirm, name, contact,
    email, birthdate, address, gender, isIdChecked
  }, 
  setSignupField, 
  resetSignupState} = userStore();

  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState(""); // 사용자가 입력하는 코드
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 완료 여부
//-------------------------------------------------------------------------------------------회원가입
const handleSignup = async () => {
  //아이디 중복여부 확인
  if (!isIdChecked) {
    Alert.alert("입력 오류", "아이디 중복 확인이 필요합니다.");
    return;
  }
  // 🔹 입력 검증 (우선순위별)
  if (!userId.trim()) {
    Alert.alert("입력 오류", "아이디가 입력되지 않았습니다.");
    return;
  } else if (password.length < 8) {
    Alert.alert("입력 오류", "비밀번호는 최소 8자리 이상이어야 합니다.");
    return;
  } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    Alert.alert("입력 오류", "비밀번호에 대소문자, 숫자, 특수문자를 모두 포함해 입력해주세요.");
    return;
  } else if (!passwordConfirm.trim()) {
    Alert.alert("입력 오류", "비밀번호 확인란이 비어 있습니다.");
    return;
  } else if (password !== passwordConfirm) {
    Alert.alert("입력 오류", "비밀번호가 일치하지 않습니다.");
    return;
  } else if (!name.trim()) {
    Alert.alert("입력 오류", "이름이 입력되지 않았습니다.");
    return;
  } else if (birthdate.length !== 8 || isNaN(birthdate)) {
    Alert.alert("입력 오류", "생년월일은 8자리 숫자(예: 19900101)로 입력해주세요.");
    return;
  } else if (!/^01[0-9]{8,9}$/.test(contact)) {
    Alert.alert("입력 오류", "연락처 형식이 올바르지 않습니다. 예: 01012345678");
    return;
  } else if (!email.trim()) {
    Alert.alert("입력 오류", "이메일이 입력되지 않았습니다.");
    return;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    Alert.alert("입력 오류", "이메일 형식이 올바르지 않습니다. 예: GymSpot@email.com");
    return;
    } else if (!isEmailVerified) {
    Alert.alert("입력 오류", "이메일 인증을 먼저 완료해주세요.");
    return;
  } else if (!address.trim()) {
    Alert.alert("입력 오류", "주소가 입력되지 않았습니다.");
    return;
  } else if (!gender) {
    Alert.alert("입력 오류", "성별을 선택해주세요.");
    return;
  }
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      user_id: userId,
      password: password,
      name: name,
      contact: contact,
      email: email,
      birthdate: birthdate,
      address: address,
      gender: gender,
    });

    console.log("데이터: ", response.data);

    if (response.data === 1) {
      Alert.alert(
        "회원가입 성공!",
        "회원가입이 완료되었습니다.",
        [{ text: "확인", onPress: () => {
          resetSignupState(); // 가입 후 상태 초기화
          navigation.replace("Login") }}]
      );
    } else {
      Alert.alert("회원가입 실패", "서버 오류 또는 중복된 아이디입니다.");
    }
  } catch (error) {
    console.error("회원가입 에러:", error.message);
    Alert.alert("서버 오류", "서버와의 연결에 실패했습니다. 다시 시도해주세요.");
  }
};
//-------------------------------------------------------------------------------------------아이디 중복확인
const handleCheckId = async () => {
  if (!userId.trim()) { 
    Alert.alert("입력 오류", "아이디를 입력해주세요.");
    return;
  }
  try {
    const response = await axios.get(`${API_URL}/check-id/${userId}`);
    console.log("데이터:", response.data);
    if (response.data.exists) {  
      Alert.alert("중복된 아이디", "이미 존재하는 아이디입니다.");
      setSignupField("isIdChecked", false);
    } else {
      Alert.alert("사용 가능", "사용 가능한 아이디입니다!");
      setSignupField("isIdChecked", true);
    }
  } catch (error) {
    console.log("중복확인 에러:", error.message);
    Alert.alert("서버 오류", "아이디 중복 확인 중 문제가 발생했습니다.");
  }
};
 // -------------------------------------------------------------------------------- 이메일 인증코드 발송
   const handleSendEmailCode = () => {
    const em = email.trim();

    if (!em) {
      Alert.alert("입력 오류", "이메일을 입력해주세요.");
      return;
    }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if (!ok) {
      Alert.alert("입력 오류", "올바른 이메일 형식으로 입력해주세요.");
      return;
    }
    axios
      .post(`${API_URL}/auth/send-code`, { email: em })
      .then((res) => {
        console.log("send-code 응답:", res.data);
        setIsEmailVerified(false); // 새로 보냈으니 인증 다시 필요
        setVerificationCode("");
        Alert.alert("안내", "입력하신 이메일로 인증코드를 보냈습니다.");
      });
  };

// -------------------------------------------------------------------------------- 이메일 인증코드 검증
const handleVerifyEmailCode = async () => {
  const em = email.trim();
  const code = verificationCode.trim();

  if (!em) {
    Alert.alert("입력 오류", "이메일을 먼저 입력하고 인증코드를 요청하세요.");
    return;
  }
  if (!/^\d{6}$/.test(code)) {
    Alert.alert("입력 오류", "6자리 숫자 인증코드를 입력하세요.");
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/auth/verify-code`, {
      email: em,
      code,
    });

    console.log("verify-code 응답:", res.data);

    if (res.data.verified) {
      setIsEmailVerified(true);
      Alert.alert("안내", "이메일 인증이 완료되었습니다.");
    } else {
      // 이 경우는 거의 없지만, 혹시 대비
      setIsEmailVerified(false);
      Alert.alert("안내", "인증코드가 올바르지 않거나 만료되었습니다.");
    }
  } catch (error) {
    console.log("verify-code 에러:", error.response?.data || error.message);

    // 서버에서 내려준 메시지 우선 표시
    const msg =
      error.response?.data?.message ||
      "인증코드가 올바르지 않거나 이미 사용되었거나 만료되었습니다.";

    setIsEmailVerified(false);
    Alert.alert("인증 실패", msg);
  }
};











    
return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      maximumFontSizeMultiplier={1}
    >
      {/* <View style={styles.formContainer}> */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GymSpot</Text>
      </View>
      
        <View style={styles.inputRow}>
        <TextInput
          placeholder="아이디"
          style={[styles.input, { flex: 1 }]}
          value={userId}
          onChangeText={(text) => {
            setSignupField("userId", text);
            setSignupField("isIdChecked", false); // 변경 시 다시 중복확인 필요
          }}
        />
        <TouchableOpacity style={styles.contactButton} onPress={handleCheckId}>
          <Text style={styles.contactButtonText}>중복 확인</Text>
        </TouchableOpacity>
        </View>
        <TextInput
          placeholder="비밀번호 (특수문자 포함, 8자 이상)"
          style={styles.fullWidthInput}
          secureTextEntry
          value={password}
          onChangeText={(text) => setSignupField("password", text)}
        />
{/* <Text>{displayValue}</Text>   콘솔 확인용 잠시    */}
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.fullWidthInput}
          secureTextEntry
          value={passwordConfirm}
          onChangeText={(text) => setSignupField("passwordConfirm", text)}
        />
        <View style={[styles.inputRow, { gap: 10 }]}>
        <TextInput
          placeholder="이름"
          style={[styles.input, { flex: 1 }]}
          value={name}
          onChangeText={(text) => setSignupField("name", text)}
        />
          <TextInput
          placeholder="생년월일(19900101)"
          style={[styles.input, { flex: 1 }]}
          value={birthdate}
          onChangeText={(text) => setSignupField("birthdate", text)}
          maxLength={8}
          keyboardType="number-pad"
        />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="연락처"
            style={[styles.fullWidthInput, { flex: 1 }]}
            value={contact}
            onChangeText={(text) => setSignupField("contact", text)}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="이메일"
            style={[styles.input, { flex: 1 }]}
            value={email}
            onChangeText={(text) => setSignupField("email", text)}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.contactButton}
             onPress={handleSendEmailCode}>
            <Text style={styles.contactButtonText}>인증</Text>
          </TouchableOpacity>
        </View>



    {/* 인증코드 입력 + 확인 */}
          <View style={styles.inputRow}>
            <TextInput
              placeholder="이메일로 받은 인증코드"
              style={[styles.input, { flex: 1 }]}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleVerifyEmailCode}
            >
              <Text style={styles.contactButtonText}>코드 확인</Text>
            </TouchableOpacity>
          </View>

          {isEmailVerified && (
            <Text style={styles.verifySuccessText}>✅ 이메일 인증이 완료되었습니다.</Text>
          )}







        <TextInput
          placeholder="주소"
          style={styles.fullWidthInput}
          value={address}
          onChangeText={(text) => setSignupField("address", text)}
        />
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === "male" && styles.genderSelected]}
            onPress={() => setSignupField("gender", "male")}
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
            onPress={() => setSignupField("gender", "female")}
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
      
      <View style={styles.buttonContainer}>
       <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
  <Text style={styles.signupButtonText}>회원가입</Text>
</TouchableOpacity>
      </View>
      {/* </View> */}

      <View style={styles.loginContainer}>
        <Text>계정이 있으신가요?</Text>
        <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.replace("Login")}>
          <Text style={styles.loginButtonText}> 로그인</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // 배경색 추가
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    // paddingHorizontal: 20,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    minHeight: 48,
  },
  fullWidthInput: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    minHeight: 48,
  },
  contactButton: {
    borderColor: '#1E90FF',
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginLeft: 10,
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
    gap: 20,
  },
  genderButton: {
    flex: 1,
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
  loginButton: {
    marginTop: 10,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '#fff',
  },
  loginButtonText: {
    color: Platform.OS === 'ios' ? '#1E90FF' : '#1E90FF',
  },
  signupButton: {
  backgroundColor: '#1E90FF',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
},
signupButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});
