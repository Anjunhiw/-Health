import { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native"; // ✅ Alert 추가
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";

export default function Id() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const navigation = useNavigation();

  // ✅ axios 인스턴스(실수 방지)
  const api = axios.create({
    baseURL: API_URL,   // 예: http://192.168.219.116:8080
    timeout: 10000,
  });

  // ✅ 이메일 인증코드 전송
  const onSendCode = async () => {
    const em = email.trim();
    if (!em) { Alert.alert("입력 오류", "이메일을 입력하세요."); return; }
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if (!ok) { Alert.alert("형식 오류", "올바른 이메일 형식이 아닙니다."); return; }

    try {
      // ⚠️ 백엔드 경로에 맞게 수정: 예) POST /auth/send-code { email }
      await api.post("/auth/send-code", { email: em });
      Alert.alert("안내", "인증코드를 보냈습니다. 메일함을 확인하세요.");
    } catch (e) {
      console.log("[SendCode ERR]", e?.response?.status, e?.response?.data || e.message);
      Alert.alert("오류", "인증코드 전송에 실패했습니다.");
    }
  };

  // ✅ 아이디 찾기
  const onFindId = async () => {
    const nm = name.trim();
    const ph = contact.trim().replace(/\D/g, "");
    const em = email.trim();

    if (!nm) { Alert.alert("입력 오류", "이름을 입력하세요."); return; }
    if (!ph) { Alert.alert("입력 오류", "연락처를 입력하세요."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { Alert.alert("형식 오류", "이메일 형식이 올바르지 않습니다."); return; }

    try {
      // ⚠️ 백엔드 경로에 맞게 수정: 예) POST /users/find-id { name, contact, email } → { user_id }
      const res = await api.post("/users/find-id", { name: nm, contact: ph, email: em });
      if (res.data?.user_id) {
        Alert.alert("아이디 찾기 결과", `당신의 아이디는 "${res.data.user_id}" 입니다.`);
      } else {
        Alert.alert("안내", "일치하는 계정을 찾지 못했습니다.");
      }
    } catch (e) {
      console.log("[FindId ERR]", e?.response?.status, e?.response?.data || e.message);
      Alert.alert("오류", "아이디 찾기에 실패했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>GymSpot</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.text, styles.activeText]}>아이디 찾기</Text>
          <Text>|</Text>
          <TouchableOpacity onPress={() => navigation.replace('Pw')}>
            <Text style={styles.text}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        {/* 이름 */}
        <View style={styles.fieldGroup}>
          <TextInput
            placeholder="이름"
            value={name}
            onChangeText={setName}
            style={styles.fullInput}
            returnKeyType="next"
          />
        </View>

        {/* 연락처 */}
        <View style={styles.fieldGroup}>
          <TextInput
            placeholder="연락처(숫자만)"
            value={contact}
            onChangeText={(t) => setContact(t.replace(/\D/g, ''))} // 숫자만
            keyboardType="phone-pad"
            style={styles.fullInput}
            maxLength={11}
            returnKeyType="next"
          />
        </View>

        {/* 이메일 + 인증 버튼 */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="이메일 주소"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.contactButton} onPress={onSendCode}>
            <Text style={styles.contactButtonText}>인증</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={onFindId}>
          <Text style={styles.buttonText}>아이디 찾기</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={() => { navigation.replace("Login") }}>
            <Text>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logoText: { fontSize: 36, fontWeight: "bold", color: "#1E90FF" },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 45,
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
  fieldGroup: { marginTop: 10, marginBottom: 10 },
  fullInput: {
    width: '100%',
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  text: { marginHorizontal: 10, fontSize: 18, color: '#aaa' },
  activeText: { color: '#007AFF', fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    width: 280,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  contactButton: {
    borderColor: '#1E90FF',
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 40,
  },
  contactButtonText: { fontSize: 14, fontWeight: 'bold', color: '#1E90FF' },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
