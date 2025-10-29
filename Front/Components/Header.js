import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header() {

    const navigation = useNavigation();

    return(
         <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <Text style={styles.logoText}>GymSpot</Text>
            <View style={styles.userContainer}>
                <Text style={styles.userText}>id 님</Text>
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={() => navigation.navigate("Login")}>
                    <Image source={require('../assets/logout_icon.png')} 
                    style={{ width: 20, height: 20 }}/>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',        
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E90FF",
    position: 'absolute', // 로고를 중앙에 유지
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
  },
  userText: {
    marginRight: 10,
    fontSize: 20,
  },
});