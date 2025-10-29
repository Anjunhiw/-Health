import { TouchableOpacity, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function id() {

    const navigation = useNavigation();

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
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="연락처"
            style={styles.input}
            keyboardType="phone-pad"
          />
           <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>인증</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>아이디 찾기</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={() => {navigation.replace("Login")}}>
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
    color: '#aaa', // 비활성화 색상
  },
  activeText: {
    color: '#007AFF', // 활성화 색상
    fontWeight: 'bold',
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
})