import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
  const [isIdChecked, setIsIdChecked] = useState(false);

  const navigation = useNavigation();
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
  } else if (!/[A-Z]/.test(password) && !/[a-z]/.test(password) && !/[0-9]/.test(password) && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
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

  } else if (!address.trim()) {
    Alert.alert("입력 오류", "주소가 입력되지 않았습니다.");
    return;
  } else if (!gender) {
    Alert.alert("입력 오류", "성별을 선택해주세요.");
    return;
  }
  try {
    const response = await axios.post("http://192.168.219.202:8080/signup", {
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
        [{ text: "확인", onPress: () => navigation.replace("Login") }]
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
    const response = await axios.get(`http://192.168.219.202:8080/check-id/${userId}`); 
    console.log("데이터:", response.data);
    if (response.data.exists) {  
      Alert.alert("중복된 아이디", "이미 존재하는 아이디입니다.");
      setIsIdChecked(false)
    } else {
      Alert.alert("사용 가능", "사용 가능한 아이디입니다!");
      setIsIdChecked(true)
    }
  } catch (error) {
    console.log("중복확인 에러:", error.message);
    Alert.alert("서버 오류", "아이디 중복 확인 중 문제가 발생했습니다.");
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
            if (text !== userId) {
              setIsIdChecked(false);
            }
            setUserId(text);
          }}
        />
        <TouchableOpacity style={[styles.contactButton, { marginLeft: 10 }]} onPress={handleCheckId}>
          <Text style={styles.contactButtonText}>중복 확인</Text>
        </TouchableOpacity>
        </View>
        <TextInput
          placeholder="비밀번호 (특수문자 포함, 8자 이상)"
          style={styles.fullWidthInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
{/* <Text>{displayValue}</Text>   콘솔 확인용 잠시    */}
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.fullWidthInput}
          secureTextEntry
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
        <View style={[styles.inputRow, { gap: 10 }]}>
        <TextInput
          placeholder="이름"
          style={[styles.input, { flex: 1 }]}
          value={name}
          onChangeText={setName}
        />
          <TextInput
          placeholder="생년월일(19900101)"
          style={[styles.input, { flex: 1 }]}
          value={birthdate}
          onChangeText={setBirthdate}
          maxLength={8}
          keyboardType="number-pad"
        />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            placeholder="연락처"
            style={[styles.input, { flex: 1 }]}
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={[styles.contactButton, { marginLeft: 10 }]}>
            <Text style={styles.contactButtonText}>인증</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="이메일"
            style={styles.fullWidthInput}
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
          style={styles.fullWidthInput}
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
