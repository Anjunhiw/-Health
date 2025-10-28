import { Text, View, Button, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

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
        <TextInput placeholder="아이디" style={styles.input} />
        <TextInput placeholder="비밀번호" style={styles.input} secureTextEntry />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="로그인" onPress={() => {}} color="#1E90FF" />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>아직 계정이 없으신가요?</Text>
        <Button title="회원가입" onPress={() => {navigation.navigate("Signup")}} color="#32CD32" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
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
  buttonContainer: {
    marginBottom: 20,
  },
  signupContainer: {
    alignItems: "center",
  },
  signupText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
});
