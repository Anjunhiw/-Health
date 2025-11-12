import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@env';
import userStore from '../../Store/userStore';

export default function Reset_Pw() {
  const {
    findAccountState: { newPassword, newPasswordConfirm },
    setFindAccountField,
    resetFindAccountState,
    verifiedEmail,
  } = userStore();

  const route = useRoute();
  const params = (route && route.params) ? route.params : {};
  const { userId: pUserId, email: pEmail } = params || {};

  const navigation = useNavigation();
  const api = axios.create({ baseURL: API_URL, timeout: 10000 });

  const [emailInput, setEmailInput] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false); // ✅ 연타 방지용

  // ✅ 이메일 형식 간단 체크
  const isEmail = (s) => /^\S+@\S+\.\S+$/.test(String(s || '').trim());

  const validatePassword = (pw) => {
    const lenOk = pw.length >= 8 && pw.length <= 32;
    const kinds = [/[A-Za-z]/, /\d/, /[^0-9A-Za-z]/].reduce((a, r) => a + (r.test(pw) ? 1 : 0), 0);
    return lenOk && kinds >= 2;
  };

  useEffect(() => {
    console.log("[Reset_Pw] mounted. route =", route);
    console.log("[Reset_Pw] route.params =", route?.params);
    console.log('[Reset_Pw] pEmail, verifiedEmail =', pEmail, verifiedEmail);
    console.log("[Reset_Pw] picked params =", { pUserId, pEmail });
    return () => {
      resetFindAccountState();
    };
  }, [route]);

  const handleResetPassword = async () => {
    if (submitting) return; // ✅ 중복 클릭 즉시 차단
    console.log("[Reset_Pw] handleResetPassword pressed");

    const pw = (newPassword || '').trim();
    const pwConfirm = (newPasswordConfirm || '').trim();
    const emailFinal = (pEmail || verifiedEmail || emailInput || '').trim();

    if (!pw || !pwConfirm) {
      Alert.alert("입력 오류", "비밀번호를 모두 입력해주세요.");
      return;
    }
    if (!validatePassword(pw)) {
      Alert.alert("형식 오류", "비밀번호는 8~32자이며, 영문자, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.");
      return;
    }
    if (!emailFinal) {
      Alert.alert('오류', '이메일 정보가 없습니다. 이전 화면에서 인증 후 들어오거나, 아래 입력칸에 이메일을 입력하세요.');
      return;
    }
    if (!isEmail(emailFinal)) {
      Alert.alert('형식 오류', '올바른 이메일 주소를 입력하세요.');
      return;
    }
    if (pw !== pwConfirm) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setSubmitting(true); // ✅ 시작
      const payload = { email: emailFinal, newPassword: pw };
      console.log('[RESET PW] payload =', payload);
      await api.post('/auth/reset-password', payload);

      setFindAccountField('newPassword', '');
      setFindAccountField('newPasswordConfirm', '');

      Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.');
      navigation.replace('Login');
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        '서버 오류가 발생했습니다.';
      console.log('[reset-password ERR]', e?.response?.status, e?.response?.data || e.message);
      Alert.alert('오류', msg);
    } finally {
      setSubmitting(false); // ✅ 종료
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>GymSpot</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.text}>비밀번호 재설정</Text>
        </View>

        {/* params.email이나 verifiedEmail이 없으면 직접 입력 */}
        {!pEmail && !verifiedEmail && (
          <TextInput
            placeholder="계정 이메일 (인증 화면에서 넘어오지 않으면 직접 입력)"
            style={styles.fullInput}
            value={emailInput}
            onChangeText={setEmailInput}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!submitting}
          />
        )}

        <View style={styles.fieldGroup}>
          <TextInput
            placeholder="새 비밀번호"
            style={styles.fullInput}
            value={newPassword}
            onChangeText={(text) => setFindAccountField('newPassword', text)}
            secureTextEntry
            editable={!submitting}
          />
          <TextInput
            placeholder="새 비밀번호 확인"
            style={styles.fullInput}
            value={newPasswordConfirm}
            onChangeText={(text) => setFindAccountField('newPasswordConfirm', text)}
            secureTextEntry
            editable={!submitting}
          />
        </View>

        <View>
          <TouchableOpacity
            style={[styles.button, submitting && { opacity: 0.6 }]}
            disabled={submitting}
            onPress={() => {
              console.log("[Reset_Pw] change-password button clicked");
              handleResetPassword().catch(err => console.log("[handleResetPassword catch]", err));
            }}
          >
            <Text style={styles.buttonText}>{submitting ? '변경 중…' : '비밀번호 변경'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity disabled={submitting} onPress={() => navigation.replace("Login")}>
            <Text>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});