import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@env';
import userStore from '../../Store/userStore';

export default function Reset_Pw() {
    const {
        findAccountState: { newPassword, newPasswordConfirm },
        setFindAccountField,
        resetFindAccountState,
    } = userStore();

    const navigation = useNavigation();

    // 컴포넌트가 언마운트될 때 상태 초기화
    useEffect(() => {
        return () => {
            resetFindAccountState();
        };
    }, []);

    const handleResetPassword = async () => {
        const pw = newPassword.trim();
        const pwConfirm = newPasswordConfirm.trim();

        if (!pw || !pwConfirm) {
            Alert.alert("입력 오류", "비밀번호를 모두 입력해주세요.");
            return;
        } else if (pw !== pwConfirm) {
            Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
            return;
        }

        Alert.alert("성공", "비밀번호가 성공적으로 변경되었습니다.");
        navigation.replace("Login");
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
             <View style={styles.contentContainer}>
               <View style={styles.logoContainer}>
                 <Text style={styles.logoText}>GymSpot</Text>
               </View>
               <View style={styles.titleContainer}>
                    <Text style={styles.text}>비밀번호 재설정</Text>
                </View>

                <View style={styles.fieldGroup}>
                    <TextInput
                        placeholder="새 비밀번호"
                        style={styles.fullInput}
                        value={newPassword}
                        onChangeText={(text) => setFindAccountField('newPassword', text)}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="새 비밀번호 확인"
                        style={styles.fullInput}
                        value={newPasswordConfirm}
                        onChangeText={(text) => setFindAccountField('newPasswordConfirm', text)}
                        secureTextEntry
                    />
                </View>

                <View>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={handleResetPassword}
                    >
                        <Text style={styles.buttonText}>비밀번호 변경</Text>
                    </TouchableOpacity>
                </View>

                 <View style={{ alignItems: "center", marginTop: 20 }}>
                          <TouchableOpacity onPress={() => navigation.replace("Login")}>
                            <Text>로그인</Text>
                          </TouchableOpacity>
                        </View>

               </View>
        </KeyboardAvoidingView>
    )
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