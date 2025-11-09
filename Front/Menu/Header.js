import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {

    const navigation = useNavigation();

      const [userId, setUserId] = useState('');

    useEffect(() => {
        const loadUserName = async () => {
            const storedId = await AsyncStorage.getItem("user_id");
            if (storedId) {
                setUserId(storedId);
            }
        };
        loadUserName();
    }, []);

    return(
         <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image 
            source={require('../assets/logo (2).png')} 
            style={styles.logo} 
          />
            <Text style={styles.logoText}>GymSpot</Text>
            <View style={styles.userContainer}>
              {userId ? (
                <Text style={styles.userText}>{userId} 님</Text>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.userText}>로그인</Text>
                </TouchableOpacity>
              )}
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
    justifyContent: 'space-between',
    alignItems: 'center',        
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  logo: {
    width: 65,
    height: 40,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E90FF",
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
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