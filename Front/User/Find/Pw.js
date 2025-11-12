import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";
import userStore from "../../Store/userStore";

export default function Pw() {
  const {
    findAccountState: { userId, email, verifyNum, verifyMessage, modalVisible, isVerified },
    setFindAccountField,
    resetVerification,
    closeVerificationModal,
    resetFindAccountState,
  } = userStore();

  const navigation = useNavigation();

  const api = axios.create({
    baseURL: API_URL,   // 예: http://192.168.219.116:8080
    timeout: 10000,
  });

  // 인증코드 전송 → 성공 시 모달 오픈
const onSendCode = async () => {
  const em = email.trim();
  const uid = userId.trim(); // ★ 추가

  if (!uid) { Alert.alert("입력 오류", "아이디를 입력하세요."); return; }
  if (!em)  { Alert.alert("입력 오류", "이메일을 입력하세요."); return; }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  if (!ok)  { Alert.alert("형식 오류", "올바른 이메일 형식이 아닙니다."); return; }

  try {
    // ★ userId도 같이 보냄
    await api.post("/auth/send-code", { userId: uid, email: em });

    resetVerification();
    setFindAccountField('modalVisible', true);
    Alert.alert("안내", "인증코드를 보냈습니다. 메일함을 확인하세요.");
  } catch (e) {
    const msg = e?.response?.data?.message || "인증코드 전송에 실패했습니다.";
    Alert.alert("오류", msg);
    console.log("[SendCode ERR]", e?.response?.status, e?.response?.data || e.message);
  }
};

  // 인증번호 확인(서버 검증)
  const checkVerifyNum = async () => {
    const em = email.trim();
    const code = verifyNum.trim();

    if (!/^\d{6}$/.test(code)) {
      Alert.alert("입력 오류", "6자리 숫자 인증번호를 입력하세요.");
      return;
    }

    try {
      await api.post("/auth/verify-code", { email: em, code });
      Alert.alert("인증되었습니다.");
      setFindAccountField("isVerified", true);
      closeVerificationModal();
    } catch (e) {
      console.log("[VerifyCode ERR]", e?.response?.status, e?.response?.data || e.message);
      setFindAccountField("verifyMessage", "인증번호가 일치하지 않습니다.");
      setFindAccountField("isVerified", false);
    }
  };

  const closeModal = () => {
    closeVerificationModal();
  };

  // 비밀번호 재설정(다음 화면 이동/토큰 발급 등)
  const onResetPassword = () => {
    // if (!isVerified) {
    //   Alert.alert("인증 필요", "이메일 인증을 먼저 완료해주세요.");
    //   return;
    // }
    // 필요 시 userId와 email을 다음 화면으로 넘길 수 있음
    // navigation.navigate('PwReset', { userId, email });
    Alert.alert("안내", `인증 완료. 비밀번호 재설정 절차로 이동합니다.\n아이디: ${userId || "(미입력)"}`);
    navigation.replace('Reset_Pw');
    resetFindAccountState(); // 상태 초기화
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>GymSpot</Text>
        </View>

        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.replace('Id')}>
            <Text style={styles.text}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text>|</Text>
          <Text style={[styles.text, styles.activeText]}>비밀번호 찾기</Text>
        </View>

        {/* ★ 추가: 아이디 입력 */}
        <View style={styles.fieldGroup}>
          <TextInput
            placeholder="아이디"
            value={userId}
            onChangeText={(t) => setFindAccountField("userId", t)}
            style={styles.fullInput}
            autoCapitalize="none"
            returnKeyType="next"
          />
        </View>

        {/* 이메일 + 인증 버튼 */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="이메일 주소"
            value={email}
            onChangeText={(t) => setFindAccountField("email", t)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.contactButton} onPress={onSendCode}>
            <Text style={styles.contactButtonText}>인증</Text>
          </TouchableOpacity>
        </View>

        {/* 인증 모달 */}
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>인증번호를 입력해주세요.</Text>
              <TextInput
                placeholder="인증번호(6자리)"
                value={verifyNum}
                onChangeText={(t) => setFindAccountField("verifyNum", t.replace(/\D/g, "").slice(0, 6))}
                style={styles.modalInput}
                keyboardType="number-pad"
                maxLength={6}
              />
              <Text style={styles.modalMessageText}>{verifyMessage}</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={[styles.modalButton, styles.modalCloseButton]} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={checkVerifyNum}>
                  <Text style={styles.modalButtonText}>인증 확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, !isVerified && { backgroundColor: "#9BBCEB" }]}
          onPress={onResetPassword}
          // disabled={!isVerified}
        >
          <Text style={styles.buttonText}>비밀번호 재설정</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
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
    color: '#aaa', // 비활성화 색상
  },
  activeText: {
    color: '#007AFF', // 활성화 색상
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
  },
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
  contactButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  modalMessageText: {
    marginBottom: 15,
    fontSize: 14,
    color: 'red',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    marginHorizontal: 5,
  },
  modalCloseButton: {
    backgroundColor: '#6c757d',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})